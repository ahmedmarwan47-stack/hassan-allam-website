/**
 * Prefix a root-relative public asset path with the deploy basePath (set at
 * build time for GitHub Pages, empty everywhere else). Only needed for raw
 * <img>/<video>/<source>/poster references — next/image and next/link handle
 * the prefix themselves (via the custom image loader / router).
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // Images can come from a different base (a branch preview reuses the live
  // site's /images and /_img).
  const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE || base;
  if (path.startsWith("/images/") || path.startsWith("/_img/")) return `${assetBase}${path}`;
  return path.startsWith("/") ? `${base}${path}` : path;
}
