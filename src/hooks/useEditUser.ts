import React, { useState, useCallback } from "react";
import { editUser } from "../api/users";
import type { UpdateUserInput } from "../types/types";

export const useEditUser = (options?: { onSuccess: () => void }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateUser = useCallback(
    async (id: number, data: UpdateUserInput) => {
      setIsPending(true);
      setPendingId(id);
      setError(null);
      try {
        await editUser(id, data);
        options?.onSuccess?.();
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsPending(false);
        setPendingId(null);
      }
    },
    [options]
  );

  const isEditing = useCallback((id: number) => pendingId === id, [pendingId]);

  return { updateUser, isPending, pendingId, error, isEditing };
};
