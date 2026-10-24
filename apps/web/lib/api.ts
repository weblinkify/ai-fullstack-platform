export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type ErrorBody = {
  detail?: string | { msg?: string }[];
};

function extractError(data: unknown): string {
  if (!data || typeof data !== "object") return "";

  const { detail } = data as ErrorBody;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => item?.msg)
      .filter(Boolean)
      .join(", ");
  }

  return "";
}

export async function postJson<T>(
  path: string,
  body: unknown,
  fallbackError: string,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(extractError(data) || fallbackError);
  }

  return data as T;
}
