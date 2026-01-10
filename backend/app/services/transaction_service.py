# app/services/transaction_service.py
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from uuid import UUID
import logging

from app.services.transaction_ingestion import resolve_merchant_and_category
from app.models.all_models import Transaction, Budget, TxnSourceEnum
from app.services.budget_engine import calculate_budget_spent
from app.services.budget_alerts import send_budget_alert
from app.services.category_suggestor import suggest_categories
logger = logging.getLogger(__name__)

LOW_CONFIDENCE_THRESHOLD = 0.6


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
    if amount <= 0:
        raise ValueError("Transaction amount must be positive")

    merchant_id = None
    resolved_category_id = category_id
    confidence = 1.0

    if merchant_raw:
        merchant, cat_id, ai_conf = await resolve_merchant_and_category(
            db,
            user_id=user_id,
            merchant_raw=merchant_raw,
        )
        merchant_id = merchant.id
        confidence = ai_conf

        if not resolved_category_id:
            resolved_category_id = cat_id

    needs_review = confidence < LOW_CONFIDENCE_THRESHOLD

    suggestions = None
    if needs_review:
        suggestions = await suggest_categories(
            db,
            user_id=user_id,
            merchant_id=merchant_id,
        )

    txn = Transaction(
        user_id=user_id,
        amount=amount,
        occurred_at=occurred_at,
        merchant_id=merchant_id,
        merchant_raw=merchant_raw,
        category_id=resolved_category_id,
        category_confidence=confidence,
        needs_category_review=needs_review,
        category_suggestions=suggestions,
        description=description,
        source=source,
    )

    db.add(txn)
    await db.commit()
    await db.refresh(txn)

    await handle_budget_checks(db, txn)

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
