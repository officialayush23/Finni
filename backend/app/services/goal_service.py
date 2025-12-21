# app/services/goal_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date

from app.models.all_models import (
    FinancialGoal,
    GoalAllocation,
    IncomeSource,
    PortfolioHolding,
)


async def calculate_goal_progress(
    db: AsyncSession,
    goal: FinancialGoal,
) -> float:
    """
    Computes current_amount dynamically
    """

    total = 0.0

    for alloc in goal.allocations:
        if alloc.allocation_fixed_amount:
            total += float(alloc.allocation_fixed_amount)

        elif alloc.allocation_percentage:
            if alloc.income_source:
                total += (
                    float(alloc.income_source.estimated_monthly_amount)
                    * float(alloc.allocation_percentage)
                    / 100
                )

            if alloc.portfolio_holding:
                total += (
                    float(alloc.portfolio_holding.current_value or 0)
                    * float(alloc.allocation_percentage)
                    / 100
                )

    return round(total, 2)
