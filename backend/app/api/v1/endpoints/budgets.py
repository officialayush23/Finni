# app/api/v1/endpoints/budgets.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import Budget
from app.schemas.schemas import BudgetCreate, BudgetResponse, BudgetUpdate
from app.services.budget_service import calculate_budget_usage
from datetime import date
from app.services.budget_engine import calculate_budget_spent
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
        spent = await calculate_budget_spent(db, auth.user_id, b)
        pct = (spent / b.limit_amount) * 100 if b.limit_amount else 0

        response.append(
            BudgetResponse(
                id=str(b.id),
                name=b.name,
                limit_amount=b.limit_amount,
                period=b.period,
                alert_threshold=b.alert_threshold,
                is_active=b.is_active,
                spent=spent,
                remaining=max(b.limit_amount - spent, 0),
                percentage_used=round(pct, 2),
            )
        )

    return response


    return response
@router.post("/", response_model=BudgetResponse)
async def create_budget(
    payload: BudgetCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    budget = Budget(
        user_id=auth.user_id,
        name=payload.name,
        limit_amount=payload.limit_amount,
        period=payload.period,
        alert_threshold=payload.alert_threshold,
        metadata={
            "included_category_ids": payload.included_category_ids,
            "excluded_category_ids": payload.excluded_category_ids,
            "excluded_merchants": payload.excluded_merchants,
        },
    )

    db.add(budget)
    await db.commit()
    await db.refresh(budget)

    return BudgetResponse(
        id=str(budget.id),
        name=budget.name,
        limit_amount=budget.limit_amount,
        period=budget.period,
        alert_threshold=budget.alert_threshold,
        is_active=budget.is_active,
        spent=0,
        remaining=budget.limit_amount,
        percentage_used=0,
    )


@router.patch("/{budget_id}")
async def update_budget(
    budget_id: str,
    payload: BudgetUpdate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    budget = await db.get(Budget, budget_id)

    if not budget or budget.user_id != auth.user_id:
        raise HTTPException(status_code=404, detail="Budget not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        if field in ["included_category_ids", "excluded_category_ids", "excluded_merchants"]:
            budget.metadata[field] = value
        else:
            setattr(budget, field, value)

    await db.commit()
    return {"status": "updated"}
