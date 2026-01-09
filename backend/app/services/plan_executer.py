# app/services/plan_executer.py
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from app.services.budget_actions import create_budget_from_ai
from app.services.goal_actions import create_goal_from_ai

async def apply_plan(
    db: AsyncSession,
    user_id: UUID,
    plan: dict,
):
    created = {
        "goal": None,
        "budgets": [],
    }

    goal = plan.get("goal")
    if goal:
        created["goal"] = await create_goal_from_ai(
            db=db,
            user_id=user_id,
            name=goal["name"],
            target_amount=goal["target_amount"],
            target_date=goal["target_date"],
        )

    for b in plan.get("recommended_budgets", []):
        budget = await create_budget_from_ai(
            db=db,
            user_id=user_id,
            name=b["name"],
            limit_amount=b["limit_amount"],
            period="monthly",
        )
        created["budgets"].append(budget)

    return created
