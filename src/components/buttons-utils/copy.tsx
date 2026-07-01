import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

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
		} catch (error) {
			console.error("Error copying link:", error);
			toast.error("Failed to copy link");
		}
	};

	return (
		<Button onClick={onCopy} variant="outline">
			{changed ? <Check /> : <Copy />}
			{small ? null : changed ? "Copied!" : "Copy link"}
		</Button>
	);
}
