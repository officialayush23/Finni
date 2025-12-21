# app/api/v1/endpoints/budgets.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import Budget
from app.schemas.schemas import BudgetCreate, BudgetResponse
from app.services.budget_service import calculate_budget_usage
from datetime import date
router = APIRouter()




@router.get("/", response_model=list[BudgetResponse])
async def list_budgets(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(Budget).where(Budget.user_id == auth.user_id)
    )
    budgets = result.scalars().all()

    response = []
    for b in budgets:
        spent = await calculate_budget_usage(
            db=db,
            user_id=auth.user_id,
            category_id=b.category_id,
            start_date=date.today().replace(day=1),
            end_date=date.today(),
        )

        response.append(
            BudgetResponse(
                id=str(b.id),
                category_id=str(b.category_id),
                limit_amount=b.limit_amount,
                alert_threshold=b.alert_threshold,
                period=b.period,
                is_active=b.is_active,
                spent=spent,
            )
        )

    return response

@router.post("/", response_model=BudgetResponse)
async def create_budget(
    payload: BudgetCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    budget = Budget(
        user_id=auth.user_id,
        category_id=payload.category_id,
        limit_amount=payload.limit_amount,
        alert_threshold=payload.alert_threshold or 80,
        period=payload.period or "monthly",
    )

    db.add(budget)
    await db.commit()
    await db.refresh(budget)

    return BudgetResponse(
        id=str(budget.id),
        category_id=str(budget.category_id),
        limit_amount=budget.limit_amount,
        alert_threshold=budget.alert_threshold,
        period=budget.period,
        is_active=budget.is_active,
    )
