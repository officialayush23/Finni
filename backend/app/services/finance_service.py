# app/services/finance_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.all_models import (
    Transaction,
    Budget,
    IncomeSource,
    PortfolioHolding,
    FinancialGoal,
)

async def compute_finance_score(
    db: AsyncSession,
    user_id,
) -> int:
    """
    Produces a 0–100 finance health score.
    Deterministic, explainable, NO AI.
    """

    # Income
    income_q = await db.execute(
        select(func.coalesce(func.sum(IncomeSource.estimated_monthly_amount), 0))
        .where(IncomeSource.user_id == user_id)
        .where(IncomeSource.is_active == True)
    )
    income = float(income_q.scalar())

    # Expenses (last 30 days)
    expense_q = await db.execute(
        select(func.coalesce(func.sum(Transaction.amount), 0))
        .where(Transaction.user_id == user_id)
    )
    expenses = float(expense_q.scalar())

    # Budgets
    budget_q = await db.execute(
        select(func.count(Budget.id))
        .where(Budget.user_id == user_id)
        .where(Budget.is_active == True)
    )
    budget_count = budget_q.scalar()

    # Investments
    invest_q = await db.execute(
        select(func.coalesce(func.sum(PortfolioHolding.current_value), 0))
        .where(PortfolioHolding.user_id == user_id)
    )
    investments = float(invest_q.scalar())

    score = 50

    if income > expenses:
        score += 15
    else:
        score -= 10

    if budget_count > 0:
        score += 10

    if investments > income * 6:
        score += 15

    return max(0, min(100, score))
