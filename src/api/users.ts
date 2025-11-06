import { buildHeaders } from "./apiClient";
import type { User, UpdateUserInput } from "../types/types";

const BASE = import.meta.env.VITE_GOREST_BASE_URL as string;

export async function getUsers<T>(
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

export async function editUser(
  id: number,
  payload: UpdateUserInput
): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: "PATCH",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(
      `PATCH /users/${id} failed: ${res.status} ${res.statusText} `
    );
  }
  return res.json() as Promise<User>;
}
