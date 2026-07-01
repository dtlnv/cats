import { FavsGrid } from "@/components/favs-grid";
import { Layout } from "@/components/layout";
import { useFavs } from "@/hooks/useFavs";

/**
 * /favs page of the app. Displays a grid of favorite images.
 * Fetches favorite images from the API.
 */
export function FavsPage() {
	const { loading, data, error } = useFavs();

	return (
		<Layout loading={loading}>
			<h1 className="text-2xl font-bold mb-4">Favourites</h1>
			{!error && <FavsGrid data={data} />}
			{error ? (
				<div className="flex items-center justify-center h-64">
					<p className="text-muted-foreground">{error.message}</p>
				</div>
			) : null}
		</Layout>
	);
}
