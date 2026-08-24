/**
 * Index public/media at build time.
 *
 * Two jobs:
 *
 *  1. List which video files exist. Frame runs in the browser and cannot read
 *     the filesystem, and requesting a clip that may not be there would mean a
 *     404 on every page load.
 *
 *  2. Stamp every media file with a short version derived from its size and
 *     modification time. Frame appends that to the URL, so replacing artwork
 *     changes the URL. Without it, Next's image optimiser and the browser both
 *     keep serving the previous picture after a swap — which looks exactly like
 *     a failed import, and cost real debugging time twice.
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 */
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mediaDir = join(root, "public", "media");
const out = join(root, "lib", "media-manifest.ts");

const all = existsSync(mediaDir) ? readdirSync(mediaDir) : [];
const videos = all.filter((f) => /\.(mp4|webm)$/i.test(f)).map((f) => `/media/${f}`);

const versions = {};
for (const f of all) {
  if (!/\.(jpe?g|png|webp|avif|mp4|webm)$/i.test(f)) continue;
  const st = statSync(join(mediaDir, f));
  versions[`/media/${f}`] = (st.size ^ Math.floor(st.mtimeMs)).toString(36).slice(-6);
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  `// GENERATED FILE — do not edit.
// Written by scripts/media-manifest.mjs before every dev and build run.

export const MEDIA_VIDEOS: ReadonlySet<string> = new Set(${JSON.stringify(videos, null, 2)});

const VERSIONS: Record<string, string> = ${JSON.stringify(versions, null, 2)};

/**
 * Append a content stamp so a replaced file gets a new URL, defeating both the
 * Next image cache and the browser cache. Unknown paths pass through unchanged.
 */
export function mediaSrc(path: string): string {
  const clean = path.split("?")[0];
  const v = VERSIONS[clean];
  return v ? \`\${clean}?v=\${v}\` : path;
}
`
);

console.log(
  `media-manifest: ${Object.keys(versions).length} media file(s), ${videos.length} video(s)`
);
