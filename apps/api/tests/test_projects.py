from fastapi.testclient import TestClient

IDEA = "An AI platform that automates customer support"


def test_generate_project(client: TestClient) -> None:
    response = client.post("/api/projects/generate", json={"idea": IDEA})

    assert response.status_code == 200
    assert response.json()["architecture"]["frontend"]


def test_generate_project_rejects_short_idea(client: TestClient) -> None:
    response = client.post("/api/projects/generate", json={"idea": "short"})

    assert response.status_code == 422


def test_generate_code(client: TestClient) -> None:
    project = client.post("/api/projects/generate", json={"idea": IDEA}).json()

    response = client.post(
        "/api/projects/code",
        json={"idea": IDEA, "architecture": project["architecture"]},
    )

    assert response.status_code == 200
    assert response.json()["files"]


def test_export_architecture(client: TestClient) -> None:
    project = client.post("/api/projects/generate", json={"idea": IDEA}).json()

    response = client.post("/api/projects/architecture/export", json=project)

    assert response.status_code == 200
    assert response.text.startswith(f"# {project['title']}")
    assert response.headers["content-disposition"] == (
        'attachment; filename="ai-customer-support-platform-architecture.md"'
    )
