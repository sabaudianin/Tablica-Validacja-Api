const BASE = import.meta.env.VITE_GOREST_BASE_URL as string;
const TOKEN = import.meta.env.VITE_GOREST_TOKEN as string;

function buildHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };
}

export async function apiGetUsers<T>(
  path: string,
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: buildHeaders(),
    signal,
  });
  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
