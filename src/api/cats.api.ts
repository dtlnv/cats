import { TheCatAPI } from "@thatapicompany/thecatapi";

const apiKey = process.env.CAT_API_KEY;

if (!apiKey) {
	throw new Error(
		"CAT_API_KEY is not set. Add it to your .env file (see .env.example).",
	);
}

export const theCatAPI = new TheCatAPI(apiKey);
