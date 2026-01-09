# app/services/ai_service.py

from google import genai
from app.core.config import settings
from typing import Optional, List
import numpy as np

client = genai.Client(api_key=settings.GEMINI_API_KEY)


async def generate_text(prompt: str) -> str:
    response = await client.aio.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return response.text

async def generate_embedding(text: str) -> list[float]:
    try:
        resp = await client.aio.models.embed_content(
            model="text-embedding-004",
            contents=text,
        )

        # ✅ correct for Gemini SDK
        if hasattr(resp, "embedding") and hasattr(resp.embedding, "values"):
            return resp.embedding.values

        return [0.0] * 1536

    except Exception as e:
        import logging
        logging.getLogger(__name__).warning(f"Failed to generate embedding: {e}")
        return [0.0] * 1536
