# app/services/conflict_detector.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date
from uuid import UUID
import logging

from app.models.all_models import (
    Budget,
    FinancialGoal,
    GoalAllocation,
    IncomeSource,
    PortfolioHolding,
    GoalConflict,
)

logger = logging.getLogger(__name__)


async def detect_budget_goal_conflicts(
    db: AsyncSession,
    user_id: UUID,
    new_budget: Budget | None = None,
    new_goal: FinancialGoal | None = None,
) -> list[dict]:
    """
    Detect conflicts between budgets and goals.
    Returns list of conflict details.
    """
    conflicts = []

    try:
        # Get all active budgets
        budgets_result = await db.execute(
            select(Budget)
            .where(Budget.user_id == user_id)
            .where(Budget.is_active == True)
        )
        budgets = budgets_result.scalars().all()
        if new_budget:
            budgets = list(budgets) + [new_budget]

        # Get all active goals
        goals_result = await db.execute(
            select(FinancialGoal)
            .where(FinancialGoal.user_id == user_id)
            .where(FinancialGoal.status == "active")
        )
        goals = goals_result.scalars().all()
        if new_goal:
            goals = list(goals) + [new_goal]

        # Get total monthly income
        income_result = await db.execute(
            select(func.coalesce(func.sum(IncomeSource.estimated_monthly_amount), 0))
            .where(IncomeSource.user_id == user_id)
            .where(IncomeSource.is_active == True)
        )
        total_monthly_income = float(income_result.scalar())

        # Calculate total budget commitments
        total_budget_limits = sum(
            float(b.limit_amount or 0) for b in budgets
        )

        # Calculate total goal allocations from income
        goal_allocations_result = await db.execute(
            select(GoalAllocation)
            .join(FinancialGoal)
            .where(FinancialGoal.user_id == user_id)
            .where(FinancialGoal.status == "active")
            .where(GoalAllocation.income_source_id.isnot(None))
        )
        goal_allocations = goal_allocations_result.scalars().all()

        total_goal_income_pct = 0.0
        for alloc in goal_allocations:
            if alloc.income_source_id and alloc.allocation_percentage:
                total_goal_income_pct += float(alloc.allocation_percentage)

        # Check if budgets + goals exceed income
        if total_budget_limits > 0 and total_goal_income_pct > 0:
            budget_pct_of_income = (total_budget_limits / total_monthly_income * 100) if total_monthly_income > 0 else 0
            total_commitment_pct = budget_pct_of_income + total_goal_income_pct

            if total_commitment_pct > 100:
                conflicts.append({
                    "type": "income_overallocation",
                    "severity": "high",
                    "message": f"Total budget limits ({total_budget_limits:.2f}) and goal allocations ({total_goal_income_pct:.2f}% of income) exceed available income",
                    "details": {
                        "total_monthly_income": total_monthly_income,
                        "total_budget_limits": total_budget_limits,
                        "total_goal_income_pct": total_goal_income_pct,
                        "total_commitment_pct": total_commitment_pct,
                    }
                })

        # Check for competing goals on same income source
        income_sources_result = await db.execute(
            select(IncomeSource)
            .where(IncomeSource.user_id == user_id)
            .where(IncomeSource.is_active == True)
        )
        income_sources = income_sources_result.scalars().all()

        for income_source in income_sources:
            allocations_for_source = [
                a for a in goal_allocations
                if a.income_source_id == income_source.id
            ]
            total_pct = sum(float(a.allocation_percentage or 0) for a in allocations_for_source)

            if total_pct > 100:
                conflicts.append({
                    "type": "income_source_overallocation",
                    "severity": "high",
                    "message": f"Income source '{income_source.name}' has {total_pct:.2f}% allocated across goals (exceeds 100%)",
                    "details": {
                        "income_source_id": str(income_source.id),
                        "income_source_name": income_source.name,
                        "total_allocation_pct": total_pct,
                    }
                })

    except Exception as e:
        logger.error(f"Error detecting budget-goal conflicts: {e}", exc_info=True)

    return conflicts


async def detect_capital_overallocation(
    db: AsyncSession,
    user_id: UUID,
    portfolio_holding_id: UUID,
    new_allocation_amount: float,
    exclude_goal_id: UUID | None = None,
) -> list[dict]:
    """
    Detect if capital allocation exceeds available portfolio holding value.
    """
    conflicts = []

    try:
        holding = await db.get(PortfolioHolding, portfolio_holding_id)
        if not holding:
            return conflicts

        # Get existing allocations for this holding
        query = (
            select(func.coalesce(func.sum(GoalAllocation.allocation_fixed_amount), 0))
            .where(GoalAllocation.portfolio_holding_id == portfolio_holding_id)
            .where(GoalAllocation.allocation_type == "capital")
        )

        if exclude_goal_id:
            query = query.where(GoalAllocation.goal_id != exclude_goal_id)

        result = await db.execute(query)
        existing_allocated = float(result.scalar() or 0)
        available_capital = float(holding.current_value or 0) - existing_allocated



        if new_allocation_amount > available_capital:
            conflicts.append({
                "type": "capital_overallocation",
                "severity": "high",
                "message": f"Allocation amount ({new_allocation_amount:.2f}) exceeds available capital ({available_capital:.2f})",
                "details": {
                    "portfolio_holding_id": str(portfolio_holding_id),
                    "holding_name": holding.name,
                    "current_value": float(holding.current_value or 0),
                    "existing_allocated": existing_allocated,
                    "available_capital": available_capital,
                    "requested_allocation": new_allocation_amount,
                }
            })

    except Exception as e:
        logger.error(f"Error detecting capital overallocation: {e}", exc_info=True)

    return conflicts


async def create_conflict_record(
    db: AsyncSession,
    user_id: UUID,
    conflict_type: str,
    details: dict,
    month: date | None = None,
):
    """
    Create a GoalConflict record for tracking.
    """
    try:
        conflict = GoalConflict(
            user_id=user_id,
            month=month or date.today().replace(day=1),
            conflict_type=conflict_type,
            details=details,
        )
        db.add(conflict)
        await db.commit()
        logger.info(f"Created conflict record for user {user_id}, type: {conflict_type}")
    except Exception as e:
        logger.error(f"Error creating conflict record: {e}", exc_info=True)
        await db.rollback()


async def validate_budget_creation(
    db: AsyncSession,
    user_id: UUID,
    limit_amount: float,
) -> tuple[bool, list[dict]]:
    """
    Validate if a new budget can be created without conflicts.
    Returns (is_valid, conflicts).
    """
    # Create a temporary budget object for conflict detection
    from app.models.all_models import Budget
    temp_budget = Budget(
        user_id=user_id,
        limit_amount=limit_amount,
        is_active=True,
    )

    conflicts = await detect_budget_goal_conflicts(db, user_id, new_budget=temp_budget)
    return len(conflicts) == 0, conflicts


async def validate_goal_allocation(
    db: AsyncSession,
    user_id: UUID,
    goal_id: UUID,
    income_source_id: UUID | None = None,
    portfolio_holding_id: UUID | None = None,
    allocation_percentage: float | None = None,
    allocation_fixed_amount: float | None = None,
) -> tuple[bool, list[dict]]:
    """
    Validate if a goal allocation can be created without conflicts.
    Returns (is_valid, conflicts).
    """
    conflicts = []

    if income_source_id:
        # Check income source overallocation
        budget_goal_conflicts = await detect_budget_goal_conflicts(db, user_id)
        conflicts.extend(budget_goal_conflicts)

    if portfolio_holding_id and allocation_fixed_amount:
        # Check capital overallocation
        capital_conflicts = await detect_capital_overallocation(
            db, user_id, portfolio_holding_id, allocation_fixed_amount, exclude_goal_id=goal_id
        )
        conflicts.extend(capital_conflicts)

    return len(conflicts) == 0, conflicts

