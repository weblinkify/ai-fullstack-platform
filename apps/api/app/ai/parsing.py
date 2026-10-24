import json
import re

from pydantic import BaseModel, ValidationError

from app.ai.exceptions import AIProviderError

_CODE_FENCE = re.compile(r"^```[a-zA-Z]*\s*\n(.*?)\n?```$", re.DOTALL)


def parse_model[ModelT: BaseModel](
    content: str,
    model: type[ModelT],
    error_message: str,
) -> ModelT:
    """Parse an LLM JSON reply, tolerating a surrounding markdown fence."""
    text = content.strip()

    if match := _CODE_FENCE.match(text):
        text = match.group(1)

    try:
        return model.model_validate(json.loads(text))
    except (json.JSONDecodeError, ValidationError) as exc:
        raise AIProviderError(error_message) from exc
