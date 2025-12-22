# app/services/ai/prompts.py
CATEGORIZATION_PROMPT = """
You are a financial transaction classifier.

Return ONLY valid JSON.
No markdown. No explanation outside JSON.

Input:
{text}

Rules:
- Pick the best category_id from the provided list
- If unsure, lower confidence
- Normalize merchant name
- Detect food, subscription, recurring signals
"""


BUDGET_ACTION_PROMPT = """
You are a financial assistant.

Decide whether the user is asking to CREATE a budget.

Return ONLY valid JSON.

Fields:
- action: "create_budget" or "none"
- name
- limit_amount (number only)
- period (daily | weekly | monthly)
- reasoning

User message:
"{message}"

Recent transactions:
{transactions}
"""
