# Design — "The Lounge, Directed"

Essentia's visual language is its own. Eat Rrite stays an engineering reference only (file
structure, data flow, motion utilities). No Eat Rrite section composition, card style, pill
header, script eyebrow or floating illustration is reused.

## Concept

The home page is art-directed like a beauty campaign, not a single editorial template. Every
section has its own layout, ground, image treatment, type scale and motion, and no composition
repeats back to back: cinematic, then pinned, then interactive, then gallery, then full-bleed
photography, then pure type.

Tone: premium beauty, calm expertise, contrast between charcoal, sage and cream. The italic
sage word, the small uppercase label and the hairline divider are retired as defaults — each
appears at most a couple of times on the page.

## Palette (tokens are immutable)

The colour tokens in `app/globals.css` (`:root` / `.dark` HSL variables, `--er-*` aliases,
`--es-*` editorial layer, `band-night`) must not be changed, renamed or regenerated. Sections
only combine them differently.

| Token | Hex | Used as |
| --- | --- | --- |
| Warm Ivory | `#EEEAE4` | Page ground (`bg-background`) — story |
| Soft Cream | `#F8F6F2` | Raised ground (`bg-card`) — gallery, FAQ |
| Pale Sage | `#D8E3DC` | `bg-mist` — the visit journey, open FAQ items |
| Muted Sage | `#79A797` | `bg-primary` — the full-sage bento, finale gradient |
| Deep Sage | `#5F8A7B` | `accent-deep` — accessible sage text, finale gradient midpoint |
| Charcoal | `#343330` | Ink, and the night bands — hero, services, packages, testimonials, footer |

On sage grounds text is charcoal (`text-ink`) in light mode and `text-primary-foreground` in dark
mode, never cream (contrast).

Home rhythm: **night hero** → ivory story → **night services** → cream gallery → **photo split** →
**sage bento** → pale-sage journey → **night notes** → cream FAQ → sage-to-night finale →
**night footer**.

## Typography

- **Bodoni Moda** (`--font-heading`) — high-contrast display serif, used at poster scale.
- **Manrope** (`--font-body`, `--font-sans`) — body, UI, buttons and kickers.
- **Caveat** — reserved for the one signature line ("We don't do average…").

Home utilities: `type-mega` (wordmarks, "Leave glowing."), `type-poster`
(section statements), `type-stage` (hero headline, service names), `type-kicker` (small UI text).
The older `type-display / title / heading / label / lede` remain for the inner pages.

## Shape & surface

- Mixed shapes with intent: full-bleed photography, tilted frames, the arch (the lounge mirror)
  and a glowing circle in the journey, round seal CTAs.
- Buttons: pills and round seals on the home page (`rounded-full`), solid charcoal or sage.
- Text over photography always sits on `scrim-night` (a gradient built from `--es-night`).

## Motion

All timelines use GSAP + ScrollTrigger with the Lenis bridge (`components/motion/SmoothScroll`).

- Set up inside `gsap.matchMedia()` and **revert it on cleanup** (`return () => mm.revert()`),
  otherwise React Strict Mode captures half-played `from()` values.
- Pinned / scrubbed sequences run only at `DESKTOP_MOTION` (`constants/motion.ts`: ≥1024px, no
  reduced motion). Pinned sections add an `is-pinned` class; their fixed viewport height and
  stacked positioning apply only under that class, so the static fallback reads naturally.
- Pins start under the sticky header via `pinStart` (`utils/headerOffset.ts`).
- `ScrollTriggerSync` (mounted by `SmoothScroll`) re-measures every trigger when the document
  height changes after load (images, fonts, hot reload), so pins never start late and swallow
  a screen of scroll.
- Mobile and reduced-motion visitors get stacked, static layouts; reels never autoplay for them.

## Home compositions (`components/home/<section>/`)

1. *Hero* — full-bleed salon photo on night, headline and lede bottom-left, a matted inset
   portrait (cream passe-partout, hairline keyline, ruled caption), a round cream "Explore" seal
   with sage type, and the spaced ESSENTIA wordmark at poster scale along the bottom edge. The
   wordmark uses a full-em line box (`HeroWordmark`) so its capitals are never clipped. Intro:
   photo un-clips and settles, letters rise, details fade in.
2. *Story* — pinned: the three-line brand statement lights up line by line while three photos
   drift at different depths; the three facts land in the last frame.
3. *Services* — night stage: a vertical index of the five families (ARIA tablist; hover, click,
   arrows) beside a large photo that wipes in from the right over the last, with name, summary,
   signature treatments and a link. Mobile: a snap row of photo tiles above the details.
4. *Gallery* — four masonry columns of mixed proportions (reels 9:16, stills 4:5 and square)
   with vertical captions; columns drift at different speeds; reels play only while visible.
   Instagram stills are small, so frames never exceed ~360px wide.
5. *Occasions* — Bride and Groom as two full-height photographs side by side; the half you
   point at widens. Tier names from `packages.json`, WhatsApp enquiry per side, no prices.
6. *Why Essentia (bento)* — full sage. A 12-column bento: a cream intro card, one tall photo
   tile across both rows and three square tiles (`components/home/manifesto/`). Each tile is a
   link; hovering or focusing zooms the photo, deepens the scrim, slides in an arrow and lifts the
   title and sentence (grid-rows 0fr → 1fr). Touch screens show the sentence without hover. Tiles
   wipe up once on scroll. *Replaced the pinned word-by-word sequence, which opened on a 15%
   ghost word and read as an empty sage screen for the first part of the pin.*
7. *Journey* — pale sage, pinned horizontal walk through the four movements, each framed
   differently (contact type, portrait, arch, glowing circle), with a progress line. Mobile: a
   vertical timeline.
8. *Notes* — night: large photo with wipe transitions, the next guest tucked behind, the quote
   in Bodoni italic under an oversized mark; prev/next, counter, thumbnails, autoplay that
   pauses on hover/focus.
9. *FAQ* — sticky poster title left, Base UI accordion right; the open item becomes a sage panel.
10. *Finale* — sage melting into night, "Leave glowing." at mega scale, contact details, and a
    magnetic round WhatsApp button. The footer below ends with the full-width wordmark.

**Inner pages** keep their `PageHero`-led editorial compositions and pick up the new fonts.

## Imagery

- Treatment photography comes from Unsplash (free licence); lookbook stills and reels come from
  the salon's Instagram (`public/images/lookbook`, `public/videos/instagram`).
- `about/salon-interior.jpg` is 640×480 with baked-in letterbox bars — only use it small and
  cropped 16:9.
- Consistent treatment: natural colour, no filters, `object-cover` with deliberate focal points.

## Logo

Transparent horizontal mark: `public/images/logo/logo-horizontal-dark.png` (light ground) and
`logo-horizontal.png` (dark ground). Processed via `scripts/process-logo.py`.
