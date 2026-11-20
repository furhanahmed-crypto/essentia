#!/usr/bin/env python3
"""Remove solid sage background from Essentia logos and crop tightly."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "logo"
CHARCOAL = (52, 51, 48)
SAGE = (121, 167, 151)


def remove_sage_and_crop(
    src: Path,
    dest: Path,
    *,
    tolerance: float = 26,
    pad_pct: float = 0.02,
) -> Image.Image:
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    pixels = im.load()
    samples = [
        pixels[2, 2][:3],
        pixels[w - 3, 2][:3],
        pixels[2, h - 3][:3],
        pixels[w - 3, h - 3][:3],
        pixels[w // 2, 2][:3],
        pixels[2, h // 2][:3],
    ]
    br = sum(s[0] for s in samples) // len(samples)
    bg = sum(s[1] for s in samples) // len(samples)
    bb = sum(s[2] for s in samples) // len(samples)

    out = Image.new("RGBA", (w, h))
    op = out.load()
    minx, miny, maxx, maxy = w, h, 0, 0

    for y in range(h):
        for x in range(w):
            r, g, b, _ = pixels[x, y]
            dist = math.sqrt((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2)
            if dist <= tolerance:
                op[x, y] = (r, g, b, 0)
            elif dist <= tolerance * 1.6:
                fade = int(255 * (dist - tolerance) / (tolerance * 0.6))
                fade = max(0, min(255, fade))
                op[x, y] = (r, g, b, fade)
                if fade > 8:
                    minx, miny = min(minx, x), min(miny, y)
                    maxx, maxy = max(maxx, x), max(maxy, y)
            else:
                op[x, y] = (r, g, b, 255)
                minx, miny = min(minx, x), min(miny, y)
                maxx, maxy = max(maxx, x), max(maxy, y)

    pad_x = int((maxx - minx) * pad_pct)
    pad_y = int((maxy - miny) * pad_pct)
    box = (
        max(0, minx - pad_x),
        max(0, miny - pad_y),
        min(w, maxx + 1 + pad_x),
        min(h, maxy + 1 + pad_y),
    )
    cropped = out.crop(box)
    OUT.mkdir(parents=True, exist_ok=True)
    cropped.save(dest, "PNG")
    print(f"{src.name} -> {dest.name} {cropped.size}")
    return cropped


def recolor(src: Image.Image, rgb: tuple[int, int, int], dest: Path) -> None:
    px = src.load()
    w, h = src.size
    out = Image.new("RGBA", (w, h))
    op = out.load()
    for y in range(h):
        for x in range(w):
            _, _, _, a = px[x, y]
            op[x, y] = (0, 0, 0, 0) if a == 0 else (*rgb, a)
    out.save(dest, "PNG")
    print(f"  recolor -> {dest.name}")


def main() -> None:
    brand_dir = ROOT / "assets" / "brand"
    horizontal = remove_sage_and_crop(brand_dir / "logo.png", OUT / "logo-horizontal.png")
    mark = remove_sage_and_crop(brand_dir / "logo-square.png", OUT / "logo-mark.png", pad_pct=0.03)
    recolor(horizontal, CHARCOAL, OUT / "logo-horizontal-dark.png")
    recolor(horizontal, SAGE, OUT / "logo-horizontal-sage.png")
    recolor(mark, CHARCOAL, OUT / "logo-mark-dark.png")


if __name__ == "__main__":
    main()
