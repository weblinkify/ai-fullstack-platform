import { ArchitectureCard } from "./ArchitectureCard";
import { ErrorMessage } from "./ErrorMessage";
import { ListCard } from "./ListCard";
import { StatCard } from "./StatCard";
import { ProjectResponse } from "../types";

type Props = {
  project: ProjectResponse;
  error: string;
  onGenerateCode: () => void;
  onReset: () => void;
  onExportArchitecture: () => void;
};

export function ArchitectureResult({
  project,
  error,
  onGenerateCode,
  onReset,
  onExportArchitecture,
}: Props) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/25">
            Step 02 / Architecture
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {project.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/40">
            {project.summary}
          </p>
        </div>

        <div className="flex gap-2">
          <button type="button"
            onClick={onExportArchitecture}
            className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            Export Architecture
          </button>

          <button type="button"
            onClick={onReset}
            className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white/40 transition hover:bg-white/5"
          >
            Start over
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <StatCard
          label="Capabilities"
          value={project.features.length}
        />

        <StatCard
          label="API endpoints"
          value={project.api.length}
        />

        <StatCard
          label="Data entities"
          value={project.database.length}
        />

        <StatCard
          label="Build tasks"
          value={project.implementation_plan.length}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ArchitectureCard
          title="Frontend"
          items={project.architecture.frontend}
        />

        <ArchitectureCard
          title="Backend"
          items={project.architecture.backend}
        />

        <ArchitectureCard
          title="Data Layer"
          items={project.architecture.database}
        />

        <ArchitectureCard
          title="Infrastructure"
          items={project.architecture.infrastructure}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ListCard
          title="Product capabilities"
          description="What the system needs to do."
          items={project.features}
        />

        <ListCard
          title="API surface"
          description="Interfaces connecting the application."
          items={project.api}
        />
      </div>

      <div className="rounded-3xl border border-[#3F3F46] bg-[#2A2A2A] p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/25">
              Implementation
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Engineering Plan
            </h2>
          </div>

          <span className="text-xs text-white/25">
            {project.implementation_plan.length} tasks
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {project.implementation_plan.map(
            (step, index) => (
              <div
                key={`${step}-${index}`}
                className="flex gap-4 rounded-xl border border-white/5 bg-black/20 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm leading-6 text-gray-200">
                  {step}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/25">
              Next layer
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Turn the blueprint into code.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/35">
              Nexora will use this architecture and your original
              product idea to generate a coherent full-stack
              starter application.
            </p>
          </div>

          <button type="button"
            onClick={onGenerateCode}
            className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Generate Full-Stack Code →
          </button>
        </div>
      </div>
    </section>
  );
}