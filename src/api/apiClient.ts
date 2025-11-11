export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

//  opcjonalnie VITE_API_BASE do ewentualnych override'ów; domyślnie /api
const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

export type Query = Record<
  string,
  string | number | boolean | null | undefined
>;

export async function api<T>(
  path: string,
  opts?: {
    method?: Method;
    body?: unknown;
    signal?: AbortSignal;
    query?: Query;
  }
): Promise<T> {
  const { method = "GET", body, signal, query } = opts ?? {};

  //wysyłamy path jakp query param do funkcji netlify
  const params = new URLSearchParams({ path });
  if (query) {
    for (const [j, k] of Object.entries(query)) {
      if (k !== undefined && k !== null) params.set(j, String(k));
    }
  }

  const res = await fetch(`${API_BASE}?${params.toString()}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const contentType = res.headers.get("content-type") ?? "";
  const bodyText = await res.text();

  if (!res.ok) {
    throw new Error(
      `${method} ${path} failed: ${res.status} - ${res.statusText}- ${bodyText}`
    );
  }
  // safe way return JSON (albo undefined dla 204/braku body)
  return contentType.includes("application/json") && bodyText
    ? (JSON.parse(bodyText) as T)
    : (undefined as unknown as T);
}
