# Architecture

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Bun, Tailwind CSS 4, shadcn (base-nova), Framer Motion
- Static JSON content under `constants/`

## Layout

| Path | Role |
| --- | --- |
| `app/(site)/` | Public marketing routes and shell |
| `components/layout/` | Header (+ mobile menu), footer, `PageHero`, quick-contact bar |
| `components/home/` | Homepage sections (Cover, Statement, MenuIndex, Lookbook, Rituals, Lounge, GuestNotes, Questions) |
| `components/services/` | Services atlas and chapter blocks (overview, treatment menu, next chapters) |
| `components/packages/` | Everyday sets ledger and occasion rituals |
| `components/about/`, `components/contact/` | Page-specific sections |
| `components/shared/editorial/` | Design primitives: `Band`, `Label`, `Cta` |
| `components/shared/VisitBand.tsx` | Closing band used on every page |
| `components/motion/` | `Appear` (scroll reveal), `MaskReveal` (photo wipe), `HeroMotion` |
| `constants/` | Brand helpers, routes, page copy, services, packages |
| `brand.json` | Brand source of truth |

## Data flow

Pages are React Server Components. They import JSON from `constants/` and compose section components. Client islands are limited to header, carousels, theme toggle, contact form and motion.

## Services

`constants/services/services.json` drives `/services` and `/services/[slug]` via `generateStaticParams`; read it through `constants/services/index.ts` (`SERVICES`, `findService`, `treatmentCount`). Packages live in `constants/packages/packages.json` with no price fields, read through `constants/packages/index.ts`.
