import { TheCatAPI } from "@thatapicompany/thecatapi";

const apiKey = process.env.CAT_API_KEY || "";

export const theCatAPI = new TheCatAPI(apiKey);
