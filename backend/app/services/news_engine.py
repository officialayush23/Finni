# app/services/news_engine.py
import logging
from app.schemas.schemas import NewsItem, SentimentType

logger = logging.getLogger(__name__)

class NewsEngine:
    def fetch_and_analyze(self, asset_name: str):
        """
        Heavy ML by default.
        If deps are missing (Render), gracefully degrade.
        """

        try:
            from GoogleNews import GoogleNews
            from transformers import pipeline
            import torch

            device = 0 if torch.cuda.is_available() else -1
            classifier = pipeline(
                "sentiment-analysis",
                model="ProsusAI/finbert",
                device=device,
            )

            googlenews = GoogleNews(lang="en", region="IN")
            googlenews.search(f"{asset_name} financial news")
            results = googlenews.result()[:5]

            analyzed = []
            for item in results:
                pred = classifier(item["title"])[0]
                sentiment = (
                    SentimentType.POSITIVE
                    if pred["label"].lower() == "positive"
                    else SentimentType.NEGATIVE
                )

                analyzed.append(
                    NewsItem(
                        title=item["title"],
                        source=item.get("media", "Google"),
                        sentiment=sentiment,
                        score=round(pred["score"], 2),
                    )
                )

            return analyzed

        except Exception as e:
            logger.warning(f"[NEWS_ENGINE_FALLBACK] {e}")

            # 🔻 Safe fallback
            return [
                NewsItem(
                    title=f"{asset_name} market outlook unavailable",
                    source="system",
                    sentiment=SentimentType.NEUTRAL,
                    score=0.5,
                )
            ]
