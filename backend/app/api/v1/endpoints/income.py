# app/api/v1/endpoints/income.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import IncomeSource
from app.schemas.schemas import IncomeCreate, IncomeResponse, IncomeUpdate
from datetime import datetime
from sqlalchemy import select   
router = APIRouter()

@router.post("/", response_model=IncomeResponse)
async def create_income(
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
        api_source_identifier=payload.api_source_identifier,
    )

    db.add(income)
    await db.commit()
    await db.refresh(income)

    return IncomeResponse(
        id=str(income.id),
        name=income.name,
        source_type=income.source_type,
        rate_type=income.rate_type,
        estimated_monthly_amount=income.estimated_monthly_amount,
        is_active=income.is_active,
    )
@router.get("/", response_model=list[IncomeResponse])
async def list_income_sources(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(IncomeSource).where(IncomeSource.user_id == auth.user_id)
    )
    incomes = result.scalars().all()

    return [
        IncomeResponse(
            id=str(i.id),
            name=i.name,
            source_type=i.source_type,
            rate_type=i.rate_type,
            estimated_monthly_amount=i.estimated_monthly_amount,
            is_active=i.is_active,
        )
        for i in incomes
    ]


@router.patch("/{income_id}")
async def update_income(
    income_id: str,
    payload: IncomeUpdate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    income = await db.get(IncomeSource, income_id)

    if not income or income.user_id != auth.user_id:
        raise HTTPException(status_code=404)

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(income, field, value)

    await db.commit()


    return {"status": "updated"}
