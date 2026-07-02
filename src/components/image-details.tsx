import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { CatImageData } from "@/types/cats.types";
import { CopyButton } from "./buttons-utils/copy";
import { DownloadButton } from "./buttons-utils/download";
import { EmbedButton } from "./buttons-utils/embed";
import { FavoriteButton } from "./buttons-utils/favorite";
import { Button } from "./ui/button";

type ImageCardProps = {
	data?: CatImageData;
};

export function ImageDetails({ data }: ImageCardProps) {
	const [showMeta, setShowMeta] = useState<boolean>(false);

	if (!data) {
		return (
			<div className="flex justify-center text-muted-foreground gap-4">
				<p>No cat found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-center items-stretch">
				<div>
					<img
						src={data.image.url}
						alt={`Cat #${data.image.id}`}
						className="rounded-lg max-h-[60vh] sm:max-h-[80vh] w-full sm:w-auto object-contain"
					/>
				</div>
			</div>

			<div className="flex flex-col justify-center gap-4">
				<div className="flex flex-wrap gap-2 items-center justify-center">
					<Button
						onClick={() => setShowMeta(!showMeta)}
						variant="outline"
						aria-label={showMeta ? "Hide meta data" : "Hide meta data"}
					>
						{showMeta ? <EyeOff /> : <Eye />}
						{showMeta ? "Hide meta data" : "Hide meta data"}
					</Button>
					<DownloadButton id={data.image.id} />
					<FavoriteButton id={data.image.id} favouriteId={data.favouriteId} />
					<CopyButton url={data.image.url} />
					<EmbedButton url={data.image.url} />
				</div>

				{showMeta && (
					<pre className="rounded-lg max-h-[80vh] p-4 bg-muted text-sm overflow-auto">
						{JSON.stringify(data, null, 2)}
					</pre>
				)}
			</div>
		</div>
	);
}
