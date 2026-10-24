from typing import Literal

from pydantic import BaseModel, Field


class AIMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str


class AIRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=10000)
    system_prompt: str | None = None
    temperature: float = Field(default=0.2, ge=0.0, le=2.0)


class AIResponse(BaseModel):
    content: str
    model: str
    usage: dict[str, int] | None = None
