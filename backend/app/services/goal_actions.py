# app/services/goal_actions.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import FinancialGoal, GoalAllocation
from datetime import date
from uuid import UUID
import logging
from app.services.conflict_detector import (
    validate_goal_allocation,
    create_conflict_record,
    detect_budget_goal_conflicts,
)

logger = logging.getLogger(__name__)


async def create_goal_from_ai(
    db: AsyncSession,
    user_id,
    name: str,
    target_amount: float,
    target_date: date,
):
    """
    Create a goal from AI with conflict detection.
    """
    # Check for conflicts with existing budgets/goals
    from app.models.all_models import FinancialGoal as FG
    temp_goal = FG(
        user_id=user_id,
        name=name,
        target_amount=target_amount,
        target_date=target_date,
        status="active",
    )
    
    conflicts = await detect_budget_goal_conflicts(db, user_id, new_goal=temp_goal)
    
    if conflicts:
        # Log conflicts but don't block creation
        for conflict in conflicts:
            await create_conflict_record(
                db,
                user_id,
                conflict["type"],
                conflict["details"],
            )
        logger.warning(
            f"Goal creation for user {user_id} has conflicts: {conflicts}"
        )

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
    """
    Allocate resources to a goal with conflict detection.
    """
    # Get goal to find user_id
    goal = await db.get(FinancialGoal, goal_id)
    if not goal:
        raise ValueError(f"Goal {goal_id} not found")

    # Validate allocation for conflicts
    is_valid, conflicts = await validate_goal_allocation(
        db,
        goal.user_id,
        goal_id,
        income_source_id=income_source_id,
        portfolio_holding_id=portfolio_holding_id,
        allocation_percentage=allocation_percentage,
        allocation_fixed_amount=allocation_fixed_amount,
    )

    if not is_valid:
        # Log conflicts
        for conflict in conflicts:
            await create_conflict_record(
                db,
                goal.user_id,
                conflict["type"],
                conflict["details"],
            )
        # Raise error to prevent invalid allocation
        conflict_messages = [c.get("message", "") for c in conflicts]
        raise ValueError(f"Allocation conflicts detected: {'; '.join(conflict_messages)}")

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
    await db.refresh(alloc)
    return alloc
