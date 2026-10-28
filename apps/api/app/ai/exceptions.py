class AIServiceError(Exception):
    """Base exception for AI-related errors."""


class AIConfigurationError(AIServiceError):
    """Raised when AI configuration is invalid."""


class AIProviderError(AIServiceError):
    """Raised when the upstream AI provider fails."""
