# app/core/redis_client.py

import redis.asyncio as redis
from app.core.config import settings

# Global Redis Pool
redis_pool = redis.ConnectionPool.from_url(settings.REDIS_URL, decode_responses=True)

def get_redis():
    return redis.Redis(connection_pool=redis_pool)