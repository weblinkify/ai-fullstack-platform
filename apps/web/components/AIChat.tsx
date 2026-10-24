"use client";

import { FormEvent, useState } from "react";

import { API_URL } from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Explain async Python",
  "Design a REST API",
  "Review my architecture",
];

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || loading) {
      return;
    }

    setError(null);
    setLoading(true);

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: trimmedPrompt,
      },
      {
        role: "assistant",
        content: "",
      },
    ]);

    setPrompt("");

    try {
      const response = await fetch(`${API_URL}/api/ai/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: trimmedPrompt,
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI request failed (${response.status})`);
      }

      if (!response.body) {
        throw new Error("The AI response stream is unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, {
          stream: true,
        });

        assistantContent += chunk;

        setMessages((current) => {
          const updated = [...current];

          const lastMessage = updated[updated.length - 1];

          if (lastMessage?.role === "assistant") {
            updated[updated.length - 1] = {
              ...lastMessage,
              content: assistantContent,
            };
          }

          return updated;
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
      );

      setMessages((current) => {
        const updated = [...current];

        if (
          updated.length > 0 &&
          updated[updated.length - 1]?.role === "assistant"
        ) {
          updated.pop();
        }

        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    if (loading) {
      return;
    }

    setMessages([]);
    setError(null);
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-400">
          Powered by your AI backend
        </div>

        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What can I help you build?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-zinc-500">
          Ask Nexora AI a question and watch the response stream in
          real time.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <span className="text-sm font-medium text-zinc-300">
              Nexora AI
            </span>
          </div>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              disabled={loading}
              className="text-xs text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
          )}
        </div>

        <div className="min-h-[360px] space-y-6 p-5">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((message, index) => (
              <MessageBubble
                key={`${message.role}-${index}`}
                message={message}
                loading={
                  loading &&
                  index === messages.length - 1 &&
                  message.role === "assistant"
                }
              />
            ))
          )}

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </div>
          )}
        </div>

        <form
          onSubmit={submit}
          className="border-t border-zinc-800 p-4"
        >
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition focus-within:border-zinc-600">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();

                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Ask Nexora AI anything..."
              rows={4}
              disabled={loading}
              className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-zinc-600 disabled:cursor-not-allowed"
            />

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-zinc-600">
                Enter to send · Shift + Enter for new line
              </span>

              <button
                type="submit"
                disabled={!prompt.trim() || loading}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {SUGGESTIONS.map((suggestion) => (
          <Suggestion
            key={suggestion}
            text={suggestion}
            onClick={() => setPrompt(suggestion)}
          />
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-lg">
        ✦
      </div>

      <h3 className="text-sm font-medium text-zinc-300">
        Start a conversation
      </h3>

      <p className="mt-2 max-w-sm text-sm text-zinc-600">
        Your prompts are sent to the Nexora AI backend and
        streamed back in real time.
      </p>
    </div>
  );
}

function MessageBubble({
  message,
  loading,
}: {
  message: Message;
  loading: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-white text-black"
            : "border border-zinc-800 bg-zinc-900 text-zinc-300"
        }`}
      >
        <div className="mb-1 text-xs font-medium opacity-50">
          {isUser ? "You" : "Nexora AI"}
        </div>

        <div className="whitespace-pre-wrap text-sm leading-6">
          {message.content}

          {loading && (
            <span className="ml-1 inline-block animate-pulse">
              ▌
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Suggestion({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-left text-xs text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
    >
      {text}
    </button>
  );
}