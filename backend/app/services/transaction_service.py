# app/services/transaction_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.all_models import Transaction, Budget
from app.services.budget_engine import calculate_budget_spent
from app.services.budget_alerts import send_budget_alert


async def handle_budget_checks(
    db: AsyncSession,
    transaction: Transaction,
):
    result = await db.execute(
        select(Budget)
        .where(Budget.user_id == transaction.user_id)
        .where(Budget.is_active == True)
    )

    budgets = result.scalars().all()

    for budget in budgets:
        spent = await calculate_budget_spent(
            db=db,
            user_id=transaction.user_id,
            budget=budget,
        )

        pct = (spent / float(budget.limit_amount)) * 100 if budget.limit_amount else 0

        if pct >= float(budget.alert_threshold):
            await send_budget_alert(
                user_id=transaction.user_id,
                category_name=budget.name,
                spent=spent,
                limit=float(budget.limit_amount),
                percentage=pct,
            )
