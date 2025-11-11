import type { Handler } from "@netlify/functions";

const BASE = process.env.GOREST_BASE_URL ?? "https://gorest.co.in/public/v2";
const TOKEN = process.env.GOREST_TOKEN;

// dozwolone metody i ścieżki (żeby nie zrobić otwartego proxy)
const ALLOWED_METHODS = new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
]);
const ALLOWED_PREFIXES = ["/users", "/posts", "/comments", "/todos"] as const;

// pomocnicze: wspólne nagłówki CORS
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
} as const;

//uzywamy unknow potem zawezamy typ, Użyj unknown, sprawdź instanceof Error, a dla timeoutu rozpoznaj AbortError.
function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

function isAbortError(e: unknown): boolean {
  return e instanceof Error && e.name === "AbortError";
}

export const handler: Handler = async (event) => {
  try {
    if (!TOKEN) {
      return {
        statusCode: 500,
        headers: cors,
        body: "Server misconfigured: missing token",
      };
    }

    const method = event.httpMethod.toUpperCase();
    if (!ALLOWED_METHODS.has(method)) {
      return {
        statusCode: 405,
        headers: cors,
        body: `Method ${method} not allowed`,
      };
    }

    // Preflight dla CORS
    if (method === "OPTIONS") {
      return { statusCode: 204, headers: cors, body: "" };
    }

    const path = event.queryStringParameters?.path || "/users";
    if (!ALLOWED_PREFIXES.some((p) => path.startsWith(p))) {
      return { statusCode: 400, headers: cors, body: "Path not allowed" };
    }

    const url = new URL(BASE + path);
    for (const [k, v] of Object.entries(event.queryStringParameters ?? {})) {
      if (k !== "path" && typeof v === "string") url.searchParams.set(k, v);
    }

    // timeout (żeby nie wisieć wiecznie)
    const ac = new AbortController();
    const timeout = setTimeout(() => ac.abort(), 15_000);

    const upstream = await fetch(url.toString(), {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: ["POST", "PUT", "PATCH", "DELETE"].includes(method)
        ? event.body
        : undefined,
      signal: ac.signal,
    }).finally(() => clearTimeout(timeout));

    const contentType =
      upstream.headers.get("content-type") ?? "application/json";
    const body = await upstream.text();

    return {
      statusCode: upstream.status,
      headers: { "Content-Type": contentType, ...cors },
      body,
    };
  } catch (e: unknown) {
    const status = isAbortError(e) ? 502 : 500;
    const msg = isAbortError(e) ? "Upstream timeout" : errorMessage(e);
    return {
      statusCode: status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain; charset=utf-8",
      },
      body: msg,
    };
  }
};
