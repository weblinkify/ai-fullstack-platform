from app.ai.client import AIClient
from app.ai.parsing import parse_model
from app.projects.code_models import (
    CodeGenerationRequest,
    CodeGenerationResponse,
)
from app.projects.code_prompts import (
    CODE_GENERATION_SYSTEM_PROMPT,
    build_code_generation_prompt,
)


class CodeGeneratorService:
    def __init__(self) -> None:
        self.client = AIClient()

    async def generate(
        self,
        request: CodeGenerationRequest,
    ) -> CodeGenerationResponse:
        response = await self.client.generate(
            system_prompt=CODE_GENERATION_SYSTEM_PROMPT,
            user_prompt=build_code_generation_prompt(
                request.idea,
                request.architecture,
            ),
            temperature=0.2,
        )

        return parse_model(
            response.content,
            CodeGenerationResponse,
            "AI returned an invalid generated codebase",
        )
