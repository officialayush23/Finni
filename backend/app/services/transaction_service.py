# app/services/transaction_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime
from uuid import UUID
import logging

from app.models.all_models import Transaction, Budget, TxnSourceEnum
from app.services.budget_engine import calculate_budget_spent
from app.services.budget_alerts import send_budget_alert

logger = logging.getLogger(__name__)


# -----------------------------
# MAIN ENTRY POINT (AI / VOICE / CHAT)
# -----------------------------
async def create_transaction(
    db: AsyncSession,
    *,
    user_id: UUID,
    amount: float,
    occurred_at: datetime,
    source: TxnSourceEnum,
    merchant_raw: str | None = None,
    description: str | None = None,
    category_id: UUID | None = None,
):
    """
    SINGLE source of truth for transactions.
    """
    txn = Transaction(
        user_id=user_id,
        amount=amount,
        occurred_at=occurred_at,
        merchant_raw=merchant_raw,
        description=description,
        category_id=category_id,
        source=source,
    )
    if amount <= 0:
        raise ValueError("Transaction amount must be positive")
    db.add(txn)

    # Budget checks BEFORE commit
    await handle_budget_checks(db, txn)

    await db.commit()
    await db.refresh(txn)

    return txn

# -----------------------------
# BUDGET HANDLING
# -----------------------------
async def handle_budget_checks(
    db: AsyncSession,
    transaction: Transaction,
):
    """
    Check budgets for a transaction and send alerts if thresholds are exceeded.
    Uses calculate_budget_spent for accurate calculation.
    """
    try:
        result = await db.execute(
            select(Budget)
            .where(Budget.user_id == transaction.user_id)
            .where(Budget.is_active == True)
        )
        budgets = result.scalars().all()

        for budget in budgets:
            # Check if transaction matches this budget's categories
            meta = budget.metadata_ or {}
            included_categories = meta.get("included_category_ids", [])
            excluded_categories = meta.get("excluded_category_ids", [])
            
            # Skip if transaction category is excluded
            if transaction.category_id and str(transaction.category_id) in excluded_categories:
                continue
            
            # Check if transaction matches included categories (or all if none specified)
            matches_budget = False
            if not included_categories:
                # No specific categories means all transactions match
                matches_budget = True
            elif transaction.category_id and str(transaction.category_id) in included_categories:
                matches_budget = True
            
            if not matches_budget:
                continue

            # Calculate total spent for this budget period
            spent = await calculate_budget_spent(
                db=db,
                user_id=transaction.user_id,
                budget=budget,
            )

            # Calculate percentage used
            pct = (
                (spent / float(budget.limit_amount)) * 100
                if budget.limit_amount and budget.limit_amount > 0
                else 0
            )

            # Send alert if threshold exceeded
            if pct >= float(budget.alert_threshold):
                await send_budget_alert(
                    user_id=transaction.user_id,
                    category_name=budget.name,
                    spent=spent,
                    limit=float(budget.limit_amount),
                    percentage=pct,
                )
                logger.info(
                    f"Budget alert sent for user {transaction.user_id}, "
                    f"budget {budget.name}: {pct:.2f}% used"
                )
    except Exception as e:
        logger.error(f"Error in handle_budget_checks: {e}", exc_info=True)
        # Don't raise - budget check failure shouldn't prevent transaction creation
        # but log it for monitoring
