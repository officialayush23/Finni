# app/services/risk_engine.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import (
    FinancialGoal,
    IncomeSource,
    PortfolioHolding,
    GoalAllocation,
)
import math


async def assess_user_risk(db: AsyncSession, user_id):
    incomes = (
        await db.execute(
            select(IncomeSource).where(IncomeSource.user_id == user_id)
        )
    ).scalars().all()

    investments = (
        await db.execute(
            select(PortfolioHolding).where(PortfolioHolding.user_id == user_id)
        )
    ).scalars().all()

    goals = (
        await db.execute(
            select(FinancialGoal).where(FinancialGoal.user_id == user_id)
        )
    ).scalars().all()

    risk = {
        "income_risk": 0,
        "investment_risk": 0,
        "goal_risk": 0,
        "liquidity_risk": 0,
        "alerts": [],
    }

    # 1️⃣ Income Risk
    active_incomes = [i for i in incomes if i.is_active]
    if len(active_incomes) <= 1:
        risk["income_risk"] = 80
        risk["alerts"].append("High dependence on a single income source")
    else:
        risk["income_risk"] = max(20, 100 - len(active_incomes) * 15)

    # 2️⃣ Investment Risk
    total_value = sum(float(i.current_value or 0) for i in investments)
    volatile = sum(
        float(i.current_value or 0)
        for i in investments
        if i.asset_type in ["stock", "crypto"]
    )

    if total_value > 0:
        exposure = volatile / total_value
        risk["investment_risk"] = round(exposure * 100)
        if exposure > 0.6:
            risk["alerts"].append("Portfolio heavily exposed to volatile assets")

    # 3️⃣ Goal Feasibility Risk
    for goal in goals:
        allocs = (
            await db.execute(
                select(GoalAllocation)
                .where(GoalAllocation.goal_id == goal.id)
            )
        ).scalars().all()

        monthly = 0
        for a in allocs:
            if a.allocation_fixed_amount:
                monthly += float(a.allocation_fixed_amount)
            elif a.income_source and a.allocation_percentage:
                monthly += (
                    float(a.income_source.estimated_monthly_amount or 0)
                    * float(a.allocation_percentage) / 100
                )

        if monthly == 0:
            risk["goal_risk"] += 25
            risk["alerts"].append(
                f"Goal '{goal.name}' has no active funding"
            )
            continue

        months = goal.target_amount / monthly
        if months > 72:
            risk["goal_risk"] += 20
            risk["alerts"].append(
                f"Goal '{goal.name}' unlikely to meet timeline"
            )

    # 4️⃣ Liquidity Risk
    locked = sum(
        float(i.current_value or 0)
        for i in investments
        if i.asset_type in ["real_estate", "bond"]
    )

    if total_value > 0 and locked / total_value > 0.5:
        risk["liquidity_risk"] = 70
        risk["alerts"].append("Low liquidity due to long-term assets")
    else:
        risk["liquidity_risk"] = 30

    # Normalize
    risk["overall_risk"] = round(
        (
            risk["income_risk"]
            + risk["investment_risk"]
            + risk["goal_risk"]
            + risk["liquidity_risk"]
        ) / 4,
        2,
    )

    return risk
