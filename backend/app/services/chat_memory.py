# app/services/chat_memory.py
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import ChatMessage
from app.services.ai_service import generate_embedding


async def embed_chat_message(
    db: AsyncSession,
    message: ChatMessage,
):
    embedding = await generate_embedding(message.content)
    message.embedding = embedding
    await db.commit()
