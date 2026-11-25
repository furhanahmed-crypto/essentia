import gsap from "gsap";

/** Assembled word width, as a share of the screen width. */
const WORD_WIDTH = 0.88;
/** Assembled letter height may not exceed this share of the stage height. */
const WORD_MAX_HEIGHT = 0.34;
/** Past this share of the sequence the prints are leaving, so choosing one is ignored. */
export const SCROLL_LOCK_PROGRESS = 0.02;

/**
 * Letter cadence: E launches only once every print has left the stage (the last exit ends at 4.6),
 * then each next letter follows `stagger` later; `flight` is each letter's own bounce.
 */
const LETTERS = { start: 4.7, stagger: 0.32, flight: 1.2 } as const;

type Exit = { start: number; x: number; y: number; rotation: number; scale: number };

/**
 * Exit choreography per slot. Each print leaves on its own diagonal — the outer pair first, the
 * inner pair a beat later, the front print last and upwards — so the fan opens like a deck being
 * scattered rather than everything sliding together. x / y are shares of the viewport.
 */
const EXITS: Record<"-2" | "-1" | "1" | "2", Exit> = {
  "-2": { start: 0.2, x: -1.05, y: -0.24, rotation: -26, scale: 0.72 },
  "-1": { start: 0.6, x: -0.92, y: 0.16, rotation: -18, scale: 0.78 },
  "1": { start: 0.8, x: 0.92, y: -0.18, rotation: 18, scale: 0.78 },
  "2": { start: 0.4, x: 1.05, y: 0.22, rotation: 24, scale: 0.72 },
};

const exitFor = (slot: number): Exit => EXITS[String(Math.max(-2, Math.min(2, slot))) as keyof typeof EXITS];

/**
 * Where every letter of the assembled word lands, read from layout (offset* values ignore
 * transforms, so this is safe to recompute mid-scroll on refresh). The word grows uniformly about
 * its own centre, so letter spacing is exactly preserved at the larger size.
 */
function wordGeometry(layer: HTMLElement, letters: HTMLElement[]) {
  const holder = letters[0].offsetParent as HTMLElement;
  const first = letters[0];
  const last = letters[letters.length - 1];
  const wordWidth = last.offsetLeft + last.offsetWidth - first.offsetLeft;
  const wordCentreX = first.offsetLeft + wordWidth / 2;
  const letterHeight = first.offsetHeight;
  const scale = Math.min((layer.clientWidth * WORD_WIDTH) / wordWidth, (layer.clientHeight * WORD_MAX_HEIGHT) / letterHeight);
  const centreY = layer.clientHeight / 2;
  return {
    scale,
    finalHeight: letterHeight * scale,
    dx: (letter: HTMLElement) => {
      const centreX = letter.offsetLeft + letter.offsetWidth / 2;
      return layer.clientWidth / 2 + (centreX - wordCentreX) * scale - centreX;
    },
    dy: (letter: HTMLElement) => centreY - (holder.offsetTop + letter.offsetTop + letter.offsetHeight / 2),
  };
}

/**
 * The hero's scroll choreography on an 11-unit timeline, scrubbed across the stage's track.
 * Screen-dependent values are functions, so `invalidateOnRefresh` recomputes them on resize.
 * Only transform and opacity are animated.
 *
 *  0 ─ 2     copy, meta, side editorial and marks lift away; the front print breathes forward
 *  0.2 ─ 4.4 the four back prints scatter on their own diagonals and leave (outer pair first)
 *  1.8 ─ 4.6 the front print rises off the top
 *  4.7 ─ 8   E · S · S · E · N · T · I · A — once every print has gone, each letter bounces up
 *            from beneath where the prints stood to the centre of the screen, growing as it goes,
 *            the next launching right behind it, until the full word stands assembled and centred
 *  6.8 ─ 9.7 the finale composes: sage bloom, the prints return as a collage behind the word, a
 *            ruled kicker above, the discipline line and two actions below, a facts strip
 *  9.7 ─ 11  hold. After the track ends the stage scrolls away while the word layer (sticky for
 *            the whole section) keeps the composition centred; the collage drifts on through the
 *            tail (`buildHeroTail`), then the section's end carries everything off.
 */
export function buildHeroScroll(tl: gsap.core.Timeline, section: HTMLElement): void {
  const q = gsap.utils.selector(section);
  const vw = () => window.innerWidth;
  const vh = () => window.innerHeight;

  // 1 · copy and chrome make way; the side columns part outwards
  tl.to(q(".hero-copy, .hero-meta"), { autoAlpha: 0, y: -36, duration: 2, ease: "power2.in" }, 0)
    .to(q(".hero-edit-left"), { autoAlpha: 0, x: -48, duration: 1.8, ease: "power2.in" }, 0)
    .to(q(".hero-edit-right"), { autoAlpha: 0, x: 48, duration: 1.8, ease: "power2.in" }, 0)
    .to(q(".hero-marks"), { autoAlpha: 0, scale: 1.15, duration: 2, ease: "power2.in" }, 0);

  // 2 · prints leave by slot (read from the DOM, so any stacking order exits correctly)
  for (const node of q(".hero-frame")) {
    const frame = node as HTMLElement;
    const slot = Number(frame.dataset.slot ?? 0);
    if (slot === 0) {
      tl.to(frame, { scale: 1.05, duration: 1.6, ease: "sine.inOut" }, 0).to(
        frame,
        { y: () => -vh() * 1.15, rotation: 4, scale: 0.9, duration: 2.8, ease: "power2.in" },
        1.8,
      );
      continue;
    }
    const exit = exitFor(slot);
    tl.to(
      frame,
      { x: () => vw() * exit.x, y: () => vh() * exit.y, rotation: exit.rotation, scale: exit.scale, duration: 3.6, ease: "power2.in" },
      exit.start,
    );
  }

  // 3 · the set: arch opens and dissolves, key light lifts, floor fades, beams drift, seal turns
  tl.to(q(".hero-bg-arch"), { scale: 1.35, autoAlpha: 0, duration: 4.4, ease: "power1.in" }, 0.3)
    .to(q(".hero-bg-key"), { yPercent: -18, autoAlpha: 0.35, duration: 5, ease: "sine.inOut" }, 0)
    .to(q(".hero-bg-floor"), { autoAlpha: 0, duration: 2.4, ease: "power1.in" }, 0.6)
    .to(q(".hero-bg-beams"), { xPercent: 8, duration: 8, ease: "none" }, 0)
    .to(q(".hero-seal"), { rotation: 160, duration: 1.8, ease: "none" }, 0);

  // 4 · the letters: one after another, each bounces up to the centre and grows into place
  const layer = q(".hero-word-layer")[0] as HTMLElement;
  const letters = q(".hero-letter") as HTMLElement[];
  const geometry = () => wordGeometry(layer, letters);
  letters.forEach((letter, index) => {
    const at = LETTERS.start + index * LETTERS.stagger;
    tl.to(letter, { x: () => geometry().dx(letter), duration: LETTERS.flight, ease: "power3.out" }, at)
      .to(letter, { y: () => geometry().dy(letter), duration: LETTERS.flight, ease: "back.out(1.9)" }, at)
      .to(letter, { scale: () => geometry().scale, transformOrigin: "50% 50%", duration: LETTERS.flight, ease: "power3.out" }, at);
  });

  // 5 · the finale composes around the word: bloom, kicker above, line and actions below, the
  //     prints returning as a collage behind, the facts strip along the foot — then hold
  const half = () => geometry().finalHeight / 2;
  tl.to(q(".hero-glow"), { opacity: 1, duration: 2.6, ease: "sine.inOut" }, 6.8)
    .fromTo(
      q(".hero-scatter"),
      { autoAlpha: 0, scale: 0.7, y: 40 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 1.6, ease: "power3.out", stagger: { each: 0.15, from: "random" } },
      7.4,
    )
    .fromTo(q(".hero-tagline"), { autoAlpha: 0, y: () => half() + 52 }, { autoAlpha: 1, y: () => half() + 28, duration: 1.2, ease: "power2.out" }, 7.8)
    .fromTo(
      q(".hero-finale-kicker"),
      { autoAlpha: 0, y: () => -half() - 20, yPercent: -100 },
      { autoAlpha: 1, y: () => -half() - 40, yPercent: -100, duration: 1.2, ease: "power2.out" },
      7.9,
    )
    .fromTo(q(".hero-finale-actions"), { autoAlpha: 0, y: () => half() + 100 }, { autoAlpha: 1, y: () => half() + 78, duration: 1.2, ease: "power2.out" }, 8.3)
    .fromTo(q(".hero-finale-foot"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" }, 8.5)
    .to({}, { duration: 1.4 }, 9.7);
}

/**
 * During the tail (the stage gone, the word held at centre) the collage keeps a slow parallax:
 * each print drifts up by its own depth and turns a touch, so the held moment never feels frozen.
 */
export function buildHeroTail(tl: gsap.core.Timeline, section: HTMLElement): void {
  const q = gsap.utils.selector(section);
  for (const node of q(".hero-scatter")) {
    const print = node as HTMLElement;
    const depth = Number(print.dataset.depth ?? 0.5);
    tl.to(print, { y: () => -window.innerHeight * 0.14 * depth, rotation: depth * 6 - 3, duration: 1 }, 0);
  }
}
