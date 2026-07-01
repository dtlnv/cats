import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type ImageCardProps = {
	id: string;
	small?: boolean;
};

export function CopyButton({ id, small = false }: ImageCardProps) {
	const [changed, setChanged] = useState<boolean>(false);

	const onCopy = async () => {
		try {
			const response = await fetch(
				`/api/images/download/${encodeURIComponent(id)}`,
			);

			if (!response.ok) {
				throw new Error("Failed to download image");
			}

			const blob = await response.blob();
			const bitmap = await createImageBitmap(blob);

			const canvas = document.createElement("canvas");
			canvas.width = bitmap.width;
			canvas.height = bitmap.height;

			const ctx = canvas.getContext("2d");
			if (!ctx) {
				throw new Error("Failed to get canvas context");
			}

			ctx.drawImage(bitmap, 0, 0);

			canvas.toBlob(async (blob) => {
				if (!blob) {
					throw new Error("Failed to convert canvas to blob");
				}

				const item = new ClipboardItem({ [blob.type]: blob });
				await navigator.clipboard.write([item]);

				toast.success("Image copied to clipboard");
			}, "image/png");

			setChanged(true);

			setTimeout(() => {
				setChanged(false);
			}, 5000);
		} catch (error) {
			console.error("Error downloading image:", error);
			toast.error("Failed to download image");
		}
	};

	return (
		<Button onClick={onCopy} variant="outline">
			{changed ? <Check /> : <Copy />}
			{small ? null : changed ? "Copied!" : "Copy to clipboard"}
		</Button>
	);
}
