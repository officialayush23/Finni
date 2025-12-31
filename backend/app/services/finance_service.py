# app/services/finance_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.services.risk_engine import assess_user_risk
from app.services.goal_service import calculate_goal_progress
from sqlalchemy import select
from app.models.all_models import Budget, FinancialGoal, IncomeSource


async def compute_finance_score(db: AsyncSession, user_id):
    score = 0

    # 1️⃣ Budget Discipline
    budgets = (
        await db.execute(
            select(Budget).where(Budget.user_id == user_id)
        )
    ).scalars().all()

    if budgets:
        score += 25
    else:
        score += 10

    # 2️⃣ Savings Rate
    incomes = (
        await db.execute(
            select(IncomeSource).where(IncomeSource.user_id == user_id)
        )
    ).scalars().all()

    monthly_income = sum(
        float(i.estimated_monthly_amount or 0) for i in incomes
    )

    if monthly_income > 0:
        score += 20
    else:
        score += 5

    # 3️⃣ Goal Progress
    goals = (
        await db.execute(
            select(FinancialGoal).where(FinancialGoal.user_id == user_id)
        )
    ).scalars().all()

    if goals:
        score += 20
    else:
        score += 10

    # 4️⃣ Risk Health
    risk = await assess_user_risk(db, user_id)
    score += max(0, 25 - risk["overall_risk"] / 4)

    return round(min(score, 100), 2)
