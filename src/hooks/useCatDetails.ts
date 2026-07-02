import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { rqFetch } from "@/lib/react-query-fetch";
import type { CatImageData } from "@/types/cats.types";

export function useCatDetails() {
	const { id } = useParams<{ id: string }>();

	const { data, isLoading, error } = useQuery({
		queryKey: ["images", id],
		queryFn: ({ signal }) => rqFetch<CatImageData>(`/api/images/${id}`, signal),
		enabled: !!id,
	});

	return {
		loading: isLoading,
		data,
		error: error as Error | null,
	};
}
