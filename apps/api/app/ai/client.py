from collections.abc import AsyncIterator

from openai import AsyncOpenAI
from openai.types.chat import ChatCompletionMessageParam

from app.ai.demo import DemoAI
from app.ai.exceptions import AIProviderError
from app.ai.models import AIResponse
from app.config import get_settings


def _messages(
    system_prompt: str,
    user_prompt: str,
) -> list[ChatCompletionMessageParam]:
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]


class AIClient:
    def __init__(self) -> None:
        settings = get_settings()

        self.mock_mode = settings.ai_mock_mode
        self.model = settings.ai_model
        self.demo = DemoAI()
        self.client: AsyncOpenAI | None = None

        if not self.mock_mode:
            self.client = AsyncOpenAI(
                api_key=settings.ai_api_key,
                base_url=settings.ai_base_url or None,
            )

    def _require_client(self) -> AsyncOpenAI:
        if self.client is None:
            raise AIProviderError("AI client is not configured")

        return self.client

    async def generate(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.2,
    ) -> AIResponse:
        if self.mock_mode:
            demo_content, demo_usage = await self.demo.generate(user_prompt)

            return AIResponse(
                content=demo_content,
                model="nexora-demo",
                usage=demo_usage,
            )

        client = self._require_client()

        try:
            response = await client.chat.completions.create(
                model=self.model,
                messages=_messages(system_prompt, user_prompt),
                temperature=temperature,
            )
        except Exception as exc:
            raise AIProviderError("AI provider request failed") from exc

        usage: dict[str, int] | None = None

        if response.usage:
            usage = {
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens,
            }

        return AIResponse(
            content=response.choices[0].message.content or "",
            model=self.model,
            usage=usage,
        )

    async def stream(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.2,
    ) -> AsyncIterator[str]:
        if self.mock_mode:
            async for demo_chunk in self.demo.stream(user_prompt):
                yield demo_chunk

            return

        client = self._require_client()

        try:
            completion_stream = await client.chat.completions.create(
                model=self.model,
                messages=_messages(system_prompt, user_prompt),
                temperature=temperature,
                stream=True,
            )

            async for stream_chunk in completion_stream:
                if not stream_chunk.choices:
                    continue

                chunk_content = stream_chunk.choices[0].delta.content

                if chunk_content:
                    yield chunk_content

        except Exception as exc:
            raise AIProviderError("AI streaming request failed") from exc
