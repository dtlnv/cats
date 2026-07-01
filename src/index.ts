import { serve } from "bun";
import { theCatAPI } from "./api/cats.api";
import index from "./index.html";
import { getStatusCode, resolveLimit } from "./lib/api-helpers";

const server = serve({
	routes: {
		"/*": index,

		"/api/images/search": {
			async GET(req) {
				const url = new URL(req.url);
				const userLimit = Number(url.searchParams.get("limit"));
				const limit = resolveLimit(userLimit);

				try {
					const images = await theCatAPI.images.searchImages({
						limit,
					});
					return Response.json(images);
				} catch (e) {
					const message = e instanceof Error ? e.message : "Unknown error";
					const status = getStatusCode(e);
					return Response.json({ error: message }, { status });
				}
			},
		},

		"/api/images/:id": {
			async GET(req) {
				const id = req.params.id;

				try {
					const [image, analysis, favouriteId] = await Promise.all([
						theCatAPI.images.getImage(id),
						theCatAPI.images.getImageAnalysis(id),
						theCatAPI.favourites
							.getFavourites()
							.then(
								(favs) => favs.find((fav) => fav.image.id === id)?.id ?? null,
							),
					]);

					return Response.json({ image, analysis, favouriteId });
				} catch (e) {
					console.error("Error fetching image details:", e);
					const message = e instanceof Error ? e.message : "Unknown error";
					const status = getStatusCode(e);
					return Response.json({ error: message }, { status });
				}
			},
		},

		"/api/images/download/:id": {
			async GET(req) {
				const id = req.params.id;

				try {
					const image = await theCatAPI.images.getImage(id);
					const response = await fetch(image.url);
					const blob = await response.blob();
					return new Response(blob, {
						headers: {
							"Content-Type": blob.type,
							"Content-Disposition": `attachment; filename="cat.jpg"`,
						},
					});
				} catch (e) {
					const message = e instanceof Error ? e.message : "Unknown error";
					const status = getStatusCode(e);
					return Response.json({ error: message }, { status });
				}
			},
		},

		"/api/images/random": {
			async GET() {
				try {
					const image = await theCatAPI.images.getRandomImage();
					return Response.json(image);
				} catch (e) {
					const message = e instanceof Error ? e.message : "Unknown error";
					const status = getStatusCode(e);
					return Response.json({ error: message }, { status });
				}
			},
		},

		"/api/favourites": {
			async GET() {
				try {
					const result = await theCatAPI.favourites.getFavourites();
					return Response.json(result);
				} catch (e) {
					const message = e instanceof Error ? e.message : "Unknown error";
					const status = getStatusCode(e);
					return Response.json({ error: message }, { status });
				}
			},
		},

		"/api/favourites/:id": {
			async POST(req) {
				const id = req.params.id;

				try {
					const result = await theCatAPI.favourites.addFavourite(id);
					return Response.json(result);
				} catch (e) {
					const message = e instanceof Error ? e.message : "Unknown error";
					const status = getStatusCode(e);
					return Response.json({ error: message }, { status });
				}
			},
			async DELETE(req) {
				const id = req.params.id;

				try {
					const result = await theCatAPI.favourites.deleteFavourite(+id);
					console.log(`Deleted favourite with result:`, result);
					return Response.json(result);
				} catch (e) {
					const message = e instanceof Error ? e.message : "Unknown error";
					const status = getStatusCode(e);
					return Response.json({ error: message }, { status });
				}
			},
		},
	},

	development: process.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
});

console.log(`🚀 Server running at ${server.url}`);
