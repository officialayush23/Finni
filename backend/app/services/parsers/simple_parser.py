# app/services/parsers/simple_parser.py

import re
from datetime import datetime

AMOUNT_RE = re.compile(r"(rs\.?|₹)\s?(\d+(?:\.\d+)?)", re.I)


async def parse_transaction_text(text: str) -> dict | None:
    """
    First-pass parser.
    Replace with Gemini later if needed.
    """

    amt_match = AMOUNT_RE.search(text)
    if not amt_match:
        return None

    amount = float(amt_match.group(2))

    return {
        "amount": amount,
        "currency": "INR",
        "merchant": text[:50],
        "occurred_at": datetime.utcnow(),
        "description": text,
        "category_id": None,  # auto-classifier later
    }
