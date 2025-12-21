# app/api/v1/endpoints/savings.py
from fastapi import APIRouter, Depends
from datetime import date
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.services.savings_service import calculate_monthly_savings

router = APIRouter()

@router.get("/")
async def get_savings(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    savings = await calculate_monthly_savings(
        db=db,
        user_id=auth.user_id,
        month=date.today(),
    )

    return {
        "month": date.today().strftime("%Y-%m"),
        "savings": savings,
    }
