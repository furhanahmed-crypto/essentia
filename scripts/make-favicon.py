#!/usr/bin/env python3
"""Crop the Essentia floral mark from logo-square and write favicon assets."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "brand" / "logo-square.png"
APP = ROOT / "app"
LOGO = ROOT / "public" / "images" / "logo"
SAGE = (121, 167, 151)
CREAM = (248, 246, 242)


def extract_mark(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    op = out.load()
    minx, miny, maxx, maxy = w, h, 0, 0

    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            dist = math.sqrt((r - SAGE[0]) ** 2 + (g - SAGE[1]) ** 2 + (b - SAGE[2]) ** 2)
            if dist > 28:
                op[x, y] = (r, g, b, 255)
                minx, miny = min(minx, x), min(miny, y)
                maxx, maxy = max(maxx, x), max(maxy, y)

    opaque = [
        sum(1 for x in range(minx, maxx + 1) if op[x, y][3] > 20)
        for y in range(miny, maxy + 1)
    ]
    mid_start = miny + int((maxy - miny) * 0.35)
    mid_end = miny + int((maxy - miny) * 0.70)
    best_y, best_span, y = mid_start, 0, mid_start
    while y <= mid_end:
        if opaque[y - miny] < (maxx - minx) * 0.02:
            start = y
            while y <= mid_end and opaque[y - miny] < (maxx - minx) * 0.02:
                y += 1
            span = y - start
            if span > best_span:
                best_span, best_y = span, start + span // 2
        else:
            y += 1

    mark = out.crop((minx, miny, maxx + 1, best_y))
    return mark.crop(mark.getbbox())


def make_square(mark: Image.Image, size: int, pad_ratio: float = 0.14) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (*SAGE, 255))
    max_side = int(size * (1 - 2 * pad_ratio))
    mw, mh = mark.size
    scale = min(max_side / mw, max_side / mh)
    nw, nh = max(1, int(mw * scale)), max(1, int(mh * scale))
    resized = mark.resize((nw, nh), Image.Resampling.LANCZOS)
    rp = resized.load()
    for y in range(nh):
        for x in range(nw):
            r, g, b, a = rp[x, y]
            if a > 40:
                rp[x, y] = (*CREAM, a)
    canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2), resized)
    return canvas


def main() -> None:
    mark = extract_mark(SRC)
    APP.mkdir(parents=True, exist_ok=True)
    LOGO.mkdir(parents=True, exist_ok=True)

    sizes = {16: None, 32: APP / "icon.png", 48: None, 180: APP / "apple-icon.png", 192: LOGO / "icon-192.png", 512: LOGO / "icon-512.png"}
    built: dict[int, Image.Image] = {}
    for size, path in sizes.items():
        img = make_square(mark, size)
        built[size] = img
        if path:
            img.save(path, "PNG")
            print(f"wrote {path.relative_to(ROOT)} {img.size}")

    make_square(mark, 512).save(LOGO / "favicon-source.png", "PNG")
    built[16].save(
        APP / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[built[32], built[48]],
    )
    print("wrote app/favicon.ico")


if __name__ == "__main__":
    main()
