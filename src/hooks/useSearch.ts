import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { CatImage } from "@/types/cats.types";

export function useSearch(limit: number) {
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<CatImage[]>([]);
	const [error, setError] = useState<Error | null>(null);
	const [retryToken, setRetryToken] = useState<number>(0);

	useEffect(() => {
		const controller = new AbortController();
		let active = true;

		const run = async () => {
			setError(null);
			setLoading(true);

			try {
				const res = await fetch(`/api/images/search?limit=${limit}`, {
					signal: controller.signal,
				});

				if (!res.ok) {
					const body = await res.json().catch(() => null);
					throw new Error(body?.error ?? `HTTP ${res.status}`);
				}

				const newData: CatImage[] = await res.json();
				setData(newData);
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
		};
	}, [limit, retryToken]);

	const onRetry = useCallback(() => setRetryToken((t) => t + 1), []);

	return {
		loading,
		data,
		error,
		onRetry,
	};
}
