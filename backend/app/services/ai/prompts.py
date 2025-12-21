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
