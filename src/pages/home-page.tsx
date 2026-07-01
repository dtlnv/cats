import { ImagesGrid } from "@/components/images-grid";
import { Layout } from "@/components/layout";
import { LimitSelect } from "@/components/limit-select";
import { useSearch } from "@/hooks/useSearch";
import { useLimitContext } from "@/providers/limit-provider";

/**
 * Main page of the app. Displays a grid of images and a limit selector.
 * Fetches images from the API based on the selected limit.
 */
export function HomePage() {
	const { limit } = useLimitContext();
	const { loading, data, error } = useSearch(limit);

	return (
		<Layout loading={loading}>
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-2xl font-bold">Cats</h1>
				<LimitSelect disabled={loading} />
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
