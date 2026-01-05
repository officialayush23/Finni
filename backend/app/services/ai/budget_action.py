# app/services/ai/budget_action.py
import json
from google import genai
from app.core.config import settings
from app.services.ai.prompts import BUDGET_ACTION_PROMPT
from app.services.ai.actions import AIBudgetAction

client = genai.Client(api_key=settings.GEMINI_API_KEY)


async def detect_budget_action(message: str, transactions: str) -> AIBudgetAction:
    """
    Detect AI action from user message.
    Supports: create_budget, create_transaction, create_goal, allocate_goal
    """
    prompt = BUDGET_ACTION_PROMPT.format(
        message=message,
        transactions=transactions,
    )

    try:
        response = await client.aio.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )

        # Try to extract JSON from response (handle markdown code blocks)
        text = response.text.strip()
        if text.startswith("```"):
            # Remove markdown code blocks
            lines = text.split("\n")
            text = "\n".join(lines[1:-1]) if lines[0].startswith("```") else text
        
        data = json.loads(text)
        return AIBudgetAction(**data)
    except json.JSONDecodeError as e:
        # Fallback to none action if JSON parsing fails
        return AIBudgetAction(action="none", confidence=0.0)
    except Exception as e:
        # Fallback on any error
        return AIBudgetAction(action="none", confidence=0.0)
