import { useState } from "react";
import type { CatImageData } from "@/types/cats.types";
import { Button } from "./ui/button";

type ImageCardProps = {
	data?: CatImageData;
};

export function ImageCard({ data }: ImageCardProps) {
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
			<div className="flex gap-4 justify-center items-stretch">
				<div>
					<img
						src={data.image.url}
						alt={`Cat #${data.image.id}`}
						className="rounded-lg max-h-[80vh] object-contain"
					/>
				</div>
			</div>

			<div className="flex flex-col justify-center gap-4">
				<Button
					variant="outline"
					className="w-fit"
					size="sm"
					onClick={() => setShowMeta(!showMeta)}
				>
					{showMeta ? "Hide" : "Show"} meta
				</Button>

				{showMeta && (
					<pre className="rounded-lg max-h-[80vh] p-4 bg-muted text-sm overflow-auto">
						{JSON.stringify(data, null, 2)}
					</pre>
				)}
			</div>
		</div>
	);
}
