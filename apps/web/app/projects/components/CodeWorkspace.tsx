"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { downloadProject } from "../lib/downloadProject";
import { fileIcon } from "../lib/fileIcon";
import { CodeGenerationResponse, ProjectResponse } from "../types";
import { ErrorMessage } from "./ErrorMessage";

const COPIED_RESET_MS = 1500;

type Props = {
  project: ProjectResponse | null;
  code: CodeGenerationResponse;
  error: string;
  onGenerateCode: () => void;
  onReset: () => void;
};

export function CodeWorkspace({
  project,
  code,
  error,
  onGenerateCode,
  onReset,
}: Props) {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [selectedPath, setSelectedPath] = useState(
    code.files[0]?.path ?? "",
  );

  const selectedFile = useMemo(
    () =>
      code.files.find(
        (file) => file.path === selectedPath,
      ) ?? code.files[0],
    [code.files, selectedPath],
  );

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  async function copyFile() {
    if (!selectedFile) return;

    try {
      await navigator.clipboard.writeText(selectedFile.content);
    } catch {
      return;
    }

    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(
      () => setCopied(false),
      COPIED_RESET_MS,
    );
  }

  return (
    <section className="mt-2 space-y-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/25">
            Step 03 / Generated Code
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            {code.project_name}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/40">
            {code.summary}
          </p>
        </div>

        <div className="flex gap-2">
          <button type="button"
            onClick={() => downloadProject(code)}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/50 transition hover:bg-white/5"
          >
            Export Project
          </button>

          <button type="button"
            onClick={onReset}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/50 transition hover:bg-white/5"
          >
            Start over
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/25">
              Project files
            </p>

            <p className="mt-2 text-xs text-white/30">
              {code.files.length} generated files
            </p>
          </div>

          <div className="max-h-[650px] overflow-y-auto p-2">
            {code.files.map((file) => {
              const active =
                selectedFile?.path === file.path;

              return (
                <button type="button"
                  key={file.path}
                  onClick={() =>
                    setSelectedPath(file.path)
                  }
                  className={[
                    "w-full rounded-lg px-3 py-2.5 text-left text-xs transition",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:bg-white/5 hover:text-white/70",
                  ].join(" ")}
                >
                  <span className="mr-2 text-white/20">
                    {fileIcon(file.language)}
                  </span>

                  {file.path}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#080808]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-xs text-white/20">
                {selectedFile
                  ? fileIcon(selectedFile.language)
                  : ""}
              </span>

              <span className="truncate text-xs text-white/50">
                {selectedFile?.path}
              </span>
            </div>

            <button type="button"
              onClick={copyFile}
              className="rounded-lg px-3 py-1.5 text-[11px] text-white/50 transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="overflow-auto">
            <pre className="min-h-[650px] p-6 text-xs leading-6 text-white/60">
              <code>
                {selectedFile?.content ??
                  "No file selected."}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/25">
              Generated successfully
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Your architecture is now executable.
            </h2>

            <p className="mt-2 text-sm text-white/35">
              {project?.title ?? "Generated application"}{" "}
              has been converted into a full-stack starter
              codebase.
            </p>
          </div>

          <button type="button"
            onClick={onGenerateCode}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/50 transition hover:bg-white/5"
          >
            Regenerate Code
          </button>
        </div>
      </div>
    </section>
  );
}