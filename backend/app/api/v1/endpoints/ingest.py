# app/api/v1/endpoints/ingest.py

from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def ingest_health():
    return {"status": "ingestion module ready"}
