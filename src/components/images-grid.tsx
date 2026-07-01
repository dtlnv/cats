import { Frown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { CatImage } from "@/types/cats.types";
import { Button } from "./ui/button";

type Props = {
	data: CatImage[];
	loading: boolean;
};

export function ImagesGrid({ data, loading }: Props) {
	const onDownload = async (id: string) => {
		try {
			const response = await fetch(
				`/api/images/download/${encodeURIComponent(id)}`,
			);

			if (!response.ok) {
				throw new Error("Failed to download image");
			}

			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = blobUrl;
			a.download = `${id}.jpg`;

			document.body.appendChild(a);
			a.click();
			a.remove();

			URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error("Error downloading image:", error);
		}
	};

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
				<div key={img.id} className="mb-4 break-inside-avoid relative">
					<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-lg">
						<Link to={`/cats/${img.id}`}>
							<Button variant="outline">View</Button>
						</Link>
						<Button onClick={() => onDownload(img.id)} variant="outline">
							Download
						</Button>
					</div>

					<img
						src={img.url}
						width={img.width}
						height={img.height}
						alt={`Cat #${img.id}`}
						className={cn(
							"mb-4 w-full rounded-lg",
							loading ? "grayscale-100 opacity-50" : "",
						)}
						loading="lazy"
					/>
				</div>
			))}
		</div>
	);
}
