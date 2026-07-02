import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ImageCardProps = {
	id: string;
	small?: boolean;
};

export function DownloadButton({ id, small = false }: ImageCardProps) {
	const onDownload = async () => {
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
			toast.error("Failed to download image");
		}
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={onDownload}
					variant="outline"
					aria-label="Download this image to your device"
				>
					<Download />
					{small ? null : "Download"}
				</Button>
			</TooltipTrigger>
			<TooltipContent>Download this image to your device</TooltipContent>
		</Tooltip>
	);
}
