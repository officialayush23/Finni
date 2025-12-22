# app/services/ai_context.py

from sqlalchemy import select
from app.models.all_models import (
    User, Transaction, Budget, IncomeSource, PortfolioHolding
)

async def build_user_financial_context(db, user_id):
    user = await db.get(User, user_id)

    txns = (
        await db.execute(
            select(Transaction)
            .where(Transaction.user_id == user_id)
            .order_by(Transaction.occurred_at.desc())
            .limit(5)
        )
    ).scalars().all()

    budgets = (
        await db.execute(
            select(Budget).where(Budget.user_id == user_id)
        )
    ).scalars().all()

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

    return {
        "profile": {
            "name": user.full_name,
            "preferences": user.preferences,
        },
        "recent_transactions": [
            {
                "amount": float(t.amount),
                "category": str(t.category_id),
                "merchant": t.merchant_raw,
            }
            for t in txns
        ],
        "budgets": [
            {
                "name": b.name,
                "limit": float(b.limit_amount),
                "metadata": b.metadata_,
            }
            for b in budgets
        ],
        "income": [
            {"name": i.name, "monthly": float(i.estimated_monthly_amount)}
            for i in incomes
        ],
        "investments": [
            {
                "name": inv.name,
                "value": float(inv.current_value or 0),
            }
            for inv in investments
        ],
    }

