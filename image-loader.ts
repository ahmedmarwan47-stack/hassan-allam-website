// Static-export image loader: passes local images through untouched except
// for the GitHub Pages basePath prefix. Width/quality are ignored on purpose —
// the export ships original files.
export default function imageLoader({ src }: { src: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}` : src;
}
