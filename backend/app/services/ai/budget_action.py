# app/service/ai/budget_action.py
import json
from google import genai
from app.core.config import settings
from app.services.ai.prompts import BUDGET_ACTION_PROMPT
from app.services.ai.actions import AIBudgetAction

client = genai.Client(api_key=settings.GEMINI_API_KEY)


async def detect_budget_action(message: str, transactions: str) -> AIBudgetAction:
    prompt = BUDGET_ACTION_PROMPT.format(
        message=message,
        transactions=transactions,
    )

    response = await client.aio.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )

    data = json.loads(response.text)
    return AIBudgetAction(**data)
