/**
 * Prefix a root-relative public asset path with the deploy basePath (set at
 * build time for GitHub Pages, empty everywhere else). Only needed for raw
 * <img>/<video>/<source>/poster references — next/image and next/link handle
 * the prefix themselves (via the custom image loader / router).
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return path.startsWith("/") ? `${base}${path}` : path;
}
