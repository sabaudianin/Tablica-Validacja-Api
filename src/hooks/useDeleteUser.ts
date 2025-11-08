import { useState, useCallback } from "react";

import { deleteUser } from "../api/users";

export const useDeleteUser = (options?: { onSuccess: () => void }) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const removeUser = useCallback(
    async (id: number) => {
      setDeletingId(id);
      setError(null);
      try {
        await deleteUser(id);
        options?.onSuccess();
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setDeletingId(null);
      }
    },
    [options]
  );
  const isDeleting = useCallback(
    (id: number) => deletingId === id,
    [deletingId]
  );
  return { error, removeUser, deletingId, isDeleting };
};
