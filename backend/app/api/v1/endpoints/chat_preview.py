# app/api/v1/endpoints/chat_preview.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.services.parsers.simple_parser import parse_transaction_text
from app.utils.api_errors import api_error

router = APIRouter()


@router.post("/preview-transaction")
async def preview_transaction(
    message: str,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    parsed = await parse_transaction_text(message)

    if not parsed:
        raise api_error("PARSE_FAILED", "No transaction detected")

    return {
        "preview": parsed,
        "requires_confirmation": True,
    }
