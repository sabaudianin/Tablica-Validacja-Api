import type { User, UpdateUserInput, CreateUserInput } from "../types/types";
import { api } from "./apiClient";

export async function getUsers<T>(
  path: string,
  signal?: AbortSignal
): Promise<T> {
  return api<T>(path, { signal });
}

export async function editUser(
  id: number,
  payload: UpdateUserInput
): Promise<User> {
  return api<User>(`/users/${id}`, { method: "PATCH", body: payload });
}

export async function deleteUser(id: number): Promise<void> {
  // GoREST zwraca zwykle 204 No Content – api() poradzi sobie z pustą odpowiedzią
  await api<unknown>(`/users/${id}`, { method: "DELETE" });
}

export async function createUser(payload: CreateUserInput): Promise<User> {
  return api<User>("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
}
