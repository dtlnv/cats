import { serve } from "bun";
import index from "./index.html";
import { DEFAULT_LIMIT, API_MAX_LIMIT } from "./lib/consts";
import { theCatAPI } from "./api/cats.api";

const server = serve({
  routes: {
    "/*": index,

    "/api/images/search": {
      async GET(req) {
        const url = new URL(req.url);
        const limit = Number(url.searchParams.get("limit")) || DEFAULT_LIMIT || API_MAX_LIMIT;

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
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
