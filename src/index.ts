import { serve } from "bun";
import index from "./index.html";
import { DEFAULT_LIMIT, AVAILABLE_LIMITS } from "./lib/consts";
import { theCatAPI } from "./api/cats.api";

const server = serve({
  routes: {
    "/*": index,

    "/api/images/search": {
      async GET(req) {
        const url = new URL(req.url);
        const userLimit = Number(url.searchParams.get("limit"));
        const limit = AVAILABLE_LIMITS.includes(userLimit) ? userLimit : DEFAULT_LIMIT;

        try {
          const images = await theCatAPI.images.searchImages({
            limit,
          });
          return Response.json(images);
        } catch (e) {
          const message = e instanceof Error ? e.message : "Unknown error";
          return Response.json({ error: message }, { status: 502 });
        }
      },
    },

    "/api/images/:id": {
      async GET(req) {
        const id = req.params.id;

        try {
          const image = await theCatAPI.images.getImage(id);
          const analysis = await theCatAPI.images.getImageAnalysis(id);
          return Response.json({ image, analysis });
        } catch (e) {
          const message = e instanceof Error ? e.message : "Unknown error";
          return Response.json({ error: message }, { status: 502 });
        }
      },
    }
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
