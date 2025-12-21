# backend/app/main.py
from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.endpoints import analysis, chat, websocket, ingest

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(analysis.router, prefix="/api/v1/analysis", tags=["AI Analysis"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["AI Chat"])
app.include_router(websocket.router, tags=["Realtime"])
# app.include_router(ingest.router...) 

@app.get("/")
def root():
    return {"status": "System Online", "modules": ["Prophet", "FinBERT", "Gemini", "Redis"]}