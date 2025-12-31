# app/api/v1/endpoints/ai_preview.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.services.chat_actions import maybe_create_budget

router = APIRouter(prefix="/ai/preview", tags=["AI Preview"])


@router.post("/budget")
async def preview_budget_creation(
    message: str,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    budget = await maybe_create_budget(db, auth.user_id, message)

    if not budget:
        return {"action": "none"}

    return {
        "action": "create_budget",
        "preview": {
            "name": budget.name,
            "limit_amount": float(budget.limit_amount),
            "period": budget.period,
        },
        "requires_confirmation": True,
    }
