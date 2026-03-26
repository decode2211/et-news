"use client";

import { useState, useEffect, useCallback } from "react";
import type { FetchState, ApiError } from "@/types";

function useFetch<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<FetchState<T>>({ status: "loading" });

  const execute = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const data = await fetcher();
      if (Array.isArray(data) && data.length === 0) {
        setState({ status: "empty" });
      } else {
        setState({ status: "success", data });
      }
    } catch (err) {
      const apiError = err as ApiError;
      setState({
        status: "error",
        error: {
          status: apiError.status ?? 0,
          message: apiError.message ?? "An unexpected error occurred",
        },
      });
    }
  }, [fetcher]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { state, retry: execute };
}

export default useFetch;
