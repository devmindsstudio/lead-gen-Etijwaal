import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is fully static (content comes from /sites/*.json). Cache Components
  // is off so `dynamicParams = false` can return real 404s for unknown URLs instead of
  // streamed soft-404s, which matters for SEO.
  cacheComponents: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
