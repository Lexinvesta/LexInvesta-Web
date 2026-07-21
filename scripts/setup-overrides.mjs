#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const wsPath = join(root, "pnpm-workspace.yaml");
const lockPath = join(root, "pnpm-lock.yaml");

const localTarballs = {
  next: { file: "vendor/next-16.2.10.tgz", version: "16.2.10" },
  "@next/swc-linux-x64-gnu": { file: "vendor/swc-linux.tgz", version: "16.2.10" },
  "@swc/core-linux-x64-gnu": { file: "vendor/swc-core.tgz", version: "1.15.43" },
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const allPresent = Object.values(localTarballs).every((info) =>
  existsSync(join(root, info.file)),
);

{
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
    for (const [pkg, info] of Object.entries(localTarballs)) {
      out.push(`  "${pkg}": "file:./${info.file}"`);
    }
  }

  writeFileSync(wsPath, out.join("\n") + "\n");
}

function rewriteLockfileToFile(content, pkg, fileRef, version) {
  const lines = content.split(/\r?\n/);
  const keyRe = new RegExp(
    `^(\\s+)(['"]?)${escapeRegex(pkg)}@${escapeRegex(version)}\\2:\\s*$`,
  );
  const keyFileRe = new RegExp(
    `^(\\s+)(['"]?)${escapeRegex(pkg)}@file:${escapeRegex(fileRef)}\\2:\\s*$`,
  );
  const resRe = /^(\s+)resolution: \{integrity: ([^,}]+)\}\s*$/;
  const resTarballRe =
    /^(\s+)resolution: \{integrity: ([^,}]+), tarball: file:[^}]+\}\s*$/;

  for (let i = 0; i < lines.length; i++) {
    const keyMatch = lines[i].match(keyRe) || lines[i].match(keyFileRe);
    if (!keyMatch) continue;

    if (keyRe.test(lines[i])) {
      lines[i] = lines[i].replace(keyRe, `$1$2${pkg}@file:${fileRef}$2:`);
    }

    for (let j = i + 1; j < lines.length; j++) {
      const line = lines[j];
      if (line.length > 0 && !line.startsWith(" ") && !line.startsWith("\t")) {
        break;
      }
      const m = resRe.exec(line);
      if (m) {
        lines[j] = `${m[1]}resolution: {integrity: ${m[2]}, tarball: file:${fileRef}}`;
        break;
      }
      const m2 = resTarballRe.exec(line);
      if (m2) {
        lines[j] = `${m2[1]}resolution: {integrity: ${m2[2]}, tarball: file:${fileRef}}`;
        break;
      }
    }
  }

  const importerRe = new RegExp(
    `(^[ ]+${escapeRegex(pkg)}:\\s*\\n[ ]+specifier: )[^\\n]+\\n([ ]+version: )${escapeRegex(version)}\\(`,
    "gm",
  );
  const importerResult = lines.join("\n").replace(
    importerRe,
    `$1file:./${fileRef}\n$2file:${fileRef}(`,
  );

  return importerResult;
}

function rewriteLockfileToRegistry(content, fileRef, version) {
  let out = content;
  out = out.replace(
    new RegExp(`, tarball: file:${escapeRegex(fileRef)}`, "g"),
    "",
  );
  out = out.replaceAll(`file:${fileRef}`, version);
  out = out.replace(
    new RegExp(
      `(^[ ]+[\\w@/-]+:\\s*\\n[ ]+specifier: )file:\\.\\/${escapeRegex(fileRef)}\\n([ ]+version: )${escapeRegex(version)}\\(`,
      "gm",
    ),
    `$1^${version}\n$2${version}(`,
  );
  out = out.replace(
    new RegExp(
      `^overrides:\\n(?:  .*\\n)*`,
      "m",
    ),
    "",
  );
  return out;
}

if (existsSync(lockPath)) {
  const original = readFileSync(lockPath, "utf-8");
  const hasFileRefs = original.includes("file:vendor/");

  if (allPresent && !hasFileRefs) {
    let rewritten = original;
    for (const [pkg, info] of Object.entries(localTarballs)) {
      rewritten = rewriteLockfileToFile(
        rewritten,
        pkg,
        info.file,
        info.version,
      );
    }
    if (!/^overrides:/m.test(rewritten)) {
      const overridesBlock =
        "overrides:\n" +
        Object.entries(localTarballs)
          .map(([pkg, info]) => `  ${pkg}: file:./${info.file}`)
          .join("\n") +
        "\n\n";
      rewritten = rewritten.replace(
        /^(importers:\n)/m,
        overridesBlock + "$1",
      );
    }
    writeFileSync(lockPath, rewritten);
    console.log(
      "[setup-overrides] Rewrote pnpm-lock.yaml to use file:vendor/...",
    );
  } else if (!allPresent && hasFileRefs) {
    let rewritten = original;
    for (const [pkg, info] of Object.entries(localTarballs)) {
      rewritten = rewriteLockfileToRegistry(
        rewritten,
        info.file,
        info.version,
      );
    }
    writeFileSync(lockPath, rewritten);
    console.log(
      "[setup-overrides] Rewrote pnpm-lock.yaml to use registry versions",
    );
  }
}

if (allPresent) {
  console.log(
    "[setup-overrides] Local tarballs detected in vendor/ — using file:./vendor/... overrides",
  );
} else {
  console.log(
    "[setup-overrides] Local tarballs not found in vendor/ — using registry",
  );
}
