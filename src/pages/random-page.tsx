import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";

/**
 * /random page of the app. Fetches a random image id from the API and navigates to /cat/:id.
 */
export function RandomPage() {
	const route = useNavigate();

	useEffect(() => {
		// Get random image id and navigate to /cat/:id
		let active = true;
		const run = async () => {
			const res = await fetch("/api/images/random");
			if (!res.ok) {
				throw new Error("Failed to get random image");
			}
			const data = await res.json();
			const id = data.id;
			active && route(`/cat/${id}`);
		};
		run();

		return () => {
			active = false;
		};
	}, [route]);

	return <Layout loading />;
}
