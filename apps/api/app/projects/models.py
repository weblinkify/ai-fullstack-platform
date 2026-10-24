from pydantic import BaseModel, Field


class ProjectRequest(BaseModel):
    idea: str = Field(min_length=10, max_length=5000)


class ProjectArchitecture(BaseModel):
    frontend: list[str]
    backend: list[str]
    database: list[str]
    infrastructure: list[str]


class ProjectResponse(BaseModel):
    title: str
    summary: str
    features: list[str]
    architecture: ProjectArchitecture
    api: list[str]
    database: list[str]
    implementation_plan: list[str]
