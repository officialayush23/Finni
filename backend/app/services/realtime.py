# backend/app/services/realtime.py
from app.websocket.manager import manager
from app.websocket.message_types import (
    msg_transaction_created,
    msg_budget_alert,
    msg_transaction_updated,
)

# ----------------------------
# TRANSACTIONS
# ----------------------------

async def emit_transaction_created(user_id, txn):
    await manager.send_to_user(
        str(user_id),
        msg_transaction_created({
            "id": str(txn.id),
            "amount": float(txn.amount),
            "merchant": txn.merchant_raw,
            "category_id": str(txn.category_id) if txn.category_id else None,
            "occurred_at": txn.occurred_at.isoformat(),
        }),
    )


# ----------------------------
# BUDGETS
# ----------------------------

async def emit_budget_alert(user_id, alert):
    await manager.send_to_user(
        str(user_id),
        msg_budget_alert(**alert),
    )


async def emit_budget_created(user_id, budget):
    await manager.send_to_user(
        str(user_id),
        {
            "type": "budget_created",
            "data": {
                "id": str(budget.id),
                "name": budget.name,
                "limit_amount": float(budget.limit_amount),
                "period": budget.period,
            },
        },
    )


# ----------------------------
# GOALS
# ----------------------------

async def emit_goal_created(user_id, goal):
    await manager.send_to_user(
        str(user_id),
        {
            "type": "goal_created",
            "data": {
                "id": str(goal.id),
                "name": goal.name,
                "target_amount": float(goal.target_amount),
                "target_date": goal.target_date.isoformat(),
            },
        },
    )


async def emit_goal_allocated(user_id, goal_id):
    await manager.send_to_user(
        str(user_id),
        {
            "type": "goal_allocated",
            "data": {
                "goal_id": str(goal_id),
            },
        },
    )


# ----------------------------
# INVESTMENTS
# ----------------------------

async def emit_investment_created(user_id, investment):
    await manager.send_to_user(
        str(user_id),
        {
            "type": "investment_created",
            "data": {
                "id": str(investment.id),
                "name": investment.name,
                "current_value": float(investment.current_value or 0),
            },
        },
    )
