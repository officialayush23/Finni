# app/services/goal_feasibility.py
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.all_models import FinancialGoal, GoalAllocation

async def compute_goal_feasibility(db, goal_id):
    result = await db.execute(
        select(FinancialGoal)
        .where(FinancialGoal.id == goal_id)
        .options(
            selectinload(FinancialGoal.allocations)
            .selectinload(GoalAllocation.income_source),
            selectinload(FinancialGoal.allocations)
            .selectinload(GoalAllocation.portfolio_holding),
        )
    )

    goal = result.scalar_one()

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
