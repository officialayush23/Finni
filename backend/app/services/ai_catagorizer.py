# app/services/ai_catagorizer.py

from google import genai
from app.core.config import settings
import json

client = genai.Client(api_key=settings.GEMINI_API_KEY)

async def categorize_transaction(text: str) -> dict:
    prompt = f"""
    Categorize this transaction.
    Return JSON only.

    Text: "{text}"

    Fields:
    - category_name
    - confidence (0-1)
    """

    resp = await client.aio.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )

    return json.loads(resp.text)
