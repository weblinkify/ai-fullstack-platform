"use client";

import { useEffect, useState } from "react";

import { postJson } from "@/lib/api";

import { ArchitectureLoading } from "./components/ArchitectureLoading";
import { ArchitectureResult } from "./components/ArchitectureResult";
import { CodeLoading } from "./components/CodeLoading";
import { CodeWorkspace } from "./components/CodeWorkspace";
import { IdeaComposer } from "./components/IdeaComposer";
import { exportArchitecture } from "./lib/exportArchitecture";
import { CodeGenerationResponse, ProjectResponse } from "./types";

const MIN_IDEA_LENGTH = 10;

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function NewProjectPage() {
  const [idea, setIdea] = useState("");
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [code, setCode] = useState<CodeGenerationResponse | null>(null);
  const [loadingArchitecture, setLoadingArchitecture] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loadingCode) {
      document.getElementById("page-scroll")?.scrollTo(0, 0);
    }
  }, [loadingCode]);

  async function architectIdea() {
    const trimmedIdea = idea.trim();

    if (!trimmedIdea) {
      setError("Describe the application you want to build.");
      return;
    }

    if (trimmedIdea.length < MIN_IDEA_LENGTH) {
      setError(
        `Describe your idea using at least ${MIN_IDEA_LENGTH} characters.`,
      );
      return;
    }

    setLoadingArchitecture(true);
    setError("");
    setProject(null);
    setCode(null);

    try {
      setProject(
        await postJson<ProjectResponse>(
          "/api/projects/generate",
          { idea: trimmedIdea },
          "Unable to architect this idea.",
        ),
      );
    } catch (error) {
      setError(
        errorMessage(error, "Unable to connect to the Nexora AI backend."),
      );
    } finally {
      setLoadingArchitecture(false);
    }
  }

  async function generateCode() {
    if (!project) return;

    setLoadingCode(true);
    setError("");

    try {
      setCode(
        await postJson<CodeGenerationResponse>(
          "/api/projects/code",
          {
            idea: idea.trim(),
            architecture: project.architecture,
          },
          "Unable to generate the application code.",
        ),
      );
    } catch (error) {
      setError(
        errorMessage(error, "Unable to generate the application code."),
      );
    } finally {
      setLoadingCode(false);
    }
  }

  function resetProject() {
    setProject(null);
    setCode(null);
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#212121] text-white">
      <div className="mx-auto max-w-[1180px] py-8 pb-6">
        {!project && !loadingArchitecture && (
          <IdeaComposer
            idea={idea}
            setIdea={setIdea}
            loading={loadingArchitecture}
            error={error}
            onGenerate={architectIdea}
          />
        )}

        {loadingArchitecture && <ArchitectureLoading />}

        {project && !code && !loadingCode && (
          <ArchitectureResult
            project={project}
            error={error}
            onGenerateCode={generateCode}
            onReset={resetProject}
            onExportArchitecture={() => exportArchitecture(project)}
          />
        )}

        {loadingCode && <CodeLoading />}

        {code && !loadingCode && (
          <CodeWorkspace
            project={project}
            code={code}
            error={error}
            onGenerateCode={generateCode}
            onReset={resetProject}
          />
        )}
      </div>
    </main>
  );
}
