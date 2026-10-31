// Splits the live site's packed cloud texture (hap.com.eg/webgl/map/clouds.png:
// one cloud mask per R/G/B channel, made for a WebGL shader) into three white
// clouds with transparency, so they can drift over the map as plain images.
// The masks run into the texture's edges, so each one is feathered with a
// soft elliptical fade to avoid hard rectangular borders.
//
// Usage:  node scripts/split-clouds.mjs path/to/clouds.png
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2];
if (!SRC) throw new Error("Pass the path to clouds.png");
const OUT_DIR = path.resolve(import.meta.dirname, "../public/images/map");
const W = 1600;
const H = 800;

// White in the middle fading to black at the edges — used as an alpha multiplier.
const feather = await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs><radialGradient id="g" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stop-color="#fff"/><stop offset="100%" stop-color="#000"/>
      </radialGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`,
  ),
)
  .extractChannel(0)
  .raw()
  .toBuffer();

for (const [i, name] of ["cloud-a", "cloud-b", "cloud-c"].entries()) {
  const mask = await sharp(SRC).extractChannel(i).resize(W, H, { fit: "fill" }).raw().toBuffer();
  const rgba = Buffer.alloc(W * H * 4);
  for (let p = 0; p < W * H; p++) {
    rgba[p * 4] = rgba[p * 4 + 1] = rgba[p * 4 + 2] = 255;
    rgba[p * 4 + 3] = Math.round((mask[p] * feather[p]) / 255);
  }
  await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .webp({ quality: 80, alphaQuality: 80 })
    .toFile(path.join(OUT_DIR, `${name}.webp`));
}
console.log("Wrote cloud-a/b/c.webp");
