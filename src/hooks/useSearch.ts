import { useQuery } from "@tanstack/react-query";
import { rqFetch } from "@/lib/react-query-fetch";
import type { CatImage } from "@/types/cats.types";

export function useSearch(limit: number) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["search", limit],
		queryFn: ({ signal }) =>
			rqFetch<CatImage[]>(`/api/images/search?limit=${limit}`, signal),
		gcTime: 0,
	});

	return {
		loading: isLoading,
		data: data ?? [],
		error: error as Error | null,
	};
}
