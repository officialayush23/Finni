# app/services/budget_alerts.py

from app.services.realtime import emit_budget_alert

async def send_budget_alert(
    user_id,
    category_name,
    spent,
    limit,
    percentage,
):
    await emit_budget_alert(
        user_id,
        {
            "category": category_name,
            "spent": spent,
            "limit": limit,
            "percentage": round(percentage, 2),
        },
    )
