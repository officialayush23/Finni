# app/services/ingestion_parser.py

import re
from datetime import datetime
from decimal import Decimal
from typing import Optional

from app.models.enums import TxnSourceEnum

AMOUNT_REGEX = re.compile(r"(₹|rs\.?|inr)?\s?([0-9,]+(\.[0-9]{1,2})?)", re.I)
DATE_REGEX = re.compile(r"(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})")


def parse_amount(text: str) -> Optional[Decimal]:
    match = AMOUNT_REGEX.search(text)
    if not match:
        return None
    amt = match.group(2).replace(",", "")
    return Decimal(amt)


def parse_date(text: str) -> datetime:
    match = DATE_REGEX.search(text)
    if match:
        try:
            return datetime.strptime(match.group(1), "%d/%m/%Y")
        except Exception:
            pass
    return datetime.utcnow()


def parse_merchant(text: str) -> str:
    # naive first pass
    lines = text.splitlines()
    return lines[0][:120] if lines else "Unknown"


def normalize_source(source: str) -> TxnSourceEnum:
    return TxnSourceEnum(source)
