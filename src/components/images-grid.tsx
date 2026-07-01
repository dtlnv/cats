import { Frown } from "lucide-react";
import type { CatImage } from "@/types/cats.types";
import { GridCard } from "./grid-card";

type Props = {
	data: CatImage[];
	loading: boolean;
};

export function ImagesGrid({ data, loading }: Props) {
	if (!loading && data.length === 0) {
		return (
			<div className="flex justify-center text-muted-foreground gap-4">
				<Frown />
				<p>No cat found</p>
			</div>
		);
	}

	return (
		<div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
			{data.map((img) => (
				<GridCard
					key={img.id}
					id={img.id}
					url={img.url}
					width={img.width}
					height={img.height}
					favouriteId={null}
					loading={loading}
				/>
			))}
		</div>
	);
}
