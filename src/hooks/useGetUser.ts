import { useState, useEffect, useCallback } from "react";
import { getUsers } from "../api/users";
import type { User } from "../types/types";
import { useDebounce } from "./useDebounce";

export const useGetUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [reload, setReload] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const debouncedValue = useDebounce(query);

  const refetch = useCallback(() => setReload((prev) => !prev), []);

  //zmian failtra wraca na strone 1
  useEffect(() => {
    setPage(1);
  }, [debouncedValue]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const queryString = new URLSearchParams({
          page: String(page),
          ...(debouncedValue ? { name: debouncedValue } : {}),
        });
        const data = await getUsers<User[]>(
          `/users?per_page=30&${queryString.toString()}`
        );
        setUsers(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        if (!abortController.signal.aborted) setLoading(false);
      }
    })();
    return () => abortController.abort();
  }, [page, reload, debouncedValue]);

  const nextPage = useCallback(() => {
    setPage((page) => page + 1);
  }, []);
  const prevPage = useCallback(() => {
    setPage((page) => Math.max(1, page - 1));
  }, []);

  return {
    loading,
    error,
    users,
    nextPage,
    prevPage,
    page,
    refetch,
    setQuery,
    query,
  };
};
