import type { Handler, HandlerResponse } from "@netlify/functions";

const BASE = process.env.GOREST_BASE_URL ?? "https://gorest.co.in/public/v2";
const TOKEN = process.env.GOREST_TOKEN!;

function buildHeaders(hasBody = false): Record<string, string> {
  // (opcjonalnie) Content-Type tylko gdy wysyłamy body
  const has: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };
  if (hasBody) has["Content-Type"] = "application/json";
  return has;
}

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
};

export const handler: Handler = async (event): Promise<HandlerResponse> => {
  //prosty CORS
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...corsHeaders }, body: "" };
  }

  if (!TOKEN) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders },
      body: "Server misconfigured: missing token",
    };
  }

  const path = event.queryStringParameters?.path || "/users";
  const allowed = ["/users", "/posts", "/comments", "/todos"];
  if (!allowed.some((ap) => path.startsWith(ap))) {
    return { statusCode: 400, body: "Path not allowed" };
  }

  const url = new URL(BASE + path);

  // Przekaz query paramy (np. ?page=2,itd)
  for (const [j, k] of Object.entries(event.queryStringParameters ?? {})) {
    if (j !== "path" && typeof k === "string") url.searchParams.set(j, k);
  }

  const init: RequestInit = {
    method: event.httpMethod,
    headers: buildHeaders(),
    body: ["POST", "PUT", "PATCH", "DELETE"].includes(event.httpMethod)
      ? event.body
      : undefined,
  };

  const resp = await fetch(url.toString(), init);
  const body = await resp.text();
  const contentType = resp.headers.get("content-type") || "application/json";

  return {
    statusCode: resp.status,
    headers: {
      ...corsHeaders,
      "Content-Type": contentType,
    },
    body,
  };
};
