# app/services/goal_ai.py
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import FinancialGoal, AIExplanation
from app.services.ai_service import generate_text


async def analyze_goal_feasibility(
    db: AsyncSession,
    goal: FinancialGoal,
):
    prompt = f"""
Assess if this financial goal is feasible.

Goal: {goal.name}
Target amount: {goal.target_amount}
Target date: {goal.target_date}
Current amount: {goal.current_amount}

Give advice and risk level.
"""

    result = await generate_text(prompt)

    ai = AIExplanation(
        entity_type="goal",
        entity_id=goal.id,
        explanation={"analysis": result},
        model="gemini",
    )

    db.add(ai)
    await db.commit()
