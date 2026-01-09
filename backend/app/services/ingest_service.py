# app/services/ingest_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.models.all_models import RawFinancialEvent
from app.services.parsers.simple_parser import parse_transaction_text

async def process_raw_event(
    db: AsyncSession,
    raw: RawFinancialEvent,
) -> dict | None:
    """
    Ingestion ONLY parses raw text.
    Returns a proposed transaction dict or None.
    """
    parsed = await parse_transaction_text(raw.raw_text)
    if not parsed:
        return None

    raw.parsed = True
    await db.commit()

    return {
        "amount": parsed["amount"],
        "currency": parsed.get("currency", "INR"),
        "merchant_raw": parsed.get("merchant"),
        "occurred_at": parsed.get("occurred_at"),
        "description": parsed.get("description"),
        "source": raw.source,
    }
