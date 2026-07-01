import type { NextConfig } from "next";

// GitHub Pages serves project sites under /<repo>, so the deploy build gets a
// basePath + static export. Local `next dev` / plain builds stay untouched —
// gate everything behind DEPLOY_TARGET=gh-pages.
const isPagesDeploy = process.env.DEPLOY_TARGET === "gh-pages";
const basePath = isPagesDeploy ? "/hassan-allam-website" : "";

const nextConfig: NextConfig = {
  ...(isPagesDeploy
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        images: {
          // Custom loader (instead of `unoptimized`) so every next/image src
          // gets the basePath prefix — `unoptimized` would bypass the loader
          // and emit root-relative URLs that 404 under /<repo>.
          loader: "custom" as const,
          loaderFile: "./image-loader.ts",
        },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
