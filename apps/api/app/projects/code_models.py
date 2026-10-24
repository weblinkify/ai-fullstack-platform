from pydantic import BaseModel, Field

from app.projects.models import ProjectArchitecture


class GeneratedFile(BaseModel):
    path: str
    language: str
    content: str


class CodeGenerationRequest(BaseModel):
    idea: str = Field(min_length=10, max_length=5000)
    architecture: ProjectArchitecture


class CodeGenerationResponse(BaseModel):
    project_name: str
    summary: str
    files: list[GeneratedFile]
