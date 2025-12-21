# app/services/ai_service.py

from google import genai
from app.core.config import settings
from typing import Optional, List
import numpy as np

client = genai.Client(api_key=settings.GEMINI_API_KEY)


async def generate_text(prompt: str) -> str:
    response = await client.aio.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )
    return response.text


async def generate_embedding(text: str) -> list[float]:
    """
    Gemini embeddings → stored in pgvector
    """
    resp = await client.aio.models.embed_content(
        model="text-embedding-004",
        content=text,
    )
    return resp["embedding"]
