from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from app.ai.exceptions import AIProviderError
from app.ai.models import AIRequest, AIResponse
from app.ai.service import AIService
from app.config import get_settings
from app.projects.router import router as project_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="AI-native full-stack application platform.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(project_router)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/ai/generate", response_model=AIResponse)
async def generate_ai(request: AIRequest) -> AIResponse:
    try:
        return await AIService().generate(request)
    except AIProviderError as exc:
        raise HTTPException(
            status_code=502,
            detail="AI provider request failed",
        ) from exc


@app.post("/api/ai/stream")
async def stream_ai(request: AIRequest) -> StreamingResponse:
    return StreamingResponse(
        AIService().stream(request),
        media_type="text/plain",
    )
