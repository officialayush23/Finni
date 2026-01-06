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
    try:
        resp = await client.aio.models.embed_content(
            model="text-embedding-004",
            contents=text,  # Use 'contents' (plural) not 'content'
        )
        # Response is an object with 'embedding' attribute
        if hasattr(resp, 'embedding'):
            return resp.embedding
        elif isinstance(resp, dict) and "embedding" in resp:
            return resp["embedding"]
        else:
            # Fallback: try to get embedding from response
            return list(resp.values())[0] if resp else []
    except Exception as e:
        # Log error but don't fail - embeddings are optional
        import logging
        logger = logging.getLogger(__name__)
        logger.warning(f"Failed to generate embedding: {e}")
        # Return empty embedding (1536 dimensions for text-embedding-004)
        return [0.0] * 1536
