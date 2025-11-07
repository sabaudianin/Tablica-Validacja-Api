import { buildHeaders } from "./apiClient";
import type { User, UpdateUserInput, CreateUserInput } from "../types/types";

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

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: "DELETE",
    headers: buildHeaders(),
  });
  if (!res.ok) {
    throw new Error(
      `DELETE /users/${id} failed: ${res.status} ${res.statusText}`
    );
  }
}

export async function createUser(payload: CreateUserInput): Promise<User> {
  const res = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`POST users failed ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<User>;
}
