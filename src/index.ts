import { serve } from "bun";
import index from "./index.html";
import { DEFAULT_LIMIT, AVAILABLE_LIMITS } from "./lib/consts";
import { theCatAPI } from "./api/cats.api";

const getStatusCode = (error: unknown): number => {
  if (error instanceof Error) {
    if (error.message.includes("not found") || error.message.includes("404")) {
      return 404;
    }
  }
  return 502;
};

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
          const status = getStatusCode(e);
          return Response.json({ error: message }, { status });
        }
      },
    },

    "/api/images/:id": {
      async GET(req) {
        const id = req.params.id;

        try {
          const [image, analysis] = await Promise.all([
            theCatAPI.images.getImage(id),
            theCatAPI.images.getImageAnalysis(id),
          ]);
          return Response.json({ image, analysis });
        } catch (e) {
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
    }
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
