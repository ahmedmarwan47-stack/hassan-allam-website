// Static-export image loader. The GitHub Pages build can't resize images on
// the fly, so scripts/optimize-images.mjs pre-generates WebP copies of every
// file in public/images at the widths in next.config.ts:
//   /images/foo/bar.jpg @ 828 → <basePath>/_img/foo/bar-828.webp
// next/image only ever asks for those configured widths. Anything outside
// /images (or remote), and the zoomable map, pass through with the basePath
// prefix.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // The Egypt map is shown zoomed in, so it keeps its full-size original
  // (already a compact WebP); everything else uses the resized copies.
  if (src.startsWith("/images/") && !src.startsWith("/images/map/egypt-map")) {
    const rel = src.slice("/images/".length).replace(/\.[^./]+$/, "");
    // Encode (file names contain spaces) so srcset entries stay intact.
    return encodeURI(`${base}/_img/${rel}-${width}.webp`);
  }
  return src.startsWith("/") ? `${base}${src}` : src;
}
