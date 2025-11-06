import React, { useState, useEffect, useCallback } from "react";
import { getUsers } from "../api/users";
import type { User } from "../types/types";

export const useGetUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [reload, setReload] = useState<boolean>(false);

  const refetch = useCallback(() => setReload((prev) => !prev), []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsers<User[]>(`/users?page=${page}`);
        setUsers(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    })();
  }, [page, reload]);

  const nextPage = useCallback(() => {
    setPage((page) => page + 1);
  }, []);
  const prevPage = useCallback(() => {
    setPage((page) => Math.max(1, page - 1));
  }, []);

  return { loading, error, users, nextPage, prevPage, page, refetch };
};
