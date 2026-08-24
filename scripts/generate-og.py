#!/usr/bin/env python3
"""
Compose the social share card (1200x630) from the real brand assets.

Built programmatically rather than generated: the card carries the wordmark and
a headline, and text has to be crisp and exactly on-brand, which an image model
cannot guarantee.

    python3 scripts/generate-og.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
INK = (4, 6, 12)
BLUE = (30, 123, 255)
SKY = (140, 196, 255)
GOLD = (220, 184, 119)
TEXT = (244, 247, 252)


def font(size: int) -> ImageFont.FreeTypeFont:
    """Prefer a geometric face close to the wordmark; fall back gracefully."""
    for p in (
        "/System/Library/Fonts/Supplemental/Futura.ttc",
        "/System/Library/Fonts/Avenir Next.ttc",
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ):
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                continue
    return ImageFont.load_default()


def build() -> Image.Image:
    # --- all compositing first; every Image.blend returns a NEW image, so an
    # ImageDraw bound before one of these would be drawing onto a discarded
    # object. Draw only after the ground is final.
    img = Image.new("RGB", (W, H), INK)

    glow = Image.new("RGB", (W, H), (0, 0, 0))
    g = ImageDraw.Draw(glow)
    g.ellipse([-260, -340, 760, 500], fill=(16, 60, 138))
    g.ellipse([720, 280, 1520, 960], fill=(84, 66, 34))
    img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(190)), 0.9)

    grid = img.copy()
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 60):
        gd.line([(x, 0), (x, H)], fill=(255, 255, 255), width=1)
    for y in range(0, H, 60):
        gd.line([(0, y), (W, y)], fill=(255, 255, 255), width=1)
    img = Image.blend(img, grid, 0.07)

    # --- ground is final, draw on it
    d = ImageDraw.Draw(img)

    for i, (y, col) in enumerate(((104, BLUE), (196, GOLD), (598, BLUE), (622, GOLD))):
        x1 = 150 + i * 46
        d.line([(-20, y), (x1, y), (x1 + 78, y - 62), (1220, y - 62)],
               fill=col, width=3, joint="curve")
        d.ellipse([x1 + 70, y - 70, x1 + 86, y - 54], outline=col, width=3)

    mark = Image.open(ROOT / "public/brand/zeizzlabs-mark.png").convert("RGBA")
    mark = mark.resize((176, 176), Image.LANCZOS)
    img.paste(mark, (84, 142), mark)

    word = Image.open(ROOT / "public/brand/zeizzlabs-wordmark.png").convert("RGBA")
    wh = 86
    word = word.resize((round(wh * word.width / word.height), wh), Image.LANCZOS)
    img.paste(word, (286, 188), word)

    d.text((288, 296), "D I G I T A L   C R E A T I O N   &   I N N O V A T I O N",
           font=font(19), fill=GOLD)
    d.text((84, 396), "Everything digital.", font=font(64), fill=TEXT)
    d.text((84, 476), "Endless possibilities.", font=font(64), fill=SKY)

    for x in range(W):
        t = x / W
        d.line([(x, H - 7), (x, H)],
               fill=tuple(round(BLUE[i] + (GOLD[i] - BLUE[i]) * t) for i in range(3)))
    return img


if __name__ == "__main__":
    out = ROOT / "public/brand/og-image.jpg"
    build().save(out, quality=88, optimize=True, progressive=True)
    print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")
