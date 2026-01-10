# app/services/ai/categorizer.py
from app.services.ai.schemas import AICategorizationResult
from app.services.ai.prompts import CATEGORIZATION_PROMPT
from app.core.config import settings
from app.services.ai.schemas import AICategorizationResult
from google import genai
import json

client = genai.Client(api_key=settings.GEMINI_API_KEY)


async def categorize_transaction(text: str) -> dict:
    resp = await client.aio.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
Return ONLY valid JSON.
No markdown.
No explanation.

{{"category_name": string, "confidence": number}}

Text: "{text}"
"""
    )

    try:
        raw = resp.text.strip()
        json_start = raw.find("{")
        json_end = raw.rfind("}") + 1
        data = json.loads(raw[json_start:json_end])
    except Exception:
        # HARD fallback (never crash ingestion)
        return {
            "category_name": "Uncategorized",
            "confidence": 0.0,
        }

    return {
        "category_name": data.get("category_name", "Uncategorized"),
        "confidence": float(data.get("confidence", 0.0)),
    }