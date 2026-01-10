# app/services/ai/categorizer.py
from app.services.ai.schemas import AICategorizationResult
from app.services.ai.prompts import CATEGORIZATION_PROMPT
from app.core.config import settings
from app.services.ai.schemas import AICategorizationResult
from google import genai
import json

client = genai.Client(api_key=settings.GEMINI_API_KEY)


async def categorize_transaction(
    text: str,
    categories: list[dict] | None = None,
) -> AICategorizationResult:
    """
    Categorize a merchant/transaction into a system category.
    """

    categories = categories or []

    prompt = CATEGORIZATION_PROMPT.format(
        text=text,
        categories=categories,
    )

    response = await client.aio.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )

    data = json.loads(response.text)

    return AICategorizationResult(**data)
