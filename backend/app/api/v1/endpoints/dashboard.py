# app/api/v1/endpoints/dashboard.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date

from app.core.database import get_db
from app.api.deps.auth import get_current_user, AuthUser
from app.models.all_models import (
    Transaction,
    IncomeSource,
    PortfolioHolding, FinancialGoal,    Budget

)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/overview")
async def dashboard_overview(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    today = date.today().replace(day=1)

    # Monthly income
    income_q = await db.execute(
        select(func.coalesce(func.sum(IncomeSource.estimated_monthly_amount), 0))
        .where(IncomeSource.user_id == auth.user_id)
        .where(IncomeSource.is_active == True)
    )
    monthly_income = float(income_q.scalar())

    # Monthly expenses
    expense_q = await db.execute(
        select(func.coalesce(func.sum(Transaction.amount), 0))
        .where(Transaction.user_id == auth.user_id)
        .where(Transaction.occurred_at >= today)
    )
    monthly_expense = float(expense_q.scalar())

    # Total investments value
    invest_q = await db.execute(
        select(func.coalesce(func.sum(PortfolioHolding.current_value), 0))
        .where(PortfolioHolding.user_id == auth.user_id)
    )
    total_investments = float(invest_q.scalar())

    savings = monthly_income - monthly_expense
    savings_rate = (
        round((savings / monthly_income) * 100, 2)
        if monthly_income > 0
        else 0
    )

    return {
        "monthly_income": monthly_income,
        "monthly_expense": monthly_expense,
        "savings": savings,
        "savings_rate": savings_rate,
        "total_investments": total_investments,
    }


@router.get("/goals")
async def dashboard_goals(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    from app.services.goal_service import calculate_goal_progress
    from app.services.goal_feasibility import compute_goal_feasibility

    result = await db.execute(
        select(FinancialGoal).where(FinancialGoal.user_id == auth.user_id)
    )
    goals = result.scalars().all()

    response = []

    for goal in goals:
        current = await calculate_goal_progress(db, goal)
        feasibility = await compute_goal_feasibility(goal)


        remaining = float(goal.target_amount) - current
        progress_pct = (
            round((current / float(goal.target_amount)) * 100, 2)
            if goal.target_amount
            else 0
        )

        response.append(
            {
                "id": str(goal.id),
                "name": goal.name,
                "target_amount": float(goal.target_amount),
                "current_amount": current,
                "remaining": max(remaining, 0),
                "progress_percentage": progress_pct,
                "feasibility": feasibility,
                "status": goal.status,
            }
        )

    return response

@router.get("/investments")
async def dashboard_investments(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(PortfolioHolding)
        .where(PortfolioHolding.user_id == auth.user_id)
    )
    holdings = result.scalars().all()

    total_value = sum(float(h.current_value or 0) for h in holdings)

    response = []

    for h in holdings:
        meta = h.metadata_ or {}
        expected_annual = meta.get("expected_annual_return")

        monthly_return = (
            round((float(h.current_value or 0) * expected_annual) / 1200, 2)
            if expected_annual
            else None
        )

        allocation_pct = (
            round((float(h.current_value or 0) / total_value) * 100, 2)
            if total_value > 0
            else 0
        )

        response.append(
            {
                "id": str(h.id),
                "name": h.name,
                "asset_type": h.asset_type.value,
                "current_value": float(h.current_value or 0),
                "allocation_percentage": allocation_pct,
                "expected_monthly_return": monthly_return,
                "is_pinned": meta.get("is_pinned", False),
                "last_api_fetch": h.last_api_fetch,
            }
        )

    return {
        "total_value": total_value,
        "holdings": response,
    }

@router.get("/charts/expenses")
async def expense_timeseries(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(
            func.date_trunc("day", Transaction.occurred_at).label("day"),
            func.sum(Transaction.amount),
        )
        .where(Transaction.user_id == auth.user_id)
        .group_by("day")
        .order_by("day")
    )

    return [
        {"date": row.day.date().isoformat(), "amount": float(row[1])}
        for row in result.all()
    ]

@router.get("/charts/categories")
async def category_breakdown(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(
            Transaction.category_id,
            func.sum(Transaction.amount),
        )
        .where(Transaction.user_id == auth.user_id)
        .group_by(Transaction.category_id)
    )

    return [
        {
            "category_id": str(row[0]),
            "amount": float(row[1]),
        }
        for row in result.all()
    ]

@router.get("/charts/investments")
async def investment_chart(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    result = await db.execute(
        select(
            PortfolioHolding.name,
            PortfolioHolding.current_value,
            PortfolioHolding.last_api_fetch,
        )
        .where(PortfolioHolding.user_id == auth.user_id)
    )

    return [
        {
            "name": row.name,
            "value": float(row.current_value or 0),
            "timestamp": row.last_api_fetch,
        }
        for row in result.all()
    ]

@router.post("/explain")
async def explain_dashboard_api(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    from app.services.ai_context import build_user_financial_context
    from app.services.dashboard_ai import explain_dashboard

    context = await build_user_financial_context(db, auth.user_id)
    explanation = await explain_dashboard(context)

    return {"summary": explanation}


@router.get("/score")
async def finance_score(
    db: AsyncSession = Depends(get_db),
    auth: AuthUser = Depends(get_current_user),
):
    from app.services.finance_service import compute_finance_score
    return {
        "score": await compute_finance_score(db, auth.user_id)
    }
