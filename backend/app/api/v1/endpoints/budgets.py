# app/api/v1/endpoints/budgets.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import Budget
from app.schemas.schemas import BudgetCreate, BudgetResponse, BudgetUpdate
from app.services.budget_engine import calculate_budget_spent

router = APIRouter()


@router.get("/", response_model=list[BudgetResponse])
async def list_budgets(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    budgets = (
        await db.execute(select(Budget).where(Budget.user_id == auth.user_id))
    ).scalars().all()

    out = []
    for b in budgets:
        spent = await calculate_budget_spent(db, auth.user_id, b)
        limit = float(b.limit_amount)
        pct = (spent / limit) * 100 if limit else 0

        out.append(
            BudgetResponse(
                id=str(b.id),
                name=b.name,
                limit_amount=b.limit_amount,
                period=b.period,
                alert_threshold=b.alert_threshold,
                is_active=b.is_active,
                spent=spent,
                remaining=max(limit - spent, 0),
                percentage_used=round(pct, 2),
            )
        )

    return out


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
        metadata_={
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
        is_active=True,
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
        raise HTTPException(404, "Budget not found")

    if budget.metadata_ is None:
        budget.metadata_ = {}

    data = payload.model_dump(exclude_unset=True)
    for k, v in data.items():
        if k in ["included_category_ids", "excluded_category_ids", "excluded_merchants"]:
            budget.metadata_[k] = v
        else:
            setattr(budget, k, v)

    await db.commit()
    return {"status": "updated"}
