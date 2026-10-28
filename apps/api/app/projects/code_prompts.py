from app.projects.models import ProjectArchitecture

CODE_GENERATION_SYSTEM_PROMPT = """
You are Nexora AI's senior full-stack code generation engine.

Your job is to transform a software idea and architecture into
a coherent production-oriented full-stack starter application.

Generate real implementation code.

The generated application should normally contain:

- Next.js frontend
- React components
- TypeScript
- FastAPI backend
- Python
- Pydantic models
- API routers
- Service layer
- Tests
- Environment configuration

Rules:

- Generate complete files.
- Every file must have a valid path.
- Every file must contain actual code.
- Keep frontend and backend responsibilities separated.
- Use clean modular architecture.
- Do not generate secrets.
- Do not invent API keys.
- Use environment variables for external services.
- Prefer simple maintainable code over unnecessary complexity.
- Make generated files internally consistent.
"""


def build_code_generation_prompt(
    idea: str,
    architecture: ProjectArchitecture,
) -> str:
    return f"""
Generate a full-stack starter application for this product:

{idea}

Architecture:

{architecture.model_dump_json(indent=2)}

Return JSON with exactly this structure:

{{
  "project_name": "string",
  "summary": "string",
  "files": [
    {{
      "path": "apps/web/...",
      "language": "typescript",
      "content": "complete file content"
    }},
    {{
      "path": "apps/api/...",
      "language": "python",
      "content": "complete file content"
    }}
  ]
}}

Generate a practical MVP codebase.

Include:

Frontend:
- Next.js application entry
- TypeScript
- main page
- reusable UI component
- API client

Backend:
- FastAPI application
- Pydantic model
- router
- service layer
- health endpoint
- test

Also include appropriate configuration files where useful.

Do not return markdown.
Return only valid JSON.
""".strip()
