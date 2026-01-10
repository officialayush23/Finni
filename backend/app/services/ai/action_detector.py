# app/services/ai/action_detector.py

from google import genai
from app.core.config import settings
from app.services.ai.actions import AIAction
import json
import logging

logger = logging.getLogger(__name__)

client = genai.Client(api_key=settings.GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are an AI financial command interpreter.

You convert user messages into structured actions.

CRITICAL RULES:
- Output ONLY valid JSON
- NEVER explain
- NEVER hallucinate IDs
- Use numbers only (17 lakh → 1700000)
- Dates must be ISO format (YYYY-MM-DD)
- confidence ∈ [0,1]
- If unsure → action = "none"

SUPPORTED ACTIONS:
- create_transaction
- create_budget
- create_goal
- allocate_goal
- add_income
- add_investment
- none

FIELD RULES:
create_transaction:
- amount (required)
- merchant_raw
- occurred_at (ISO, optional)

create_budget:
- name
- limit_amount (required)
- period (monthly/yearly)

create_goal:
- name (required)
- target_amount (required)
- target_date (required)

allocate_goal:
- goal_id (UUID ONLY if explicitly provided)
- income_source_id
- portfolio_holding_id
- allocation_percentage
- allocation_fixed_amount

add_income:
- name
- estimated_monthly_amount
- source_type

add_investment:
- name
- asset_type
- identifier
- quantity
- avg_buy_price

If user is asking for advice only → action = "none".
"""

async def detect_action(
    message: str,
    txn_context: str,
    financial_context: str,
) -> AIAction:
    prompt = f"""
{SYSTEM_PROMPT}

Recent transactions:
{txn_context}

User financial context:
{financial_context}

User message:
"{message}"

Return JSON in this exact schema:
{{
  "action": "none",
  "confidence": 0.0,

  "name": null,
  "amount": null,
  "merchant_raw": null,
  "occurred_at": null,

  "limit_amount": null,
  "period": null,

  "target_amount": null,
  "target_date": null,

  "goal_id": null,
  "income_source_id": null,
  "portfolio_holding_id": null,
  "allocation_percentage": null,
  "allocation_fixed_amount": null,

  "estimated_monthly_amount": null,
  "source_type": null,

  "asset_type": null,
  "identifier": null,
  "quantity": null,
  "avg_buy_price": null
}}
"""

    try:
        response = await client.aio.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        # Strip ```json fences safely
        if text.startswith("```"):
            text = text.strip("`")
            text = text[text.find("{"):]

        data = json.loads(text)

        return AIAction(**data)

    except Exception as e:
        logger.warning(f"[AI_ACTION_DETECTOR_FAILED] {e}")
        return AIAction(action="none", confidence=0.0)
