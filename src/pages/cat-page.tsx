import { ImageDetails } from "@/components/image-details";
import { Layout } from "@/components/layout";
import { useCatDetails } from "@/hooks/useCatDetails";

/**
 * /cat/:id page of the app. Displays details of a specific cat image.
 * Fetches cat image details from the API based on the id in the URL.
 */
export function CatPage() {
	const { data, loading, error } = useCatDetails();

	return (
		<Layout loading={loading}>
			<div className="p-2 mt-4 flex flex-col gap-4">
				{!loading && error && (
					<div className="flex flex-col items-center justify-center gap-4">
						<p className="text-muted-foreground">{error.message}</p>
					</div>
				)}
				{loading && (
					<div className="flex items-center justify-center h-64">
						<p className="text-muted-foreground">Loading...</p>
					</div>
				)}
				{!loading && !error && !data && (
					<div className="flex items-center justify-center h-64">
						<p className="text-muted-foreground">No cat found</p>
					</div>
				)}
				{data && <ImageDetails data={data} />}
			</div>
		</Layout>
	);
}
