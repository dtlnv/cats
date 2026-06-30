import type { CatImage } from "@/types/cats.types";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function useCatDetails() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CatImage>();
  const [error, setError] = useState<Error | null>(null);
  const [retryToken, setRetryToken] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const run = async () => {
      setError(null);
      setLoading(true);

      try {
        const res = await fetch(
          `/api/images/${id}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? `HTTP ${res.status}`);
        }

        const details: any = await res.json();
        setData(details);
      } catch (e) {
        if ((e instanceof Error && e.name === "AbortError") || !active) {
          return;
        }

        const err = e instanceof Error ? e : new Error(String(e));
        setError(err);
        toast.error(err.message);
      } finally {
        active && setLoading(false);
      }
    };

    run();
    return () => {
      active = false;
      controller.abort();
    }
  }, [id, retryToken]);

  const onRetry = useCallback(() => setRetryToken(t => t + 1), []);

  return {
    loading,
    data,
    error,
    onRetry,
  };
}
