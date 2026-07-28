#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const svgPath = join(root, "src/app/icon.svg");
const icoPath = join(root, "src/app/favicon.ico");

const require = createRequire(import.meta.url);
const sharpPath = join(
  root,
  "node_modules/.pnpm/sharp@0.34.5/node_modules/sharp",
);
if (!existsSync(sharpPath)) {
  console.error(
    `sharp not found at ${sharpPath}. Run \`pnpm install\` first.`,
  );
  process.exit(1);
}
const sharp = require(sharpPath);

const svg = readFileSync(svgPath);
const sizes = [16, 32, 48, 64, 128, 256];
const pngs = [];
for (const size of sizes) {
  const buf = await sharp(svg, { density: 384 })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  pngs.push({ size, buf });
  console.log(`rendered ${size}x${size} = ${buf.length} bytes`);
}

const numImages = pngs.length;
const headerSize = 6 + 16 * numImages;
let offset = headerSize;

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(numImages, 4);

const entries = [];
for (const { size, buf } of pngs) {
  const e = Buffer.alloc(16);
  e.writeUInt8(size === 256 ? 0 : size, 0);
  e.writeUInt8(size === 256 ? 0 : size, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buf.length;
  entries.push(e);
}

const ico = Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
writeFileSync(icoPath, ico);
console.log(`wrote ${icoPath}: ${ico.length} bytes, ${numImages} sizes`);
