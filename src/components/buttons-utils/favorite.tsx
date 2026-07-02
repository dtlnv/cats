import { Heart } from "lucide-react";
import { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ImageCardProps = {
	id: string;
	favouriteId: number | null;
	setActive?: (_: boolean) => void;
	small?: boolean;
};

export function FavoriteButton({
	id,
	small = false,
	setActive,
	favouriteId,
}: ImageCardProps) {
	const [favorite, setFavorite] = useState<number | null>(favouriteId);
	const [isPending, startTransition] = useTransition();

	const onToggleFavorite = () => {
		startTransition(async () => {
			try {
				const method = favorite ? "DELETE" : "POST"; // POST (adding) - Image ID. DELETE - favourite ID.
				const ID = favorite ? favorite : id; // Use favouriteId if it exists, otherwise use image id.
				const response = await fetch(
					`/api/favourites/${encodeURIComponent(ID)}`,
					{
						method,
					},
				);

				if (!response.ok) {
					throw new Error(
						favorite
							? "Failed to remove from favourites"
							: "Failed to add to favourites",
					);
				}

				const result = await response.json();

				toast.success(
					favorite ? (
						"Removed from favourites"
					) : (
						<>
							Added to{" "}
							<Link to="/favs" className="underline">
								favourites
							</Link>
						</>
					),
				);
				setFavorite(favorite ? null : result.id); // Toggle favorite state.
				setActive?.(!favorite);
			} catch (error) {
				console.error("Error toggling favorite:", error);
				toast.error(
					favorite
						? "Failed to remove from favourites"
						: "Failed to add to favourites",
				);
			}
		});
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={onToggleFavorite}
					variant="outline"
					disabled={isPending}
					aria-label={
						favorite
							? "Remove this image from favourites"
							: "Add this image to favourites"
					}
				>
					{favorite ? (
						<Heart className="fill-red-500 text-red-500" />
					) : (
						<Heart />
					)}
					{small
						? null
						: favorite
							? "Remove from favourites"
							: "Add to favourites"}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				{favorite
					? "Remove this image from favourites"
					: "Add this image to favourites"}
			</TooltipContent>
		</Tooltip>
	);
}
