# app/api/v1/risk.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
router = APIRouter(prefix="/risk", tags=["Risk"])
from app.services.risk_engine import assess_user_risk


@router.get("/overview")
async def risk_overview(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):


    return await assess_user_risk(db, auth.user_id)
