// Generates resized WebP copies of every image in public/images for the
// static (GitHub Pages) build, which can't resize on the fly:
//   public/images/foo/bar.jpg → public/_img/foo/bar-<width>.webp
// for each width in WIDTHS (never upscaled). image-loader.ts points
// next/image at these files, so each slot downloads only the size it needs.
// Incremental: an output newer than its source is skipped.
//
// Run: node scripts/optimize-images.mjs  (the deploy script runs it first)
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Keep in sync with images.deviceSizes / imageSizes in next.config.ts.
export const WIDTHS = [320, 480, 828, 1200, 1600, 2048];
const QUALITY = 72;

const ROOT = path.resolve("public/images");
const OUT = path.resolve("public/_img");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) yield full;
  }
}

let made = 0;
let skipped = 0;
for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\.[^.]+$/, "");
  const srcTime = (await stat(file)).mtimeMs;
  await mkdir(path.join(OUT, path.dirname(rel)), { recursive: true });
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${rel}-${w}.webp`);
    const existing = await stat(out).catch(() => null);
    if (existing && existing.mtimeMs >= srcTime) {
      skipped++;
      continue;
    }
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
    made++;
  }
}
console.log(`Image variants: ${made} written, ${skipped} up to date → public/_img`);
