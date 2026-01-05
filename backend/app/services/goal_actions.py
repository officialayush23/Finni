# app/services/goal_actions.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import FinancialGoal, GoalAllocation
from datetime import date

async def create_goal_from_ai(
    db: AsyncSession,
    user_id,
    name: str,
    target_amount: float,
    target_date: date,
):
    goal = FinancialGoal(
        user_id=user_id,
        name=name,
        target_amount=target_amount,
        target_date=target_date,
    )
    db.add(goal)
    await db.commit()
    await db.refresh(goal)
    return goal


async def allocate_goal_from_ai(
    db: AsyncSession,
    goal_id,
    income_source_id=None,
    portfolio_holding_id=None,
    allocation_percentage=None,
    allocation_fixed_amount=None,
    allocation_type="expected_return",
):
    alloc = GoalAllocation(
        goal_id=goal_id,
        income_source_id=income_source_id,
        portfolio_holding_id=portfolio_holding_id,
        allocation_percentage=allocation_percentage,
        allocation_fixed_amount=allocation_fixed_amount,
        allocation_type=allocation_type,
    )
    db.add(alloc)
    await db.commit()
    return alloc
