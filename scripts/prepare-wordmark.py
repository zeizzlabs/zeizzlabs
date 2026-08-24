#!/usr/bin/env python3
"""
Turn a "ZeizzLabs" wordmark export into the transparent PNG the site uses.

The supplied artwork is white letterforms on a white background, so a plain
colour-key (remove every white pixel) would erase the letters along with the
background. This does an edge flood-fill instead: it only clears white that is
*connected to the border*, so the enclosed white letter faces survive because
the grey bevel around each glyph stops the fill.

Usage
-----
    python3 scripts/prepare-wordmark.py <image>          # explicit file
    python3 scripts/prepare-wordmark.py                  # newest image in ~/Downloads

Writes public/brand/zeizzlabs-wordmark.png. The site picks it up automatically
on the next build — no code change needed.
"""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "brand" / "zeizzlabs-wordmark.png"

# How far from the corner colour still counts as background. Raised a little so
# soft JPEG-ish gradients near the edge are caught, but low enough that the
# grey bevel (~205 and darker) is never crossed.
TOLERANCE = 26


def newest_download() -> Path:
    downloads = Path.home() / "Downloads"
    candidates = [
        p
        for p in downloads.rglob("*")
        if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"} and p.is_file()
    ]
    if not candidates:
        sys.exit("No images found in ~/Downloads — pass the file path explicitly.")
    return max(candidates, key=lambda p: p.stat().st_mtime)


def close_enough(px, ref) -> bool:
    return all(abs(px[i] - ref[i]) <= TOLERANCE for i in range(3))


def silhouette(im: Image.Image) -> Image.Image:
    """
    Recover glyph shapes from their bevel outlines.

    Treats anything meaningfully darker than white as a wall, floods the true
    outside from the border, and keeps everything the flood could not reach —
    i.e. the walls plus the white letter faces they enclose. The soft drop
    shadow sits below the wall threshold, so it is discarded as background.
    """
    WALL = 34  # how much darker than white a pixel must be to count as a bevel

    w, h = im.size
    px = im.load()
    gray = [[0] * w for _ in range(h)]
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            gray[y][x] = 255 - (r * 299 + g * 587 + b * 114) // 1000

    outside = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        i = y * w + x
        if not outside[i] and gray[y][x] < WALL:
            outside[i] = 1
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        if x > 0:
            push(x - 1, y)
        if x < w - 1:
            push(x + 1, y)
        if y > 0:
            push(x, y - 1)
        if y < h - 1:
            push(x, y + 1)

    kept = 0
    for y in range(h):
        row = y * w
        for x in range(w):
            if outside[row + x]:
                r, g, b, _ = px[x, y]
                px[x, y] = (r, g, b, 0)
            else:
                kept += 1
    print(f"Silhouette kept {kept:,} pixels ({kept / (w * h) * 100:.1f}%)")
    if kept == 0:
        sys.exit("Silhouette mode found no letterforms — export with a transparent background instead.")
    if kept / (w * h) < 0.04:
        print(
            "\nWARNING: only the bevel outlines survived, not the letter faces.\n"
            "That means the bevel around the glyphs has gaps, so the fill reached\n"
            "inside them. A white-wordmark-on-white-background export cannot be\n"
            "separated reliably — re-export the wordmark with a TRANSPARENT\n"
            "background (or on a dark background) and run this again.\n"
        )
    return im


def main() -> None:
    src = Path(sys.argv[1]).expanduser() if len(sys.argv) > 1 else newest_download()
    if not src.exists():
        sys.exit(f"Not found: {src}")
    print(f"Source: {src}")

    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()

    # Reference background colour = average of the four corners.
    corners = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    ref = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
    print(f"Size: {w}x{h}   background reference: rgb{ref}")

    # Flood fill inward from every border pixel.
    seen = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        i = y * w + x
        if not seen[i] and close_enough(px[x, y], ref):
            seen[i] = 1
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        if x > 0:
            push(x - 1, y)
        if x < w - 1:
            push(x + 1, y)
        if y > 0:
            push(x, y - 1)
        if y < h - 1:
            push(x, y + 1)

    cleared = 0
    for y in range(h):
        row = y * w
        for x in range(w):
            if seen[row + x]:
                r, g, b, _ = px[x, y]
                px[x, y] = (r, g, b, 0)
                cleared += 1

    pct = cleared / (w * h) * 100
    print(f"Cleared {cleared:,} background pixels ({pct:.1f}%)")
    if pct < 5:
        print("WARNING: almost nothing was removed — is the background uniform?")
    if pct > 96:
        # The fill leaked through the glyphs, which happens when the letter
        # faces are the same white as the background and the bevel around them
        # has a gap. Fall back to recovering the silhouette from the bevel.
        print("Edge fill leaked through the letters — falling back to silhouette mode.")
        im = silhouette(Image.open(src).convert("RGBA"))

    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)

    # Cap the width so the file stays small; the wordmark is only ever rendered
    # a few dozen pixels tall.
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    im.save(OUT, optimize=True)
    print(f"Wrote {OUT.relative_to(ROOT)}  ({im.width}x{im.height})")
    print("Rebuild (or restart `npm run dev`) and the site will use it.")


if __name__ == "__main__":
    main()
