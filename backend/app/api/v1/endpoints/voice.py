# app/api/v1/endpoints/voice.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.services.parsers.simple_parser import parse_transaction_text

router = APIRouter(prefix="/voice", tags=["Voice"])


@router.post("/ingest")
async def ingest_voice(
    transcript: str,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    parsed = await parse_transaction_text(transcript)

    if not parsed:
        return {
            "detected": False,
            "message": "No financial transaction detected",
        }

    return {
        "detected": True,
        "preview": parsed,
        "requires_confirmation": True,
    }
