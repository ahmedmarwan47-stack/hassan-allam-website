// Writes public/app-qr.svg — the "Scan to download" QR code in the homepage
// app section (white modules on a transparent background, for the dark
// corner it sits on). Run again with the real store link when it's ready:
//   node scripts/gen-app-qr.mjs "https://…"
import { writeFile } from "node:fs/promises";
import QRCode from "qrcode";

const url = process.argv[2] ?? "https://google.com";
const svg = await QRCode.toString(url, {
  type: "svg",
  margin: 0,
  errorCorrectionLevel: "M",
  color: { dark: "#ffffffff", light: "#00000000" },
});
await writeFile("public/app-qr.svg", svg);
console.log(`QR for ${url} → public/app-qr.svg`);
