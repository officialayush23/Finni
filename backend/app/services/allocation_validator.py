# app/services/allocation_validator.py
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import GoalAllocation, PortfolioHolding

from decimal import Decimal
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

    # 🔑 NORMALIZE
    used_pct = float(used_pct or 0)
    used_amt = float(used_amt or 0)

    holding = await db.get(PortfolioHolding, holding_id)
    if not holding:
        raise ValueError("Portfolio holding not found")

    holding_value = float(holding.current_value or 0)

    if new_pct is not None and used_pct + float(new_pct) > 100:
        raise ValueError("Investment allocation exceeds 100%")

    if new_amount is not None and used_amt + float(new_amount) > holding_value:
        raise ValueError("Investment allocation exceeds holding value")