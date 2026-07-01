import { Check, CodeXml, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ImageCardProps = {
	url: string;
	small?: boolean;
};

export function EmbedButton({ url, small = false }: ImageCardProps) {
	const [changed, setChanged] = useState<boolean>(false);

	const onCopyText = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setChanged(true);

			setTimeout(() => {
				setChanged(false);
			}, 5000);
		} catch (error) {
			console.error("Error copying link:", error);
			toast.error("Failed to copy link");
		}
	};

	const embedCode = `<img src="${url}" alt="Cat image" />`;

	return (
		<Dialog>
			<DialogTrigger>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline">
							<CodeXml />
							{small ? null : "Embed"}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						Embed this image in your website or blog
					</TooltipContent>
				</Tooltip>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src={url} />
						</Avatar>
						Embed this image
					</DialogTitle>
					<DialogDescription>
						Want to embed this image in your website or blog? Just drop in the
						embed code below and you're done!
						<textarea
							readOnly
							value={embedCode}
							className="w-full mt-2 p-2 border rounded-lg bg-muted text-sm"
						/>
						<Button
							onClick={() => onCopyText(embedCode)}
							variant="outline"
							className="mt-2"
						>
							{changed ? <Check /> : <Copy />}
							{changed ? "Copied!" : "Copy embed code"}
						</Button>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
