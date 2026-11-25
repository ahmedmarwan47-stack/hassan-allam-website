import type { NextConfig } from "next";

// GitHub Pages serves project sites under /<repo>, so the deploy build gets a
// basePath + static export. Local `next dev` / plain builds stay untouched —
// gate everything behind DEPLOY_TARGET=gh-pages.
const isPagesDeploy = process.env.DEPLOY_TARGET === "gh-pages";
// A branch preview is the same export under a sub-path (PAGES_BASE_PATH, e.g.
// /hassan-allam-website/preview/arabic-review) that reuses the live site's
// images (PAGES_ASSET_BASE) instead of shipping a second copy of them.
const basePath = isPagesDeploy ? (process.env.PAGES_BASE_PATH ?? "/hassan-allam-website") : "";
const assetBase = isPagesDeploy ? (process.env.PAGES_ASSET_BASE ?? basePath) : "";

const nextConfig: NextConfig = {
  ...(isPagesDeploy
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        images: {
          // Custom loader (instead of `unoptimized`) so every next/image src
          // gets the basePath prefix and points at the pre-resized WebP
          // copies (see image-loader.ts) — `unoptimized` would bypass it.
          loader: "custom" as const,
          loaderFile: "./image-loader.ts",
          // The only widths the loader can serve — keep in sync with WIDTHS
          // in scripts/optimize-images.mjs.
          deviceSizes: [828, 1200, 1600, 2048],
          imageSizes: [320, 480],
        },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ASSET_BASE: assetBase,
  },
};

export default nextConfig;
