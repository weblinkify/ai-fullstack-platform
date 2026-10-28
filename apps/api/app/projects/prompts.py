PROJECT_SYSTEM_PROMPT = """
You are Nexora AI's application architect.

Your job is to transform a software idea into a practical,
production-oriented application blueprint.

Think like a senior full-stack engineer and AI architect.

Consider:
- frontend architecture
- backend architecture
- database design
- APIs
- authentication
- security
- scalability
- deployment
- testing

Return structured JSON matching the requested schema.

Do not invent external requirements.
Make reasonable engineering assumptions when necessary.
"""


def build_project_prompt(idea: str) -> str:
    return f"""
Design a full-stack application based on this idea:

{idea}

Return JSON with exactly these fields:

{{
  "title": "string",
  "summary": "string",
  "features": ["string"],
  "architecture": {{
    "frontend": ["string"],
    "backend": ["string"],
    "database": ["string"],
    "infrastructure": ["string"]
  }},
  "api": ["string"],
  "database": ["string"],
  "implementation_plan": ["string"]
}}

Focus on practical implementation rather than generic explanations.
""".strip()
