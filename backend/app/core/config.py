# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # --- App Info ---
    PROJECT_NAME: str = "SmartFinance AI"
    APP_NAME: str = "SmartFinance AI"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = True
    ENABLE_HEAVY_ML: bool = False

    # --- Security & Auth ---
    SUPABASE_JWT_SECRET: str
    SECRET_KEY: str = ""
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # --- Database ---
    DATABASE_URL: str  # MUST be full DSN, not libpq args

    # --- Redis ---
    REDIS_URL: str

    # --- Supabase ---
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # --- AI ---
    GEMINI_API_KEY: str

    # --- CORS ---
    CORS_ORIGINS: str

    @property
    def ASYNC_DATABASE_URL(self) -> str:
        """
        Force asyncpg driver for SQLAlchemy Async
        """
        if self.DATABASE_URL.startswith("postgresql://"):
            return self.DATABASE_URL.replace(
                "postgresql://",
                "postgresql+asyncpg://",
                1,
            )
        return self.DATABASE_URL

    @property
    def all_cors_origins(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",")]

    def model_post_init(self, __context):
        if not self.SECRET_KEY and self.SUPABASE_JWT_SECRET:
            self.SECRET_KEY = self.SUPABASE_JWT_SECRET

    class Config:
        env_file = ".env"
        extra = "ignore"
        case_sensitive = True


settings = Settings()
