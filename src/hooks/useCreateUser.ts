import { useCallback, useState } from "react";
import type { User, CreateUserInput } from "../types/types";
import { createUser } from "../api/users";

export const useCreateUser = ({
  onSuccess,
}: {
  onSuccess?: (u: User) => void;
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (payload: CreateUserInput) => {
      setIsPending(true);
      setError(null);
      try {
        const user = await createUser(payload);
        onSuccess?.(user);
        return user;
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [onSuccess]
  );
  return { create, isPending, error };
};
