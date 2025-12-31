# app/services/allocation_validator.py
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import GoalAllocation, PortfolioHolding

async def validate_portfolio_allocation(
    db: AsyncSession,
    holding_id,
    new_pct: float | None,
    new_amount: float | None,
    exclude_goal_id=None,
):
    result = await db.execute(
        select(
            func.coalesce(func.sum(GoalAllocation.allocation_percentage), 0),
            func.coalesce(func.sum(GoalAllocation.allocation_fixed_amount), 0),
        )
        .where(GoalAllocation.portfolio_holding_id == holding_id)
        .where(GoalAllocation.allocation_type == "capital")
        .where(
            GoalAllocation.goal_id != exclude_goal_id
            if exclude_goal_id is not None
            else True
        )
    )

    used_pct, used_amt = result.one()

    holding = await db.get(PortfolioHolding, holding_id)
    if not holding:
        raise ValueError("Portfolio holding not found")

    if new_pct and used_pct + new_pct > 100:
        raise ValueError("Investment allocation exceeds 100%")

    if new_amount and used_amt + new_amount > float(holding.current_value or 0):
        raise ValueError("Investment allocation exceeds holding value")
