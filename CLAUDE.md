# Essentia

Marketing site for Essentia — The Salon Lounge (Attapur). Engineering patterns follow the Eat Rrite marketing site; the visual design is Essentia's own ("The Atelier Edit", `docs/DESIGN.md`) and must not borrow Eat Rrite compositions. Do not modify Eat Rrite.

## Rules

- Never display prices anywhere.
- Brand fields come from `brand.json` via `constants/brand.ts`.
- No booking, payments, auth, admin or database.
- Keep files focused; strict TypeScript; no `any`.
- Build sections from the editorial primitives (`components/shared/editorial/`: `Band`, `Label`, `Cta`) and give each section its own composition.
- Instagram: https://www.instagram.com/essentiasalonlounge/ — download stills/reels into `public/images/instagram/` and `public/videos/instagram/` when needed.

## Docs

See `docs/REQUIREMENTS.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/TASKS.md`.
