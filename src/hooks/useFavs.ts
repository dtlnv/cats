import { useQuery } from "@tanstack/react-query";
import { rqFetch } from "@/lib/react-query-fetch";
import type { Favorite } from "@/types/favs.types";

export function useFavs() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["favourites"],
		queryFn: ({ signal }) => rqFetch<Favorite[]>(`/api/favourites`, signal),
	});

	return {
		loading: isLoading,
		data: data ?? [],
		error: error as Error | null,
	};
}
