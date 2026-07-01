import { cn } from "@/lib/utils";
import { CopyButton } from "./buttons-utils/copy";
import { DownloadButton } from "./buttons-utils/download";
import { FavoriteButton } from "./buttons-utils/favorite";
import { OpenButton } from "./buttons-utils/open";

type Props = {
	id: string;
	url: string;
	width?: number;
	height?: number;
	favouriteId: number | null;
	loading?: boolean;
};

export function GridCard({
	id,
	url,
	width,
	height,
	favouriteId,
	loading,
}: Props) {
	return (
		<div className="mb-4 break-inside-avoid relative">
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-lg">
				<OpenButton id={id} />
				<DownloadButton id={id} small />
				<FavoriteButton id={id} favouriteId={favouriteId} small />
				<CopyButton id={id} small />
			</div>

			<img
				src={url}
				width={width}
				height={height}
				alt={`Cat #${id}`}
				className={cn(
					"mb-4 w-full rounded-lg",
					loading ? "grayscale-100 opacity-50" : "",
				)}
				loading="lazy"
			/>
		</div>
	);
}
