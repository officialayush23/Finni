# app/services/transaction_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date
from app.models.all_models import Transaction, Budget, Category
from app.services.budget_service import calculate_budget_usage
from app.services.budget_alerts import send_budget_alert


async def handle_budget_checks(
    db: AsyncSession,
    transaction: Transaction,
):
    # Find budgets linked to this category or its parents
    result = await db.execute(
        select(Budget)
        .where(Budget.user_id == transaction.user_id)
        .where(Budget.is_active == True)
    )

    budgets = result.scalars().all()

    for budget in budgets:
        spent = await calculate_budget_usage(
            db=db,
            user_id=transaction.user_id,
            category_id=budget.category_id,
            start_date=date.today().replace(day=1),
            end_date=date.today(),
        )

        percentage = (spent / budget.limit_amount) * 100 if budget.limit_amount else 0

        if percentage >= budget.alert_threshold:
            await send_budget_alert(
                user_id=transaction.user_id,
                category_name=str(budget.category_id),
                spent=spent,
                limit=budget.limit_amount,
                percentage=percentage,
            )
