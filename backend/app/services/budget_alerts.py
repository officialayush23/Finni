# app/services/budget_alerts.py

from app.services.websocket_manager import manager

async def send_budget_alert(
    user_id,
    category_name,
    spent,
    limit,
    percentage,
):
    await manager.broadcast_to_user(
        str(user_id),
        {
            "type": "budget_alert",
            "data": {
                "category": category_name,
                "spent": spent,
                "limit": limit,
                "percentage": round(percentage, 2),
            },
        },
    )
