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
| Pale Sage | `#D8E3DC` | `bg-mist` — image placeholders only; never a section ground |
| Muted Sage | `#79A797` | `bg-primary` — accents only (hover fills, rules, dots, the hero bloom); never a section ground |
| Deep Sage | `#5F8A7B` | `accent-deep` — accessible sage text, small marks |
| Charcoal | `#343330` | Ink, and the night bands — hero, services, packages, testimonials, footer |

Sections never sit on a green ground: grounds are only `bg-background`, `bg-card` or the night
band. Sage stays an accent colour.

Home rhythm: **night hero** → ivory story → **night services** → cream gallery → **photo split** →
ivory bento → cream journey → **night notes** → cream FAQ → ivory finale → **night footer**.

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

1. *Hero — scroll-driven, five prints* (`components/home/hero/`). One tall section, three layers;
   the page always scrolls natively (Lenis untouched, no pin, no scroll lock):
   - `.hero-track` (280svh mobile, 360svh desktop) holds the sticky stage — prints, copy, side
     furniture, set. One scrubbed GSAP timeline (`heroTimeline.ts`) runs over this track.
   - A full-section absolute layer whose sticky child `.hero-word-layer` holds ESSENTIA, the sage
     bloom and the discipline line. It stays centred after the stage has gone and is carried off
     by the section's own bottom edge (a sticky element inside an absolute layer, so the release
     is native and exact).
   - `.hero-tail` (90svh) — runway during which the stage scrolls away behind the held word.
   *Prints* (`HeroFrame`): five editorial prints in a fan of slots (0 front, ±1, ±2; geometry in
   `heroSlots.ts`, in frame widths, scaled by `--frame-w`, `--spread`, centred at `--fan-y`; those
   variables live on the section so both layers share them). Cream mat, caption margin, floating
   keyline, layered shadow, a depth veil per slot.
   *Re-stacking* (`heroSwap.ts`): one GSAP timeline per click tweens the `--slot-*` / `--nudge-*`
   custom properties that `.hero-slot` reads. The prints in front of the chosen one ease aside
   (`power2.out`, 0.5s) while the chosen print lifts and drifts in on a slow-in curve; at 0.32s,
   once nothing overlaps it, z-index switches in one frame; then every print glides to its new
   slot on one shared `power2.inOut` curve (≈ cubic-bezier(.65,0,.35,1), ~1.2s). Never locked:
   each click kills the running swap and starts the next from the prints' current positions, so
   rapid choices retarget seamlessly. React writes the pose vars only on first render
   (`restSlot`); after that the timeline owns them. Choices are ignored once scrolling starts.
   Lenis sets `gsap.ticker.lagSmoothing(0)`, so a throttled background tab can fast-forward a
   swap — expected, not a bug.
   *Editorial furniture* (`HeroEdit`, xl+): "The Finish Edit" index left; the front look, number,
   a scroll-turned seal (hidden under 800px tall) and coordinates right; registration marks.
   *Set* (`HeroBackdrop`, on the stage): static gradient key light, arched-mirror outline, floor
   shadow; they move only with scroll.
   *Sky* (`HeroSky`, `heroStars.ts`): a section-wide sticky layer behind the stage, so it stays
   with the held word through the finale. Rim lights, beams, a faint nebula wash, then three
   star depths (far / mid / near): each is one tiled background of tiny radial gradients
   (seeded, so server and client match), painted once on an oversized layer. Each depth rises
   continuously (`hero-sky-flow`: a linear CSS loop of exactly one tile height, so it never seams;
   6 / 12 / 22 px/s at rest), sways on an alternating CSS drift (26–40s) and parallaxes on scroll
   by its own factor (0.2 / 0.5 / 1 × 16% of the viewport over the section). Scroll speed drives
   the flow (`heroSkySpeed.ts`): the animations' `playbackRate` follows ScrollTrigger velocity
   (1 + v/320, clamped −5…8 — scrolling back briefly reverses it), then eases back to 1 over
   ~1.6s, so the stars stay on the compositor and never jump. Over them, 26 tiny twinkling stars and six brighter
   glints (dot, halo, hairline cross) placed in the margins, each on its own cycle. Grain and
   vignette on top. No canvas, filters or JS loops; transform/opacity only; every sky animation
   pauses while the hero is off-screen (`is-sky-live`) and is off under reduced motion.
   *Sequence*: copy and furniture part → back prints scatter by slot → front print rises off →
   E·S·S·E·N·T·I·A, which rests at caption size directly under the fan, launch one after another:
   each bounces up to the exact centre of the screen while growing, landing in place so the full
   word assembles at ~90% of the width with its letter spacing intact (targets computed from
   layout in `wordGeometry`). E launches only after every print has left (timeline 4.7 of 11).
   *Finale composition* (`HeroFinale`): sage bloom; the five prints return as a loose collage
   around the word (`.hero-scatter`, each with a depth); a ruled kicker above the word; the
   discipline line, an "Explore the menu" pill and a WhatsApp link below; a facts strip
   (disciplines, unisex, hours, address; hidden on phones) and a centred scroll cue along the
   foot → hold; stage scrolls away; the word holds the centre through the tail while the collage
   drifts by depth (`buildHeroTail`), then everything leaves with the section.
   *Header over the hero*: the section carries `data-header-dark`; `useOverDarkSection` (one
   IntersectionObserver on the header strip) switches the sticky header to dark glass
   (`bg-night/95`, light logo, inverse links, cream Enquire pill) while the hero is beneath it,
   in both themes, and back to ivory after.
   Reduced motion: one static screen with the word under the prints; prints still re-stack.
2. *Story* — pinned: the three-line brand statement lights up line by line while three photos
   drift at different depths; the three facts land in the last frame.
3. *Services* — night stage: a vertical index of the five families (ARIA tablist; hover, click,
   arrows) beside a large photo that wipes in from the right over the last, with name, summary,
   signature treatments and a link. Mobile: a snap row of photo tiles above the details.
4. *Gallery* — client reels only. four masonry columns of mixed proportions (reels 9:16, stills 4:5 and square)
   with vertical captions; columns drift at different speeds; reels play only while visible.
   Instagram stills are small, so frames never exceed ~360px wide.
4b. *Before & after* — ivory: headline + guest thumbnails left, a drag-to-compare frame right
   (`components/shared/BeforeAfterSlider`, a native range input over two stacked photos, so touch
   and arrow keys work). Also shown on the Hair chapter.
5. *Occasions* — Bride and Groom as two full-height photographs side by side; the half you
   point at widens. Tier names from `packages.json`, WhatsApp enquiry per side, no prices.
6. *Why Essentia (bento)* — ivory ground. A 12-column bento: a cream intro card (hairline border), one tall photo
   tile across both rows and three square tiles (`components/home/manifesto/`). Each tile is a
   link; hovering or focusing zooms the photo, deepens the scrim, slides in an arrow and lifts the
   title and sentence (grid-rows 0fr → 1fr). Touch screens show the sentence without hover. Tiles
   wipe up once on scroll.
7. *Journey* — cream (`bg-card`), pinned horizontal walk through the four movements, each framed
   differently (contact type, portrait, arch, glowing circle), with a progress line. Mobile: a
   vertical timeline.
8. *Notes* — night: large photo with wipe transitions, the next guest tucked behind, the quote
   in Bodoni italic under an oversized mark; prev/next, counter, thumbnails, autoplay that
   pauses on hover/focus.
9. *FAQ* — sticky poster title left, Base UI accordion right; the open item becomes an ivory panel.
10. *Finale* — ivory ground under a hairline, "Leave glowing." in ink at mega scale, contact
    details, and a magnetic round WhatsApp button in solid ink. The footer below ends with the full-width wordmark.

**Inner pages** keep their `PageHero`-led editorial compositions and pick up the new fonts.

## Imagery

Client media (shot in the lounge) comes first; Unsplash stock (free licence) only fills subjects the
client has not supplied yet (makeup, bridal, grooming, products).

| Folder | Contents | Used in |
| --- | --- | --- |
| `public/images/salon/` | `blowdry-finish.jpg` — the lounge, real guest | Hero, Hair chapter |
| `public/images/nails/` | `gel-manicure-nude.jpg` | Story, Nail chapter |
| `public/images/finishes/` | Poster frames for each reel (same names as the videos) | Gallery posters, hero inset, bento, notes, chapter collages |
| `public/videos/finishes/` | 8 client reels: `hair-*`, `nails-gel-manicure`, `skin-mens-facial` (H.264, 540×960, muted loop) | Gallery ("Recent finishes") |
| `public/images/before-after/` | `smoothing-NN-before.jpg` / `smoothing-NN-after.jpg`, cropped from the client's side-by-side collages and matched in size | Before & after section (home, Hair chapter) |

Adding media: name files `<service>-<look>` in kebab case; convert `.mov` with
`avconvert -p Preset960x540` (QuickTime/HEVC does not play in every browser) and keep a poster in
`images/finishes/` with the same name. New before/after pairs go in `constants/home/content.json`
→ `transformations.pairs`.

- `about/salon-interior.jpg` is 640×480 with baked-in letterbox bars — only use it small and
  cropped 16:9.
- Consistent treatment: natural colour, no filters, `object-cover` with deliberate focal points.

## Logo

Transparent horizontal mark: `public/images/logo/logo-horizontal-dark.png` (light ground) and
`logo-horizontal.png` (dark ground). Processed via `scripts/process-logo.py`.
