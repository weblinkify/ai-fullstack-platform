# 🚀 Nexora AI

> **Build intelligent applications. Ship them like software.**

Nexora AI is an **AI-native full-stack application platform** designed to bring modern AI capabilities into a production-ready web architecture.

Nexora AI is an app where you can **ask an AI questions and get smart answers**. It uses a **website + backend server** to send your questions to the AI. We’re making it **fast, safe, tested, and ready to run in the real world**.

It combines a **FastAPI backend, AI services, GraphQL, Next.js frontend, Docker, automated testing, and cloud-ready infrastructure** into one scalable application.

🔗 **Live Demo:** https://nexora-ai-native.netlify.app/

![Nexora AI](apps/web/public/images/general.png)

---

NEXORA AI VS CHATGPT
--------------------

ChatGPT
- A complete AI product for everyday users.
- Ready to use without building the underlying system.
- Provides a polished AI experience out of the box.
- AI models and infrastructure are managed by OpenAI.

Nexora AI
- Our own AI-powered application.
- Built from scratch using FastAPI, Next.js, GraphQL, and TypeScript.
- Gives us control over the frontend, backend, APIs, and architecture.
- Designed to learn how real AI products are built, tested, and deployed.

THE MAIN DIFFERENCE
-------------------

ChatGPT = Use AI.

Nexora AI = Build AI-powered software.

Nexora AI is not trying to replace ChatGPT.
It is a project for learning how to build an AI product from
the frontend all the way to the backend and cloud infrastructure.

---

## ✨ Features

* 🤖 **AI-powered generation** — Generate intelligent responses through an integrated AI service.
* ⚡ **FastAPI backend** — High-performance asynchronous Python API.
* 🧠 **Dedicated AI service layer** — Separates AI provider communication from application logic.
* 🔌 **GraphQL support** — Query AI functionality through Strawberry GraphQL.
* 🌐 **Next.js frontend** — Modern React-based interface for interacting with the platform.
* 🛡️ **Typed request validation** — Pydantic models for structured and validated API input.
* 🧪 **Automated testing** — Pytest-based backend testing.
* 🔍 **Static analysis** — Ruff and mypy for code quality and type safety.
* 🐳 **Docker-ready** — Containerized backend deployment.
* ☁️ **Cloud-ready architecture** — Designed for deployment using modern cloud infrastructure.
* 🔄 **CI/CD** — GitHub Actions for automated linting, type checking, and testing.

---

## 🏗️ Architecture

```text
┌─────────────────────────────┐
│        Next.js Web          │
│        React / TypeScript   │
└──────────────┬──────────────┘
               │
               │ HTTP / REST
               ▼
┌─────────────────────────────┐
│        FastAPI API          │
│                             │
│  /health                    │
│  /api/ai/generate           │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        AI Service           │
│                             │
│  Prompt Construction        │
│  Request Validation         │
│  Provider Integration       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       AI Provider           │
└─────────────────────────────┘


          GraphQL Layer
               │
               ▼
        Strawberry GraphQL
```

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript

### Backend

* Python
* FastAPI
* Pydantic
* Pydantic Settings
* Async/Await

### AI

* AI provider API
* OpenAI Python SDK
* Structured prompt architecture
* Configurable model selection
* Configurable temperature

### API

* REST
* GraphQL
* Strawberry GraphQL
* OpenAPI

### Engineering

* Pytest
* Ruff
* mypy
* Docker
* GitHub Actions

### Cloud

* Azure-ready architecture
* Container deployment
* Cloud storage integration
* Production-oriented configuration

---

## 📁 Project Structure

```text
Nexora-AI/
│
├── apps/
│   │
│   ├── api/
│   │   ├── app/
│   │   │   │
│   │   │   ├── ai/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── client.py
│   │   │   │   ├── exceptions.py
│   │   │   │   ├── models.py
│   │   │   │   ├── prompts.py
│   │   │   │   └── service.py
│   │   │   │
│   │   │   ├── graphql/
│   │   │   │   ├── __init__.py
│   │   │   │   └── ai.py
│   │   │   │
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   └── main.py
│   │   │
│   │   ├── .env
│   │   ├── Dockerfile
│   │   ├── pyproject.toml
│   │   └── requirements.txt
│   │
│   └── web/
│       └── Next.js application
│
├── .github/
│   └── workflows/
│       └── backend-ci.yml
│
└── README.md
```

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Nexora-AI
```

---

## 2. Backend Setup

Navigate to the API:

```bash
cd apps/api
```

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
python3 -m pip install -r requirements-dev.txt
```

---

## 3. Environment Variables

Copy `apps/api/.env.example` to `apps/api/.env` and fill in:

```env
ENVIRONMENT=development

AI_API_KEY=your_api_key
AI_MODEL=your_model_name
AI_BASE_URL=
AI_MOCK_MODE=false
CORS_ORIGINS=["http://localhost:3000"]
```

Set `AI_MOCK_MODE=true` to run with the built-in demo responses and no API key.

> Never commit your `.env` file or API keys to GitHub.

---

# ▶️ Run the Backend

From:

```text
apps/api
```

run:

```bash
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

The API will be available at:

```text
http://localhost:8000
```

---

# ❤️ Health Check

Check the API:

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

# 🤖 AI API

Nexora AI exposes an AI generation endpoint:

```text
POST /api/ai/generate
```

Example request:

```json
{
  "prompt": "Explain what an API is",
  "temperature": 0.2
}
```

Example response:

```json
{
  "content": "An API is an interface that allows...",
  "model": "your_model_name",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 30,
    "total_tokens": 40
  }
}
```

---

# 🧠 AI Architecture

The AI layer is intentionally separated into multiple components:

```text
Request
   │
   ▼
AIRequest
   │
   ▼
AIService
   │
   ├── Prompt Builder
   │
   └── AIClient
          │
          ▼
     AI Provider
          │
          ▼
      AIResponse
```

### `AIService`

Responsible for application-level AI orchestration.

### `AIClient`

Responsible for communicating with the external AI provider.

### `prompts.py`

Contains reusable system prompts and prompt construction.

### `models.py`

Contains strongly typed AI request and response models.

### `exceptions.py`

Provides dedicated AI-related exception types.

This separation keeps the AI integration modular and easier to test, replace, and extend.

---

# 🔌 GraphQL

Nexora AI also provides a GraphQL layer using Strawberry.

The GraphQL layer exposes AI functionality without coupling the GraphQL schema directly to the underlying AI provider.

Example concept:

```graphql
query {
  generate(
    input: {
      prompt: "Explain machine learning"
      temperature: 0.2
    }
  ) {
    content
    model
  }
}
```

---

# 🌐 Frontend

The frontend is built with:

* Next.js
* React
* TypeScript

The AI interface communicates with the FastAPI backend through:

```text
NEXT_PUBLIC_API_URL
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Production frontend:

```text
https://nexora-ai-native.netlify.app/
```

---

# 🧪 Testing

Run the test suite:

```bash
source .venv/bin/activate
python3 -m pytest
```

---

# 🔍 Code Quality

### Ruff

```bash
source .venv/bin/activate
ruff check .
```

### mypy

```bash
source .venv/bin/activate
python3 -m mypy app
```

These checks help maintain consistent formatting, linting, and static type safety.

---

# 🐳 Docker

Build the backend image:

```bash
docker build -t nexora-ai-api .
```

Run it:

```bash
docker run --env-file .env -p 8000:8000 nexora-ai-api
```

The container exposes:

```text
8000
```

---

# 🔄 CI/CD

Nexora AI uses GitHub Actions to automate backend quality checks.

The CI pipeline runs:

```text
Push / Pull Request
        │
        ▼
Install Dependencies
        │
        ▼
Ruff
        │
        ▼
mypy
        │
        ▼
Pytest
        │
        ▼
Build / Deploy
```

This ensures changes are checked automatically before they move toward production.

---

# ☁️ Deployment

The architecture is designed for cloud deployment using containerized services.

Potential deployment architecture:

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │    Next.js      │
              │    Frontend     │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Azure Container│
              │      Apps       │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   Nexora AI     │
              │    FastAPI      │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   AI Provider   │
              └─────────────────┘
```

---

# 🔐 Security

Nexora AI follows several security-oriented practices:

* API keys stored in environment variables
* `.env` excluded from version control
* Input validation through Pydantic
* Maximum prompt length limits
* Controlled temperature range
* Dedicated provider error handling
* No secrets hardcoded in source code
* Separation between application logic and external AI providers

---

# 🧩 Design Principles

### Modular

AI functionality is separated from the API layer.

### Typed

Requests and responses are validated using Pydantic.

### Async

The backend uses asynchronous request handling.

### Testable

Business logic is separated into services that can be tested independently.

### Production-oriented

The project includes linting, type checking, testing, Docker support, and CI/CD.

### Provider-independent

The AI provider integration is isolated inside the AI client layer, making future provider changes easier.

---

# 🚧 Roadmap

* [x] FastAPI backend
* [x] AI service layer
* [x] AI provider integration
* [x] Request/response validation
* [x] REST AI endpoint
* [x] GraphQL integration
* [x] Next.js frontend
* [x] Docker support
* [x] Ruff linting
* [x] mypy type checking
* [x] Pytest setup
* [x] GitHub Actions CI
* [ ] Authentication
* [ ] Persistent conversation history
* [ ] Streaming AI responses
* [ ] User workspaces
* [ ] Usage analytics
* [ ] AI model management
* [ ] Production observability
* [ ] Expanded cloud infrastructure

---

# 📊 Engineering Focus

Nexora AI is built around a simple idea:

> **AI features should be engineered like software, not bolted onto software.**

The project focuses on:

```text
AI
+
APIs
+
Type Safety
+
Testing
+
Cloud Infrastructure
+
Developer Experience
```

---

# 👨‍💻 Author

**Daniyal Tariq**

AI-Native Full-Stack Engineer building production-oriented applications with AI, Python, TypeScript, and modern cloud infrastructure.

---

# ⭐ Support

If you find Nexora AI useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is available under the MIT License.
