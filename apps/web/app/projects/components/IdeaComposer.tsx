"use client";

import { ErrorMessage } from "./ErrorMessage";
import { FeatureHint } from "./FeatureHint";

type Props = {
  idea: string;
  setIdea: (value: string) => void;
  loading: boolean;
  error: string;
  onGenerate: () => void;
};

export function IdeaComposer({
  idea,
  setIdea,
  loading,
  error,
  onGenerate,
}: Props) {
  return (
    <section className="mx-auto mt-5 max-w-4xl">
      <div className="text-center">
        <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
          Turn an idea into
          <span className="block text-white/35">
            an engineering system.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/40">
          Nexora AI transforms a product idea into
          requirements, architecture, APIs, data models,
          infrastructure, implementation tasks, and eventually
          production-ready code.
        </p>
      </div>

      <div className="mt-12 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              What are you building?
            </p>

            <p className="mt-1 text-xs text-white/30">
              Describe the product in plain language.
            </p>
          </div>

          <div className="hidden rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/25 md:block">
            Step 01 / Architecture
          </div>
        </div>

        <textarea
          value={idea}
          onChange={(event) =>
            setIdea(event.target.value)
          }
          placeholder="Example: Build an AI platform that helps small businesses automate customer support..."
          className="mt-6 min-h-48 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-5 text-sm leading-7 outline-none placeholder:text-white/20 focus:border-white/25"
        />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-white/25">
            {idea.length} characters
          </span>

          <button type="button"
            onClick={onGenerate}
            disabled={loading}
            className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading
              ? "Architecting..."
              : "Architect This Idea →"}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <FeatureHint
          number="01"
          title="Understand"
          description="Extract product requirements."
        />

        <FeatureHint
          number="02"
          title="Architect"
          description="Design the complete system."
        />

        <FeatureHint
          number="03"
          title="Build"
          description="Generate the starter codebase."
        />
      </div>
    </section>
  );
}