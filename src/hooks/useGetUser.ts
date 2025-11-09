import { useState, useEffect, useCallback } from "react";
import { getUsers } from "../api/users";
import type { User, UserState } from "../types/types";
import { useDebounce } from "./useDebounce";

export const useGetUser = () => {
  const [state, setState] = useState<UserState>({
    loading: true,
    users: [],
    error: null,
    page: 1,
    query: "",
    reload: false,
  });

  const debouncedValue = useDebounce(state.query);

  const refetch = useCallback(
    () => setState((state) => ({ ...state, reload: !state.reload })),
    []
  );

  const changePage = useCallback((step: number) => {
    setState((state) => ({ ...state, page: Math.max(1, state.page + step) }));
  }, []);

  const setQuery = useCallback((query: string) => {
    setState((state) => ({ ...state, query: query }));
  }, []);

  //zmian failtra wraca na strone 1
  useEffect(() => {
    setState((state) => ({ ...state, page: 1 }));
  }, [debouncedValue]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        setState((state) => ({ ...state, loading: true, error: null }));

        const queryString = new URLSearchParams({
          page: String(state.page),
          ...(debouncedValue ? { name: debouncedValue } : {}),
        });
        const data = await getUsers<User[]>(
          `/users?per_page=30&${queryString.toString()}`
        );

        setState((state) => ({ ...state, users: data }));
      } catch (err) {
        setState((state) => ({
          ...state,
          error: err instanceof Error ? err.message : String(err),
        }));
      } finally {
        if (!abortController.signal.aborted)
          setState((state) => ({ ...state, loading: false }));
      }
    })();
    return () => abortController.abort();
  }, [state.page, state.reload, debouncedValue]);

  return {
    loading: state.loading,
    error: state.error,
    users: state.users,
    page: state.page,
    query: state.query,
    setQuery,
    changePage,
    refetch,
  };
};
