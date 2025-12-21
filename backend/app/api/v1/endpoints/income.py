# app/api/v1/endpoints/income.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import IncomeSource
from app.schemas.schemas import IncomeCreate, IncomeResponse

router = APIRouter()

@router.post("/", response_model=IncomeResponse)
async def add_income(
    payload: IncomeCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    income = IncomeSource(
        user_id=auth.user_id,
        name=payload.name,
        source_type=payload.source_type,
        rate_type=payload.rate_type,
        estimated_monthly_amount=payload.estimated_monthly_amount,
    )
    db.add(income)
    await db.commit()
    await db.refresh(income)

    return IncomeResponse(
        id=str(income.id),
        is_active=income.is_active,
        **payload.model_dump(),
    )
