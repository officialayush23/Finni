# app/services/goal_optimizer.py
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import (
    FinancialGoal,
    IncomeSource,
    PortfolioHolding,
)
import uuid


async def optimize_goal(
    db: AsyncSession,
    goal: FinancialGoal,
    risk_profile: str,
):
    incomes = (
        await db.execute(
            select(IncomeSource)
            .where(IncomeSource.user_id == goal.user_id)
            .where(IncomeSource.is_active == True)
        )
    ).scalars().all()

    investments = (
        await db.execute(
            select(PortfolioHolding)
            .where(PortfolioHolding.user_id == goal.user_id)
        )
    ).scalars().all()

    plans = []

    for income in incomes:
        pct = 20 if risk_profile == "conservative" else 35

        monthly = float(income.estimated_monthly_amount or 0)
        contribution = monthly * pct / 100

        months = int(goal.target_amount / contribution) if contribution else 999

        plans.append({
            "source": "income",
            "source_id": str(income.id),
            "monthly_contribution": round(contribution, 2),
            "months_to_goal": months,
        })

    for inv in investments:
        roi = inv.metadata_.get("expected_annual_return", 6)
        monthly_yield = float(inv.current_value or 0) * (roi / 100) / 12

        plans.append({
            "source": "investment",
            "source_id": str(inv.id),
            "monthly_contribution": round(monthly_yield, 2),
            "months_to_goal": int(goal.target_amount / monthly_yield)
            if monthly_yield else 999,
        })

    best = sorted(plans, key=lambda x: x["months_to_goal"])[0]

    return {
        "plan_id": str(uuid.uuid4()),
        "feasibility_score": 0.85 if best["months_to_goal"] < 60 else 0.6,
        "time_to_goal_months": best["months_to_goal"],
        "allocations": plans[:3],
        "tradeoffs": [
            "Higher contribution reduces discretionary spending"
        ],
        "risks": [
            "Investment returns are not guaranteed"
        ],
        "recommendation": "Balanced income + investment approach",
    }
