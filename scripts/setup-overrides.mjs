#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const wsPath = join(root, "pnpm-workspace.yaml");

const localTarballs = {
  next: "vendor/next-16.2.10.tgz",
  "@next/swc-linux-x64-gnu": "vendor/swc-linux.tgz",
  "@swc/core-linux-x64-gnu": "vendor/swc-core.tgz",
};

const allPresent = Object.values(localTarballs).every((p) =>
  existsSync(join(root, p)),
);

const text = readFileSync(wsPath, "utf-8");
const lines = text.split(/\r?\n/);

const blocks = [];
let currentHeader = null;
let currentChildren = [];
for (const line of lines) {
  if (line.length === 0) {
    if (currentHeader !== null) {
      blocks.push({ header: currentHeader, children: currentChildren });
      currentHeader = null;
      currentChildren = [];
    }
    continue;
  }
  if (line[0] === " " || line[0] === "\t") {
    if (currentHeader !== null) currentChildren.push(line);
  } else {
    if (currentHeader !== null) {
      blocks.push({ header: currentHeader, children: currentChildren });
    }
    currentHeader = line;
    currentChildren = [];
  }
}
if (currentHeader !== null) {
  blocks.push({ header: currentHeader, children: currentChildren });
}

const filtered = blocks.filter((b) => !b.header.startsWith("overrides:"));

const out = [];
for (let i = 0; i < filtered.length; i++) {
  if (i > 0) out.push("");
  out.push(filtered[i].header);
  for (const child of filtered[i].children) out.push(child);
}

if (allPresent) {
  if (out.length > 0) out.push("");
  out.push("overrides:");
  for (const [pkg, path] of Object.entries(localTarballs)) {
    out.push(`  "${pkg}": "file:./${path}"`);
  }
}

writeFileSync(wsPath, out.join("\n") + "\n");

if (allPresent) {
  console.log(
    "[setup-overrides] Local tarballs detected in vendor/ — using file:./vendor/... overrides",
  );
} else {
  console.log(
    "[setup-overrides] Local tarballs not found in vendor/ — using registry",
  );
}
