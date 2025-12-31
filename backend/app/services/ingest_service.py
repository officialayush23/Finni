# app/services/ingest_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.models.all_models import RawFinancialEvent, Transaction, TxnSourceEnum
from app.services.transaction_service import handle_budget_checks
from app.services.transaction_ai import explain_transaction
from app.services.websocket_manager import manager
from app.services.parsers.simple_parser import parse_transaction_text


def normalize_txn_source(raw_source: str) -> TxnSourceEnum:
    try:
        return TxnSourceEnum(raw_source)
    except ValueError:
        return TxnSourceEnum.notification


async def process_raw_event(
    db: AsyncSession,
    raw: RawFinancialEvent,
):
    parsed = await parse_transaction_text(raw.raw_text)

    if not parsed:
        await manager.broadcast_to_user(
            str(raw.user_id),
            {
                "type": "ingest_failed",
                "reason": "No financial data detected",
            },
        )
        return

    txn = Transaction(
        user_id=raw.user_id,
        amount=parsed["amount"],
        currency=parsed.get("currency", "INR"),
        occurred_at=parsed.get("occurred_at", datetime.utcnow()),
        merchant_raw=parsed.get("merchant"),
        category_id=parsed.get("category_id"),
        description=parsed.get("description"),
        source=normalize_txn_source(raw.source),
        raw_event_id=raw.id,
    )

    db.add(txn)
    raw.parsed = True

    await db.commit()
    await db.refresh(txn)

    await handle_budget_checks(db, txn)
    await explain_transaction(db, txn)

    await manager.broadcast_to_user(
        str(raw.user_id),
        {
            "type": "transaction_created",
            "data": {
                "id": str(txn.id),
                "amount": float(txn.amount),
                "merchant": txn.merchant_raw,
                "source": txn.source.value,
            },
        },
    )
