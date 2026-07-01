import { Header } from "@/components/header";
import { ImageCard } from "@/components/image-card";
import { Button } from "@/components/ui/button";
import { useCatDetails } from "@/hooks/useCatDetails";

export function CatPage() {
	const { data, loading, error, onRetry } = useCatDetails();

	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="mx-auto w-full max-w-[76rem] px-4 py-8 sm:px-6 sm:py-12 md:px-6 md:py-16">
				<Header loading={loading} showLimitSelect={false} />
				<div className="p-2 mt-4 flex flex-col gap-4">
					{!loading && error && (
						<div className="flex flex-col items-center justify-center gap-4">
							<p className="text-muted-foreground">{error.message}</p>
							<Button onClick={onRetry}>Retry</Button>
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
					{data && <ImageCard data={data} />}
				</div>
			</div>
		</div>
	);
}
