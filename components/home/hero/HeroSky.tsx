import type { CSSProperties } from "react";
import {
  fieldTile,
  GLINTS,
  starField,
  twinkleStars,
  type SkyDepth,
} from "@/components/home/hero/heroStars";

interface DepthSpec {
  depth: SkyDepth;
  /** Scroll parallax factor, read by the hero's scroll setup (`data-parallax`). */
  parallax: number;
  /** Idle sway: distance and period of one alternating float. */
  drift: { x: string; y: string; seconds: number };
  /** Idle flow: how fast the field rises, in px per second (scroll speed multiplies it). */
  flow: number;
}

/** Far stars barely move; near ones flow, sway and parallax the most. */
const DEPTHS: DepthSpec[] = [
  {
    depth: "far",
    parallax: 0.2,
    drift: { x: "-12px", y: "-8px", seconds: 40 },
    flow: 6,
  },
  {
    depth: "mid",
    parallax: 0.5,
    drift: { x: "18px", y: "-12px", seconds: 32 },
    flow: 12,
  },
  {
    depth: "near",
    parallax: 1,
    drift: { x: "-26px", y: "-18px", seconds: 26 },
    flow: 22,
  },
];

const TWINKLES = twinkleStars();

/**
 * The hero's ambient sky: a section-wide layer behind the stage, so it stays with the held word
 * through the finale instead of scrolling off with the prints. Back to front:
 *
 *  · rim lights and light beams (moved here from the stage set, so no edge ever slides across)
 *  · a faint nebula wash for atmospheric depth
 *  · three star depths — each one tiled background (painted once) on an oversized layer that
 *    rises continuously (`hero-sky-flow`, a linear loop of exactly one tile height, so it never
 *    seams), sways on a slow CSS drift and parallaxes on scroll by its own factor. Scroll speed
 *    speeds the flow up (and briefly reverses it when scrolling back) — see `Hero.tsx`
 *  · a few dozen individually twinkling stars and six brighter distant glints (tiny spans,
 *    opacity / transform only)
 *  · grain and vignette, so the whole field sinks into night at the edges
 *
 * No canvas, no filters, no JS loops; all motion pauses off-screen and under reduced motion.
 */
export function HeroSky() {
  return (
    <div
      aria-hidden
      className="hero-sky pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="hero-bg-rim absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_6%_96%,color-mix(in_srgb,var(--color-primary)_26%,transparent),transparent_70%),radial-gradient(ellipse_45%_50%_at_96%_4%,color-mix(in_srgb,var(--es-mist)_12%,transparent),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_38%_30%_at_24%_28%,color-mix(in_srgb,var(--es-mist)_5%,transparent),transparent_70%),radial-gradient(ellipse_34%_28%_at_78%_70%,color-mix(in_srgb,var(--color-primary)_7%,transparent),transparent_72%)]" />
      <div className="hero-bg-beams absolute inset-[-20%] bg-[linear-gradient(112deg,transparent_34%,color-mix(in_srgb,var(--es-night-glow)_5%,transparent)_40%,transparent_47%,transparent_55%,color-mix(in_srgb,var(--es-night-glow)_4%,transparent)_60%,transparent_66%)]" />

      {DEPTHS.map(({ depth, parallax, drift, flow }) => {
        const [, tileHeight] = fieldTile(depth);
        return (
          <div
            key={depth}
            data-parallax={parallax}
            className="hero-sky-depth absolute inset-x-0 top-0 h-[120%]"
          >
            <div
              className="hero-sky-drift absolute inset-[-2%]"
              style={
                {
                  "--drift-x": drift.x,
                  "--drift-y": drift.y,
                  "--drift-s": `${drift.seconds}s`,
                } as CSSProperties
              }
            >
              <div
                className="hero-sky-flow absolute inset-x-0 top-0"
                style={
                  {
                    ...starField(depth),
                    height: `calc(100% + ${tileHeight}px)`,
                    "--flow-y": `-${tileHeight}px`,
                    "--flow-s": `${(tileHeight / flow).toFixed(1)}s`,
                  } as CSSProperties
                }
              />
              {TWINKLES.filter((star) => star.depth === depth).map((star) => (
                <span
                  key={`${star.left}-${star.top}`}
                  className="hero-twinkle absolute rounded-full"
                  style={
                    {
                      left: star.left,
                      top: star.top,
                      width: star.size,
                      height: star.size,
                      "--tw-low": star.low,
                      "--tw-s": `${star.duration}s`,
                      "--tw-delay": `${star.delay}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Brighter distant stars, positioned against the visible sky (not the oversized depths). */}
      <div data-parallax={0.35} className="hero-sky-depth absolute inset-0">
        <div
          className="hero-sky-drift absolute inset-0"
          style={
            {
              "--drift-x": "8px",
              "--drift-y": "-8px",
              "--drift-s": "80s",
            } as CSSProperties
          }
        >
          {GLINTS.map((glint) => (
            <span
              key={`${glint.left}-${glint.top}`}
              className="hero-glint absolute"
              style={
                {
                  left: glint.left,
                  top: glint.top,
                  width: glint.size,
                  height: glint.size,
                  "--tw-s": `${glint.duration}s`,
                  "--tw-delay": `${glint.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="hero-grain absolute inset-0 opacity-[0.07]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_45%,transparent_55%,color-mix(in_srgb,var(--es-night)_80%,var(--es-shadow))_100%)]" />
    </div>
  );
}
