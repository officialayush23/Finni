# app/api/v1/endpoints/analysis.py

from fastapi import APIRouter, Depends, HTTPException
from app.services.prediction_engine import PredictionEngine
from app.services.news_engine import NewsEngine
from app.schemas.schemas import AnalysisResponse

router = APIRouter()
predictor = PredictionEngine()
news_analyzer = NewsEngine()

@router.get("/{symbol}", response_model=AnalysisResponse)
async def analyze_asset(symbol: str, asset_type: str = "stock"):
    """Get Prophet Prediction + FinBERT News Sentiment"""
    try:
        # Run in threadpool since libraries are sync
        import asyncio
        loop = asyncio.get_event_loop()
        
        points, metrics = await loop.run_in_executor(None, predictor.run_forecast, symbol, asset_type)
        news = await loop.run_in_executor(None, news_analyzer.fetch_and_analyze, symbol)
        
        return AnalysisResponse(
            symbol=symbol,
            graph_data=points,
            metrics=metrics,
            news=news
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))