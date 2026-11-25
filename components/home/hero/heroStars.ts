/**
 * Deterministic star data for the hero sky. A seeded generator keeps the server render and the
 * client identical (no hydration drift) while the field still looks naturally scattered.
 *
 * The dense field is painted, not built from elements: each depth is one tiled background of tiny
 * radial gradients (painted once, then only moved by transform). Twinkle and glints are a few
 * dozen tiny spans, each animating its own opacity, so no large layer ever repaints.
 */

/** Small, fast, seeded PRNG (mulberry32). */
function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (value: number, digits = 2) => Number(value.toFixed(digits));
const between = (random: () => number, min: number, max: number) => min + random() * (max - min);

/** Star tints: mostly the cream ink, a few pale-sage and warm ones for depth. */
const TINTS = ["var(--es-night-ink)", "var(--es-night-ink)", "var(--es-night-ink)", "var(--es-mist)", "#f5e6cf"] as const;

export type SkyDepth = "far" | "mid" | "near";

interface FieldSpec {
  seed: number;
  /** Tile size in px; each depth uses a different size so repeats never line up. */
  tile: [number, number];
  stars: number;
  radius: [number, number];
  alpha: [number, number];
}

const FIELDS: Record<SkyDepth, FieldSpec> = {
  far: { seed: 11, tile: [467, 419], stars: 34, radius: [0.8, 1.2], alpha: [0.3, 0.65] },
  mid: { seed: 29, tile: [631, 577], stars: 16, radius: [1.1, 1.6], alpha: [0.5, 0.85] },
  near: { seed: 47, tile: [883, 797], stars: 7, radius: [1.5, 2.1], alpha: [0.7, 1] },
};

/** A depth's tile size in px — the flow loops by exactly one tile height, so it never seams. */
export const fieldTile = (depth: SkyDepth): [number, number] => FIELDS[depth].tile;

/** One depth's tiled star field as background styles. */
export function starField(depth: SkyDepth): { backgroundImage: string; backgroundSize: string } {
  const spec = FIELDS[depth];
  const random = seeded(spec.seed);
  const gradients = Array.from({ length: spec.stars }, () => {
    const radius = round(between(random, ...spec.radius));
    const alpha = Math.round(between(random, ...spec.alpha) * 100);
    const tint = TINTS[Math.floor(random() * TINTS.length)];
    const x = round(random() * 100);
    const y = round(random() * 100);
    return `radial-gradient(${radius}px ${radius}px at ${x}% ${y}%, color-mix(in srgb, ${tint} ${alpha}%, transparent), transparent)`;
  });
  return { backgroundImage: gradients.join(","), backgroundSize: `${spec.tile[0]}px ${spec.tile[1]}px` };
}

export interface TwinkleStar {
  left: string;
  top: string;
  /** Diameter in px. */
  size: number;
  /** Seconds per twinkle cycle, and a negative delay so they never pulse in sync. */
  duration: number;
  delay: number;
  /** Dimmest point of the cycle, 0–1. */
  low: number;
  depth: SkyDepth;
}

const DEPTHS: SkyDepth[] = ["far", "far", "mid", "mid", "near"];

/** Individually twinkling stars, spread across the whole sky. */
export function twinkleStars(count = 26): TwinkleStar[] {
  const random = seeded(83);
  return Array.from({ length: count }, () => ({
    left: `${round(random() * 100)}%`,
    top: `${round(random() * 100)}%`,
    size: round(between(random, 1.6, 2.8)),
    duration: round(between(random, 4.5, 11)),
    delay: -round(between(random, 0, 11)),
    low: round(between(random, 0.12, 0.4)),
    depth: DEPTHS[Math.floor(random() * DEPTHS.length)],
  }));
}

/**
 * The few brighter distant stars, placed by hand in the margins of the composition so they never
 * sit behind the front print or the assembled word. Each glints rarely, on its own long cycle.
 */
export const GLINTS = [
  { left: "7%", top: "16%", size: 13, duration: 13, delay: -2 },
  { left: "19%", top: "74%", size: 10, duration: 17, delay: -9 },
  { left: "33%", top: "7%", size: 9, duration: 15, delay: -5 },
  { left: "68%", top: "11%", size: 12, duration: 19, delay: -13 },
  { left: "91%", top: "34%", size: 11, duration: 14, delay: -7 },
  { left: "83%", top: "83%", size: 10, duration: 21, delay: -16 },
] as const;
