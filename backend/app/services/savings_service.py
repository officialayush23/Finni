# app/srevices/savings_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date

from app.models.all_models import IncomeSource, Transaction, GoalAllocation


async def calculate_monthly_savings(
    db: AsyncSession,
    user_id,
    month: date,
):
    start = month.replace(day=1)
    end = date.today()

    income = (
        await db.execute(
            select(func.coalesce(func.sum(IncomeSource.estimated_monthly_amount), 0))
            .where(
                IncomeSource.user_id == user_id,
                IncomeSource.is_active == True,
            )
        )
    ).scalar()

    expenses = (
        await db.execute(
            select(func.coalesce(func.sum(Transaction.amount), 0))
            .where(
                Transaction.user_id == user_id,
                Transaction.occurred_at >= start,
                Transaction.occurred_at <= end,
            )
        )
    ).scalar()

    allocated = (
        await db.execute(
            select(func.coalesce(func.sum(GoalAllocation.allocation_fixed_amount), 0))
            .select_from(GoalAllocation)
            .join(IncomeSource, GoalAllocation.income_source_id == IncomeSource.id)
            .where(IncomeSource.user_id == user_id)
        )
    ).scalar()

    return float(income - expenses - allocated)
