#!/usr/bin/env python3
"""
Generate the site's abstract brand artwork.

The reference studios run 30-50 real images each; this site had two. Rather
than ship empty frames, this renders brand-consistent abstract compositions —
gradient field, soft glows, orthogonal circuit traces with terminal pads, a
technical grid and grain — one per service pillar and per project.

These are real files in public/media and are meant to be REPLACED with
photography, UI shots or 3D renders when they exist. The components read
whatever is at the path, so swapping a file needs no code change.

    python3 scripts/generate-art.py
"""
from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "media"

# Frames on this site are wide (roughly 3:1 for the full-bleed headers), so the
# source must be wide too. A 4:3 source in a 3:1 frame is cropped so hard by
# object-cover that only a magnified detail survives.
W, H = 2400, 1000
INK = (4, 6, 12)

# Brand palette, matching the CSS tokens.
BLUE_D, BLUE, SKY = (11, 66, 158), (30, 123, 255), (140, 196, 255)
GOLD_D, GOLD, GOLD_L = (163, 127, 66), (220, 184, 119), (236, 211, 160)
STEEL_D, STEEL = (61, 71, 89), (164, 179, 201)

PAIRS = {
    "blue": (BLUE_D, BLUE, SKY),
    "gold": (GOLD_D, GOLD, GOLD_L),
    "steel": (STEEL_D, STEEL, (205, 216, 232)),
}


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(dark, mid, light, angle=35.0):
    """Diagonal three-stop gradient over the ink ground."""
    img = Image.new("RGB", (W, H), INK)
    px = img.load()
    rad = math.radians(angle)
    dx, dy = math.cos(rad), math.sin(rad)
    denom = abs(dx) * W + abs(dy) * H
    for y in range(H):
        for x in range(0, W, 2):
            t = (x * dx + y * dy) / denom
            t = min(1.0, max(0.0, t))
            if t < 0.55:
                c = lerp(lerp(INK, dark, 0.85), mid, t / 0.55)
            else:
                c = lerp(mid, light, (t - 0.55) / 0.45)
            px[x, y] = c
            if x + 1 < W:
                px[x + 1, y] = c
    return img


def glow(img, cx, cy, r, colour, strength):
    """Additive soft light, drawn on its own layer then blurred."""
    layer = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=colour)
    layer = layer.filter(ImageFilter.GaussianBlur(r * 0.55))
    return Image.blend(img, Image.eval(layer, lambda v: min(255, v)), strength)


def shear_bands(img, rng, colour):
    """
    Large angled bands echoing the diagonal cut through the brand Z. These give
    each frame a composition instead of an even field of noise.
    """
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(rng.randint(2, 3)):
        x = rng.randint(-300, W)
        w = rng.randint(200, 520)
        skew = rng.randint(180, 340)
        light = rng.random() < 0.5
        fill = (255, 255, 255, rng.randint(10, 20)) if light else INK + (rng.randint(45, 85),)
        d.polygon(
            [(x, 0), (x + w, 0), (x + w - skew, H), (x - skew, H)],
            fill=fill,
        )
    layer = layer.filter(ImageFilter.GaussianBlur(2))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def traces(img, rng, colour, count=9):
    """
    Orthogonal circuit runs with terminal pads. Each run is drawn twice — a
    wide blurred pass for the glow, then a crisp pass on top — so the traces
    read as lit conductors rather than hairlines.
    """
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow_layer)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(count):
        y = rng.randint(40, H - 40)
        x = rng.choice([-40, W + 40])
        step = -1 if x > 0 else 1
        run = rng.randint(220, 520)
        pts = [(x, y)]
        for _ in range(rng.randint(2, 4)):
            x += step * run
            pts.append((x, y))
            y += rng.choice([-1, 1]) * rng.randint(70, 200)
            pts.append((x, y))
            run = rng.randint(120, 320)
        hot = rng.random() < 0.4          # a few runs are fully lit
        w = rng.choice([2, 3, 3, 4])
        a = rng.randint(190, 245) if hot else rng.randint(90, 150)
        gd.line(pts, fill=colour + (a // 2,), width=w + 8, joint="curve")
        d.line(pts, fill=colour + (a,), width=w, joint="curve")
        ex, ey = pts[-1]
        r = rng.choice([8, 11, 15])
        gd.ellipse([ex - r - 4, ey - r - 4, ex + r + 4, ey + r + 4],
                   outline=colour + (a // 2,), width=w + 5)
        d.ellipse([ex - r, ey - r, ex + r, ey + r], outline=colour + (255,), width=w)
        d.ellipse([ex - 2, ey - 2, ex + 2, ey + 2], fill=colour + (255,))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(9))
    img = Image.alpha_composite(img.convert("RGBA"), glow_layer)
    return Image.alpha_composite(img, layer).convert("RGB")


def grid(img, spacing=80, alpha=26):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for x in range(0, W, spacing):
        d.line([(x, 0), (x, H)], fill=(255, 255, 255, alpha))
    for y in range(0, H, spacing):
        d.line([(0, y), (W, y)], fill=(255, 255, 255, alpha))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def vignette(img, strength=0.95):
    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([W * 0.02, -H * 0.10, W * 0.98, H * 1.10], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(260))
    dark = Image.new("RGB", (W, H), INK)
    return Image.composite(img, Image.blend(img, dark, strength), mask)


def grain(img, amount=7):
    noise = Image.effect_noise((W, H), 26).convert("L")
    return Image.blend(img, Image.merge("RGB", (noise, noise, noise)), amount / 100)


def compose(seed: int, accent: str) -> Image.Image:
    rng = random.Random(seed)
    dark, mid, light = PAIRS[accent]
    img = gradient(dark, mid, light, angle=rng.uniform(20, 55))
    img = glow(img, rng.randint(300, 900), rng.randint(120, 400), 560, light, 0.30)
    img = glow(img, rng.randint(1400, 2100), rng.randint(600, 900), 520, dark, 0.22)
    img = shear_bands(img, rng, light)
    img = traces(img, rng, GOLD_L if accent != "gold" else SKY, count=rng.randint(9, 13))
    img = traces(img, rng, SKY if accent != "blue" else GOLD_L, count=rng.randint(6, 9))
    img = grid(img)
    img = vignette(img)
    # Push contrast and saturation last: the layered blurs flatten both, and a
    # frame that reads as a textured gradient is not an image.
    img = ImageEnhance.Contrast(img).enhance(1.22)
    img = ImageEnhance.Color(img).enhance(1.18)
    img = grain(img)
    return img


TARGETS = [
    # (filename, seed, accent)
    ("service-software-development", 11, "blue"),
    ("service-ai-intelligence", 22, "gold"),
    ("service-automation-workflows", 33, "blue"),
    ("service-design-branding", 44, "gold"),
    ("service-digital-products", 55, "steel"),
    ("service-cloud-infrastructure", 66, "blue"),
    ("service-data-analytics", 77, "steel"),
    ("service-digital-experiences", 88, "gold"),
    ("work-voice-reception", 101, "blue"),
    ("work-whatsapp-desk", 202, "gold"),
    ("work-helios-dashboard", 303, "steel"),
    ("work-aria-agent", 404, "blue"),
    ("about-studio", 505, "steel"),
    ("contact-signal", 606, "gold"),
]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, seed, accent in TARGETS:
        img = compose(seed, accent)
        path = OUT / f"{name}.jpg"
        img.save(path, quality=84, optimize=True, progressive=True)
        print(f"{path.relative_to(ROOT)}  {path.stat().st_size // 1024} KB")
    print(f"\n{len(TARGETS)} images written to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
