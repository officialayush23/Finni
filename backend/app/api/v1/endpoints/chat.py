# app/api/v1/endpoints/chat.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services.chat_service import ChatService
from app.schemas.schemas import ChatRequest, ChatResponse
import uuid

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat_with_advisor(req: ChatRequest, db: AsyncSession = Depends(get_db)):
    service = ChatService(db)
    response, session_id = await service.process_message(uuid.UUID(req.user_id), req.message, req.session_id)
    return ChatResponse(response=response, session_id=session_id)