import { Check, Link } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ImageCardProps = {
	url: string;
	small?: boolean;
};

export function CopyButton({ url, small = false }: ImageCardProps) {
	const [changed, setChanged] = useState<boolean>(false);

	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setChanged(true);

			setTimeout(() => {
				setChanged(false);
			}, 5000);

			toast.success("Image URL has been copied");
		} catch (error) {
			console.error("Error copying link:", error);
			toast.error("Failed to copy link");
		}
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={onCopy}
					variant="outline"
					title="Copy link to clipboard"
				>
					{changed ? <Check /> : <Link />}
					{small ? null : changed ? "Copied!" : "Copy link"}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				{changed ? "Copied!" : "Copy link to clipboard"}
			</TooltipContent>
		</Tooltip>
	);
}
