# app/services/finance_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.services.risk_engine import assess_user_risk
from app.services.goal_service import calculate_goal_progress
from sqlalchemy import select
from app.models.all_models import Budget, FinancialGoal, IncomeSource


async def compute_goal_feasibility(goal: FinancialGoal):
    guaranteed = 0.0
    advisory = 0.0

    for alloc in goal.allocations:
        if alloc.income_source and alloc.allocation_percentage:
            guaranteed += (
                float(alloc.income_source.estimated_monthly_amount)
                * float(alloc.allocation_percentage)
                / 100
            )

        if alloc.portfolio_holding:
            if alloc.allocation_type == "capital":
                guaranteed += float(alloc.allocation_fixed_amount or 0)
            else:
                advisory += float(alloc.portfolio_holding.current_value or 0) * 0.01

    return {
        "guaranteed": round(guaranteed, 2),
        "advisory": round(advisory, 2),
    }
