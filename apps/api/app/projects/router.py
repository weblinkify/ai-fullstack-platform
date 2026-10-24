from fastapi import APIRouter, HTTPException
from fastapi.responses import Response

from app.ai.exceptions import AIProviderError
from app.projects.code_generator import CodeGeneratorService
from app.projects.code_models import (
    CodeGenerationRequest,
    CodeGenerationResponse,
)
from app.projects.export import (
    architecture_filename,
    build_architecture_document,
)
from app.projects.models import ProjectRequest, ProjectResponse
from app.projects.service import ProjectService

router = APIRouter(
    prefix="/api/projects",
    tags=["projects"],
)


@router.post("/generate", response_model=ProjectResponse)
async def generate_project(request: ProjectRequest) -> ProjectResponse:
    try:
        return await ProjectService().generate(request)
    except AIProviderError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/code", response_model=CodeGenerationResponse)
async def generate_code(
    request: CodeGenerationRequest,
) -> CodeGenerationResponse:
    try:
        return await CodeGeneratorService().generate(request)
    except AIProviderError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/architecture/export")
async def export_architecture(project: ProjectResponse) -> Response:
    filename = architecture_filename(project.title)

    return Response(
        content=build_architecture_document(project),
        media_type="text/markdown",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
        },
    )
