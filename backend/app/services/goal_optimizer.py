# app/services/goal_optimizer.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date
from app.models.all_models import (
    FinancialGoal,
    IncomeSource,
    PortfolioHolding,
    GoalAllocation,
)
import uuid

MONTHLY_ROI_FALLBACK = 0.01  # conservative

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

    # ---- CURRENT COMMITMENTS ----
    used_income_pct = {}
    used_capital = {}

    result = await db.execute(
        select(GoalAllocation)
        .where(GoalAllocation.goal_id != goal.id)
    )
    allocations = result.scalars().all()

    for a in allocations:
        if a.income_source_id and a.allocation_percentage:
            used_income_pct[a.income_source_id] = (
                used_income_pct.get(a.income_source_id, 0)
                + float(a.allocation_percentage)
            )

        if a.portfolio_holding_id and a.allocation_fixed_amount:
            used_capital[a.portfolio_holding_id] = (
                used_capital.get(a.portfolio_holding_id, 0)
                + float(a.allocation_fixed_amount)
            )

    plans = []

    # ---- INCOME BASED ----
    for inc in incomes:
        available_pct = 100 - used_income_pct.get(inc.id, 0)
        if available_pct <= 0:
            continue

        risk_pct = {
            "conservative": 15,
            "moderate": 25,
            "aggressive": 40,
        }.get(risk_profile, 25)

        pct = min(available_pct, risk_pct)
        monthly = float(inc.estimated_monthly_amount or 0)
        contribution = monthly * pct / 100

        if contribution <= 0:
            continue

        months = int(goal.target_amount / contribution)

        plans.append({
            "source": "income",
            "source_id": str(inc.id),
            "allocation_percentage": pct,
            "monthly_contribution": round(contribution, 2),
            "months_to_goal": months,
            "confidence": 0.9,
        })

    # ---- INVESTMENT RETURN BASED ----
    for inv in investments:
        capital_used = used_capital.get(inv.id, 0)
        available_capital = float(inv.current_value or 0) - capital_used
        if available_capital <= 0:
            continue

        roi = inv.metadata_.get("expected_annual_return", 12)
        monthly_return = available_capital * (roi / 100) / 12

        if monthly_return <= 0:
            continue

        months = int(goal.target_amount / monthly_return)

        plans.append({
            "source": "investment_return",
            "source_id": str(inv.id),
            "monthly_contribution": round(monthly_return, 2),
            "months_to_goal": months,
            "confidence": 0.7,
        })

    if not plans:
        return {
            "feasibility_score": 0.0,
            "message": "No available income or investments to allocate",
        }

    best = sorted(plans, key=lambda x: x["months_to_goal"])[0]

    return {
        "plan_id": str(uuid.uuid4()),
        "feasibility_score": round(min(1.0, 60 / best["months_to_goal"]), 2),
        "time_to_goal_months": best["months_to_goal"],
        "recommended_plan": best,
        "alternatives": plans[:3],
        "constraints_checked": [
            "income over-allocation",
            "investment capital reuse",
            "risk profile limits",
        ],
        "risks": [
            "Income may fluctuate",
            "Investment returns are not guaranteed",
        ],
    }
