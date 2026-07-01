import { Heart } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";

type ImageCardProps = {
	id: string;
	favouriteId: number | null;
	small?: boolean;
};

export function FavoriteButton({
	id,
	small = false,
	favouriteId,
}: ImageCardProps) {
	const [favorite, setFavorite] = useState<number | null>(favouriteId);
	const [loading, setLoading] = useState<boolean>(false);

	const onToggleFavorite = useCallback(async () => {
		try {
			setLoading(true);
			const method = favorite ? "DELETE" : "POST";
			const ID = favorite ? favorite : id; // Use favouriteId if it exists, otherwise use id
			const response = await fetch(
				`/api/favourites/${encodeURIComponent(ID)}`,
				{
					method,
				},
			);

			if (!response.ok) {
				throw new Error(
					favorite
						? "Failed to remove from favorites"
						: "Failed to add to favorites",
				);
			}

			const result = await response.json();

			toast.success(
				favorite ? (
					"Removed from favorites"
				) : (
					<>
						Added to{" "}
						<Link to="/favs" className="underline">
							favorites
						</Link>
					</>
				),
			);
			setFavorite(favorite ? null : result.id); // Toggle favorite state.
		} catch (error) {
			console.error("Error toggling favorite:", error);
			toast.error(
				favorite
					? "Failed to remove from favorites"
					: "Failed to add to favorites",
			);
		} finally {
			setLoading(false);
		}
	}, [favorite, id]);

	return (
		<Button onClick={onToggleFavorite} variant="outline" disabled={loading}>
			{favorite ? <Heart className="fill-red-500 text-red-500" /> : <Heart />}
			{small ? null : favorite ? "Remove from favorites" : "Add to favorites"}
		</Button>
	);
}
