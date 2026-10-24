from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Nexora AI"
    environment: str = "development"

    ai_api_key: str = ""
    ai_model: str = "local-mock"
    ai_base_url: str | None = None
    ai_mock_mode: bool = False

    cors_origins: list[str] = [
        "http://localhost:3000",
        "https://nexora-ai-native.netlify.app",
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
