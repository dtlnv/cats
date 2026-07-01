import { ExternalLink, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type ImageCardProps = {
	id: string;
};

export function OpenButton({ id }: ImageCardProps) {
	const [isNewTab, setIsNewTab] = useState<boolean>(false);

	useEffect(() => {
		// Turn isNewTab to true if the user holds down the Ctrl or Command key when clicking the button
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey || event.metaKey) {
				setIsNewTab(true);
			}
		};

		const handleKeyUp = () => {
			setIsNewTab(false);
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return (
		<Link to={`/cat/${id}`}>
			<Button variant="outline">{isNewTab ? <ExternalLink /> : <Eye />}</Button>
		</Link>
	);
}
