/**
 * The hero's set, lit like a studio rather than painted flat. Every layer is a static gradient or
 * a static texture tile — nothing animates on its own; a few layers (`hero-bg-*`) only drift with
 * scroll via transform / opacity. All colour comes from the brand tokens.
 *
 *  1 · key light   — a warm cream pool behind the prints, falling off into night
 *  2 · the mirror  — a towering arched outline (the salon's mirrors) framing the stack
 *  3 · floor       — an elliptical contact shadow and faint reflection under the prints
 * The section-wide ambience (rim lights, beams, stars, grain, vignette) lives in `HeroSky`,
 * behind this stage, so it stays put while the stage scrolls away.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-bg-key absolute inset-[-10%] bg-[radial-gradient(ellipse_42%_48%_at_50%_44%,color-mix(in_srgb,var(--es-night-glow)_15%,transparent),transparent_72%)]" />

      {/* The arched mirror: sized from the frame width so it always frames the fan. */}
      <div className="hero-bg-arch absolute top-[var(--fan-y)] left-1/2 h-[calc(var(--frame-w)*2.55)] w-[calc(var(--frame-w)*2.1)] -translate-x-1/2 -translate-y-[46%]">
        <div className="hero-bg-arch-in absolute inset-0 rounded-t-full border border-night-ink/10 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,color-mix(in_srgb,var(--es-night-glow)_5%,transparent),transparent_75%)]">
          <div className="absolute inset-[clamp(10px,1.2vw,18px)] rounded-t-full border border-night-ink/[0.06]" />
        </div>
      </div>

      <div className="hero-bg-floor absolute top-[calc(var(--fan-y)+var(--frame-w)*0.95)] left-1/2 h-[calc(var(--frame-w)*0.5)] w-[calc(var(--frame-w)*3.6)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--es-shadow)_55%,transparent),transparent)]" />
    </div>
  );
}
