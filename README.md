# Essentia — The Salon Lounge

Static marketing website for a premium unisex salon in Attapur, Hyderabad.

## Stack

Next.js 16 · React 19 · Bun · Tailwind CSS 4 · shadcn · Framer Motion

## Setup

```bash
bun install
bun run dev
```

```bash
bun run lint
bun run typecheck
bun run build
```

## Brand

All brand fields live in [`brand.json`](brand.json). Import via `@/constants/brand`.

## Content

- Services: `constants/services/services.json` (no prices)
- Packages: `constants/packages/packages.json` (no prices)
- Menu source: Essentia menu PDF (15-09-2025)

## Logos

```bash
python3 scripts/process-logo.py
```

Source files: `assets/brand/logo.png`, `assets/brand/logo-square.png`.
