# backend/app/services/budget_actions.py
from google import genai
from app.core.config import settings
from app.services.ai.actions import AIAction
import json
import logging

logger = logging.getLogger(__name__)

client = genai.Client(api_key=settings.GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are an AI financial intent detector.

Your job:
- Detect if the user wants to CREATE or UPDATE something
- Output ONLY valid JSON
- NEVER explain anything
- If no action is detected, return action = "none"

Supported actions:
- create_budget
- create_transaction
- create_goal
- allocate_goal
- none

Rules:
- Use numbers, not words (₹5000 → 5000)
- Confidence between 0 and 1
- Do NOT hallucinate IDs
"""

async def detect_budget_action(
    message: str,
    recent_transactions: str,
) -> AIAction:
    prompt = f"""
{SYSTEM_PROMPT}

Recent transactions:
{recent_transactions}

User message:
"{message}"

Return JSON in this exact format:
{{
  "action": "...",
  "confidence": 0.0,
  "name": null,
  "limit_amount": null,
  "period": null,
  "amount": null,
  "merchant_raw": null,
  "target_amount": null,
  "target_date": null,
  "allocation_percentage": null
}}
"""

    try:
        response = await client.aio.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        # Gemini sometimes wraps JSON in ``` – strip safely
        if text.startswith("```"):
            text = text.strip("`").split("\n", 1)[-1]

        data = json.loads(text)

        return AIAction(**data)

    except Exception as e:
        logger.warning(f"[AI_ACTION_DETECTOR_FAILED] {e}")
        return AIAction(action="none", confidence=0.0)
