# app/api/v1/endpoints/goals.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import FinancialGoal, GoalAllocation
from app.schemas.schemas import GoalCreate, GoalAllocationCreate, GoalResponse
from app.services.goal_service import calculate_goal_progress
from app.services.allocation_validator import validate_portfolio_allocation
from app.services.goal_optimizer import optimize_goal
from app.services.conflict_detector import validate_goal_allocation, create_conflict_record
from app.utils.api_errors import api_error

router = APIRouter()

@router.post("/", response_model=GoalResponse)
async def create_goal(
    payload: GoalCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    goal = FinancialGoal(
        user_id=auth.user_id,
        name=payload.name,
        target_amount=payload.target_amount,
        target_date=payload.target_date,
    )

    db.add(goal)
    await db.commit()
    await db.refresh(goal)

    return GoalResponse(
        id=str(goal.id),
        name=goal.name,
        target_amount=goal.target_amount,
        current_amount=0,
        target_date=goal.target_date,
        status=goal.status,
    )

@router.get("/", response_model=list[GoalResponse])
async def list_goals(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(FinancialGoal).where(FinancialGoal.user_id == auth.user_id)
    )

    goals = result.scalars().all()
    response = []

    for g in goals:
        current = await calculate_goal_progress(db, g)
        response.append(
            GoalResponse(
                id=str(g.id),
                name=g.name,
                target_amount=g.target_amount,
                current_amount=current,
                target_date=g.target_date,
                status=g.status,
            )
        )

    return response

@router.post("/{goal_id}/allocate")
async def allocate_goal(
    goal_id: str,
    payload: GoalAllocationCreate,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    goal = await db.get(FinancialGoal, goal_id)

    if not goal or goal.user_id != auth.user_id:
        api_error("GOAL_NOT_FOUND", "Goal not found", status=404)

    if not payload.income_source_id and not payload.portfolio_holding_id:
        api_error(
            "ALLOCATION_INVALID",
            "income_source_id or portfolio_holding_id required",
            status=400,
        )

    try:
        # Validate portfolio allocation if applicable
        if payload.portfolio_holding_id:
            await validate_portfolio_allocation(
                db,
                payload.portfolio_holding_id,
                payload.allocation_percentage,
                payload.allocation_fixed_amount,
                exclude_goal_id=goal.id,
            )

        # Validate for conflicts
        is_valid, conflicts = await validate_goal_allocation(
            db,
            auth.user_id,
            goal_id,
            income_source_id=payload.income_source_id,
            portfolio_holding_id=payload.portfolio_holding_id,
            allocation_percentage=payload.allocation_percentage,
            allocation_fixed_amount=payload.allocation_fixed_amount,
        )

        if not is_valid:
            # Log conflicts
            for conflict in conflicts:
                await create_conflict_record(
                    db,
                    auth.user_id,
                    conflict["type"],
                    conflict["details"],
                )
            conflict_messages = [c.get("message", "") for c in conflicts]
            api_error(
                "ALLOCATION_CONFLICT",
                f"Allocation conflicts detected: {'; '.join(conflict_messages)}",
                status=409,
                details={"conflicts": conflicts},
            )

        alloc = GoalAllocation(
            goal_id=goal.id,
            income_source_id=payload.income_source_id,
            portfolio_holding_id=payload.portfolio_holding_id,
            allocation_percentage=payload.allocation_percentage,
            allocation_fixed_amount=payload.allocation_fixed_amount,
            allocation_type=payload.allocation_type,
        )

        db.add(alloc)
        await db.commit()

        return {"status": "allocated"}
    except ValueError as e:
        api_error("ALLOCATION_VALIDATION_FAILED", str(e), status=400)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        api_error("ALLOCATION_FAILED", str(e), status=500)


@router.get("/{goal_id}/feasibility")
async def goal_feasibility(
    goal_id: str,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    from app.services.goal_feasibility import compute_goal_feasibility

    goal = await db.get(FinancialGoal, goal_id)
    if not goal or goal.user_id != auth.user_id:
        api_error("GOAL_NOT_FOUND", "Goal not found", status=404)

    try:
        return await compute_goal_feasibility(db, goal_id)
    except Exception as e:
        api_error("FEASIBILITY_COMPUTE_FAILED", str(e), status=500)


@router.get("/{goal_id}/optimize")
async def optimize_goal_api(
    goal_id: str,
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    goal = await db.get(FinancialGoal, goal_id)
    if not goal or goal.user_id != auth.user_id:
        api_error("GOAL_NOT_FOUND", "Goal not found", status=404)

    try:
        risk_profile = (
            auth.preferences.get("risk_profile", "moderate")
            if hasattr(auth, "preferences")
            else "moderate"
        )
        return await optimize_goal(
            db=db,
            goal=goal,
            risk_profile=risk_profile,
        )
    except Exception as e:
        api_error("OPTIMIZATION_FAILED", str(e), status=500)
