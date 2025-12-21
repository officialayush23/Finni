# app/core/config.py

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    app_name: str
    environment: str
    debug: bool = False

    # Database
    database_url: str

    # Redis
    redis_url: str

    # Supabase
    supabase_anon_key: str
    supabase_service_role_key: str
    supabase_jwt_secret: str

    # AI
    gemini_api_key: str

    # CORS
    cors_origins: str | None = None

    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()
