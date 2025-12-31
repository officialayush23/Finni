# app/api/v1/api.py
from fastapi import APIRouter

from app.api.v1.endpoints import (
    analysis,
    chat,
    websocket,
    user,
    income,
    investments,
    budgets,
    ingest,
    transactions,
    goals,
    dashboard,



)

api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["User"])
api_router.include_router(income.router, prefix="/income", tags=["Income"])
api_router.include_router(investments.router, prefix="/investments", tags=["Investments"])
api_router.include_router(budgets.router, prefix="/budgets", tags=["Budgets"])
api_router.include_router(goals.router, prefix="/goals", tags=["Goals"])
api_router.include_router(ingest.router, prefix="/ingest", tags=["Ingestion"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["AI Analysis"])
api_router.include_router(chat.router, prefix="/chat", tags=["AI Chat"])
api_router.include_router(
    transactions.router,
    prefix="/transactions",
    tags=["Transactions"],
)
api_router.include_router(dashboard.router)


# websocket has no prefix
api_router.include_router(websocket.router)
