/**
 * Build a list of which video files actually exist in public/media.
 *
 * Frame needs to know whether a clip is available, but it runs in the browser
 * and the browser cannot read the filesystem. Asking for the file and handling
 * the 404 would mean a failed request on every page load. So the list is
 * written out at build time instead, and Frame just reads it.
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 */
import { readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mediaDir = join(root, "public", "media");
const out = join(root, "lib", "media-manifest.ts");

const files = existsSync(mediaDir)
  ? readdirSync(mediaDir).filter((f) => /\.(mp4|webm)$/i.test(f))
  : [];

mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  `// GENERATED FILE — do not edit.
// Written by scripts/media-manifest.mjs before every dev and build run.
// Add or remove a video in public/media and it updates on the next start.

export const MEDIA_VIDEOS: ReadonlySet<string> = new Set(${JSON.stringify(
    files.map((f) => `/media/${f}`),
    null,
    2
  )});
`
);

console.log(
  files.length
    ? `media-manifest: found ${files.length} video(s) — ${files.join(", ")}`
    : "media-manifest: no videos in public/media yet"
);
