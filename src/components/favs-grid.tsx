import type { Favorite } from "@/types/favorites.types";
import { GridCard } from "./grid-card";

type Props = {
	data: Favorite[];
};

export function FavsGrid({ data }: Props) {
	return (
		<div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
			{data.map((fav) => (
				<GridCard
					key={fav.id}
					id={fav.image.id}
					url={fav.image.url}
					favouriteId={fav.id}
				/>
			))}
		</div>
	);
}
