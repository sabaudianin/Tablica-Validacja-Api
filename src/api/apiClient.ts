const TOKEN = import.meta.env.GOREST_TOKEN as string;

export function buildHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };
}
