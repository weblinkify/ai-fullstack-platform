from app.ai.client import AIClient
from app.ai.parsing import parse_model
from app.projects.models import ProjectRequest, ProjectResponse
from app.projects.prompts import PROJECT_SYSTEM_PROMPT, build_project_prompt


class ProjectService:
    def __init__(self) -> None:
        self.client = AIClient()

    async def generate(self, request: ProjectRequest) -> ProjectResponse:
        response = await self.client.generate(
            system_prompt=PROJECT_SYSTEM_PROMPT,
            user_prompt=build_project_prompt(request.idea),
            temperature=0.2,
        )

        return parse_model(
            response.content,
            ProjectResponse,
            "AI returned an invalid project specification",
        )
