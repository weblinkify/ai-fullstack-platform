import { downloadFile, slugify } from "@/lib/download";

import { CodeGenerationResponse } from "../types";

export function downloadProject(code: CodeGenerationResponse) {
  const manifest = {
    project_name: code.project_name,
    summary: code.summary,
    files: code.files,
  };

  downloadFile(
    JSON.stringify(manifest, null, 2),
    `${slugify(code.project_name, "nexora-project")}.json`,
    "application/json",
  );
}
