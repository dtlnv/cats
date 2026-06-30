import { TheCatAPI } from "@thatapicompany/thecatapi";

const apiKey = process.env.CAT_API_KEY;

if (!apiKey) {
    throw Error("No Api key");
}

export const theCatAPI = new TheCatAPI(apiKey);
