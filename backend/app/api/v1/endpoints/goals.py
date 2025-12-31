# app/api/v1/endpoints/goals.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import FinancialGoal, GoalAllocation
from app.schemas.schemas import (
    GoalCreate,
    GoalUpdate,
    GoalAllocationCreate,
    GoalResponse,
)
from app.services.goal_service import calculate_goal_progress

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
        try:
            if not g.allocations:
                current = 0
            else:
                current = await calculate_goal_progress(db, g)
        except Exception as e:
            # Log internal error
            print(f"[GOAL_PROGRESS_ERROR] goal_id={g.id} error={repr(e)}")
            current = 0

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
        raise HTTPException(status_code=404, detail="Goal not found")
    
    if not payload.income_source_id and not payload.portfolio_holding_id:
        raise HTTPException(
            status_code=400,
            detail="Either income_source_id or portfolio_holding_id is required",
        )

    alloc = GoalAllocation(
        goal_id=goal.id,
        income_source_id=payload.income_source_id,
        portfolio_holding_id=payload.portfolio_holding_id,
        allocation_percentage=payload.allocation_percentage,
        allocation_fixed_amount=payload.allocation_fixed_amount,
    )

    db.add(alloc)
    await db.commit()

    return {"status": "allocated"}
