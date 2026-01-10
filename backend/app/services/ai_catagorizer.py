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
- category_name (string)
- confidence (0 to 1)
"""

    resp = await client.aio.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    data = json.loads(resp.text)

    return {
        "category_name": data["category_name"].strip(),
        "confidence": max(0.0, min(1.0, float(data["confidence"]))),
    }
