#!/usr/bin/env python3
"""
Import artwork into public/media.

Image generators hand you large PNGs. PNG is the wrong format for photographic
or painterly artwork — it stores every pixel losslessly, so a single frame runs
to about 2 MB where the same picture as a JPEG is closer to 200 KB and looks
identical. Fourteen of them is the difference between a 27 MB page and a 3 MB
one.

This converts every PNG whose name matches a file the site expects, writes it
as an optimised progressive JPEG, and leaves the original untouched.

    python3 scripts/import-media.py                  # from ~/Downloads
    python3 scripts/import-media.py ~/Desktop/art    # from somewhere else
    python3 scripts/import-media.py --crop 2.4       # also crop to an aspect

Names must match exactly — see docs/ASSETS.md for the list. Anything unrecognised
is reported and skipped rather than guessed at.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / "public" / "media"

EXPECTED = {
    "service-software-development", "service-ai-intelligence",
    "service-automation-workflows", "service-design-branding",
    "service-digital-products", "service-cloud-infrastructure",
    "service-data-analytics", "service-digital-experiences",
    "work-voice-reception", "work-whatsapp-desk",
    "work-helios-dashboard", "work-aria-agent",
    "about-studio", "contact-signal",
}

SOURCE_EXT = (".png", ".jpg", ".jpeg", ".webp", ".avif")


def centre_crop(im: Image.Image, ratio: float) -> Image.Image:
    w, h = im.size
    if w / h > ratio:                     # too wide, trim the sides
        new_w = round(h * ratio)
        left = (w - new_w) // 2
        return im.crop((left, 0, left + new_w, h))
    new_h = round(w / ratio)              # too tall, trim top and bottom
    top = (h - new_h) // 2
    return im.crop((0, top, w, top + new_h))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("source", nargs="?", default=str(Path.home() / "Downloads"))
    ap.add_argument("--crop", type=float, default=None,
                    help="Crop to this width:height ratio, e.g. 2.4")
    ap.add_argument("--quality", type=int, default=82)
    args = ap.parse_args()

    src_dir = Path(args.source).expanduser()
    if not src_dir.is_dir():
        print(f"Not a folder: {src_dir}")
        return 1

    DEST.mkdir(parents=True, exist_ok=True)
    imported, skipped, saved_bytes = 0, [], 0

    for path in sorted(src_dir.iterdir()):
        if path.suffix.lower() not in SOURCE_EXT or not path.is_file():
            continue
        if path.stem not in EXPECTED:
            skipped.append(path.name)
            continue

        im = Image.open(path).convert("RGB")
        before = im.size
        if args.crop:
            im = centre_crop(im, args.crop)

        out = DEST / f"{path.stem}.jpg"
        im.save(out, quality=args.quality, optimize=True, progressive=True)

        src_kb = path.stat().st_size // 1024
        out_kb = out.stat().st_size // 1024
        saved_bytes += (path.stat().st_size - out.stat().st_size)
        crop_note = f" cropped {before}->{im.size}" if args.crop else ""
        print(f"  {path.name:38s} {src_kb:5d} KB -> {out.name:38s} {out_kb:4d} KB{crop_note}")
        imported += 1

    print(f"\nImported {imported} of {len(EXPECTED)} expected images."
          f"  Saved {saved_bytes / 1_048_576:.1f} MB.")

    missing = EXPECTED - {p.stem for p in DEST.glob("*.jpg")}
    if missing:
        print("Still using generated placeholders:")
        for m in sorted(missing):
            print(f"  - {m}")
    if skipped:
        print(f"\nIgnored {len(skipped)} file(s) whose names do not match "
              f"anything the site uses:")
        for s in skipped[:8]:
            print(f"  - {s}")
        if len(skipped) > 8:
            print(f"  ... and {len(skipped) - 8} more")
    return 0


if __name__ == "__main__":
    sys.exit(main())
