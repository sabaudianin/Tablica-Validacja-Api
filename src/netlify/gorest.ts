import type { Handler } from "@netlify/functions";

const BASE = process.env.GOREST_BASE_URL;
const TOKEN = process.env.GOREST_TOKEN!;

function buildHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };
}

export const handler: Handler = async (event) => {
  const path = event.queryStringParameters?.path || "/users";
  const url = new URL(BASE + path);
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
  return {
    statusCode: resp.status,
    headers: {
      "Content-Type": resp.headers.get("content-type") ?? "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body,
  };
};
