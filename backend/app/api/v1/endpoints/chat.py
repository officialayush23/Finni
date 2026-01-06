# app/api/v1/endpoints/chat.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services.chat_service import ChatService
from app.schemas.schemas import ChatRequest, ChatResponse
from app.api.deps.auth import get_current_user, AuthUser

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat_with_advisor(
    req: ChatRequest,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    service = ChatService(db)

    response, session_id = await service.process_message(
        user_id=auth.user_id,
        message=req.message,
        session_id=req.session_id,
       
    )

    return ChatResponse(response=response, session_id=session_id)
