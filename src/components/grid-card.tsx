import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CopyButton } from "./buttons-utils/copy";
import { DownloadButton } from "./buttons-utils/download";
import { EmbedButton } from "./buttons-utils/embed";
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
	const [active, setActive] = useState<boolean>(true);

	return (
		<div className="mb-4 break-inside-avoid relative">
			<Link
				to={`/cat/${id}`}
				aria-label={`Open cat #${id}`}
				className="absolute inset-0 z-10 sm:hidden"
			/>

			<img
				src={url}
				width={width}
				height={height}
				alt={`Cat #${id}`}
				className={cn(
					"mb-4 w-full rounded-lg",
					!active || loading ? "grayscale-100 opacity-50" : "",
				)}
				loading="lazy"
			/>

			<div className="hidden absolute top-0 left-0 w-full h-full sm:flex flex-wrap items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-lg">
				<OpenButton id={id} />
				<DownloadButton id={id} small />
				<FavoriteButton
					id={id}
					favouriteId={favouriteId}
					setActive={setActive}
					small
				/>
				<CopyButton url={url} small />
				<EmbedButton url={url} small />
			</div>
		</div>
	);
}
