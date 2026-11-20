# Design — "The Atelier Edit"

Essentia's visual language is its own. Eat Rrite stays an engineering reference only (file
structure, data flow, motion utilities). No Eat Rrite section composition, card style, pill
header, script eyebrow or floating illustration is reused.

## Concept

Essentia is presented like a beauty atelier's printed lookbook: large editorial type, generous
margins, photographs set into the page rather than boxed in cards, and one recurring motif taken
from the salon itself — **the arched mirror** (the lounge's oval LED mirrors). Arches frame the
key photographs; everything else is square-cornered with hairline rules.

Tone: luxury without ornament, calm without emptiness. Each section has its own composition;
consistency comes from the type system, the hairline grid, the arch, and the colour rhythm.

## Palette (unchanged brand colours, new roles)

| Token | Hex | Role |
| --- | --- | --- |
| Warm Ivory | `#EEEAE4` | Page ground (`bg-background`) |
| Soft Cream | `#F8F6F2` | Raised ground, forms (`bg-card`) |
| Pale Sage | `#D8E3DC` | Feature bands — lookbook, visit (`bg-beige-deep` / `bg-mist`) |
| Muted Sage | `#79A797` | Accent: index numbers, active states, primary CTA (`primary`) |
| Deep Sage | `#5F8A7B` | Accessible sage text on light grounds (`accent-deep`) |
| Charcoal | `#343330` | Ink, and the "night" bands — principles, footer (`bg-night`) |

Dark theme: ivory → deep green-charcoal, cream → lifted charcoal, sage brightens; night bands go
near-black so they still read as a deliberate change of light.

Rhythm on the home page: ivory → ivory → cream → pale sage → ivory → **night** → ivory → cream →
pale sage → **night footer**. Never two identical bands back to back without a rule.

## Typography

- **Libre Baskerville** — display and titles. Big (up to ~7rem), tight leading, with *italic*
  for the emotional word in a headline (`*word*` in JSON → `<em>`).
- **Merriweather** — body, light weight, relaxed leading.
- **Index labels** — small uppercase Merriweather, 0.22em tracking, prefixed with a sage number:
  `01 — The Menu`. Replaces handwritten eyebrows everywhere.
- **Caveat** — reserved for one signature only: the tagline in the closing band.

Utilities: `type-display`, `type-title`, `type-heading`, `type-label`, `type-lede`.

## Shape & surface

- Corners: square. The arch (`rounded-t-full`) is the only curve, used on hero, story and
  package photographs.
- Rules: 1px hairlines (`border-line`) instead of cards and shadows.
- Buttons: rectangular. Solid charcoal/sage `Cta`, or an underlined text link with an arrow
  that slides on hover. No 3D gradients, no pills on the marketing site.

## Motion

- Photographs open with a clip-path wipe (`MaskReveal`), text rises softly (`Appear`).
- Service index: hovering a row reveals that service's photograph beside the list.
- Lookbook: native horizontal scroll with snap and arrow controls.
- Everything respects `prefers-reduced-motion`.

## Page compositions

**Home**
1. *Cover* — split: headline + lede on ivory, tall arched photograph with an overlapping
   inset image, index of the six disciplines along the bottom edge.
2. *Statement* — full-width manifesto sentence with small inline arch images, then three facts
   divided by vertical rules.
3. *The Menu* — sticky heading left; six large numbered rows right; hover previews the photo.
4. *Lookbook* — pale-sage band, horizontal strip of mixed-ratio photographs with captions.
5. *Rituals* — packages teaser: arched bridal photograph beside a ledger of collections.
6. *The Lounge* — night band: the real salon interior, four principles (I–IV), and the visit in
   four movements.
7. *Guest notes* — one large quote at a time, numbered selector, contextual photograph.
8. *Questions* — heading + contact prompt left, hairline accordion right.
9. *Visit* — closing band shared by every page: signature line, address, hours, actions.

**Inner pages** open with `PageHero` (breadcrumb, label, oversized title, lede, optional
cinematic photo strip) instead of a dark photo banner.

- *Services* — asymmetric editorial grid of six chapters with varied spans and ratios.
- *Service detail* — overview with a two-photo collage; treatments laid out like a printed menu
  with a sticky group index; "next chapters" row.
- *Packages* — everyday sets as a two-column ledger (her / him); occasion rituals as tier
  columns beside an arched photograph.
- *About* — story with drop cap and arch collage; promise on a night band.
- *Contact* — oversized phone/email typography beside a minimal underline form.

## Imagery

- The two real lounge photographs appear once each (Lounge band, About).
- Treatment photography comes from Unsplash (free licence), one distinct photo per role — see
  `public/images/` folders `cover`, `services`, `lookbook`, `rituals`, `notes`, `atmosphere`.
- Consistent treatment: natural colour, no filters, `object-cover` with deliberate focal points.

## Logo

Transparent horizontal mark: `public/images/logo/logo-horizontal-dark.png` (light ground) and
`logo-horizontal.png` (dark ground). Processed via `scripts/process-logo.py`.
