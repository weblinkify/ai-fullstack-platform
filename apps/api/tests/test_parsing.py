import pytest

from app.ai.exceptions import AIProviderError
from app.ai.models import AIResponse
from app.ai.parsing import parse_model


def test_parses_plain_json() -> None:
    result = parse_model('{"content": "hi", "model": "m"}', AIResponse, "bad")

    assert result.content == "hi"


def test_parses_fenced_json() -> None:
    content = '```json\n{"content": "hi", "model": "m"}\n```'

    assert parse_model(content, AIResponse, "bad").model == "m"


def test_invalid_json_raises_provider_error() -> None:
    with pytest.raises(AIProviderError, match="bad"):
        parse_model("not json", AIResponse, "bad")
