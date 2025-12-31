# app/services/goal_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date
from sqlalchemy.orm import selectinload

from app.models.all_models import (
    FinancialGoal,
    GoalAllocation,
    IncomeSource,
    PortfolioHolding,
)

async def calculate_goal_progress(
    db: AsyncSession,
    goal,
) -> float:
    total = 0.0

    result = await db.execute(
        select(GoalAllocation)
        .where(GoalAllocation.goal_id == goal.id)
        .options(
            selectinload(GoalAllocation.income_source),
            selectinload(GoalAllocation.portfolio_holding),
        )
    )

    allocations = result.scalars().all()

    for alloc in allocations:
        if alloc.allocation_fixed_amount:
            total += float(alloc.allocation_fixed_amount)
            continue

        if not alloc.allocation_percentage:
            continue

        pct = float(alloc.allocation_percentage) / 100

        if alloc.income_source and alloc.income_source.estimated_monthly_amount:
            total += float(alloc.income_source.estimated_monthly_amount) * pct

        if (
            alloc.portfolio_holding
            and alloc.portfolio_holding.current_value
            and alloc.allocation_type == "expected_return"
        ):
            # conservative ROI: 1% monthly
            total += float(alloc.portfolio_holding.current_value) * 0.01 * pct

    return round(total, 2)
