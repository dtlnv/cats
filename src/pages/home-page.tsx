import { useCallback, useState } from "react";
import { ImagesGrid } from "@/components/images-grid";
import { Layout } from "@/components/layout";
import { LimitSelect } from "@/components/limit-select";
import { useSearch } from "@/hooks/useSearch";
import { AVAILABLE_LIMITS, DEFAULT_LIMIT } from "@/lib/consts";

/**
 * Main page of the app. Displays a grid of images and a limit selector.
 * Fetches images from the API based on the selected limit.
 */
export function HomePage() {
	const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
	const { loading, data, error } = useSearch(limit);

	const onUpdateLimit = useCallback((newLimit: number | string) => {
		setLimit(AVAILABLE_LIMITS.includes(+newLimit) ? +newLimit : DEFAULT_LIMIT);
	}, []);

	return (
		<Layout loading={loading}>
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-2xl font-bold">Cats</h1>
				<LimitSelect
					limit={limit}
					onUpdateLimit={onUpdateLimit}
					disabled={loading}
				/>
			</div>
			{!error && <ImagesGrid data={data} loading={loading} />}
			{error ? (
				<div className="flex items-center justify-center h-64">
					<p className="text-muted-foreground">{error.message}</p>
				</div>
			) : null}
		</Layout>
	);
}
