import Image from "next/image";
import { cn } from "cn";
import type { HeroFrameItem } from "@/types/home/content";
import { slotPose } from "@/components/home/hero/heroSlots";

interface HeroFrameProps {
  frame: HeroFrameItem;
  /** Current position in the fan: 0 front, ±1 behind, ±2 outer. */
  slot: number;
  /**
   * Position at first render. Only this is written into the inline pose vars and z-index; after
   * mount the re-stack timeline (`heroSwap`) owns them, so React never snaps a print mid-glide.
   */
  restSlot: number;
  priority?: boolean;
  onSelect: () => void;
}

/**
 * One editorial print: photograph on a cream mat with a caption margin, a floating hairline
 * keyline and a deep two-layer shadow. Three nested layers keep motion systems apart:
 *  · `figure.hero-frame`  — the scroll timeline (GSAP transform) and stacking order
 *  · `.hero-slot`          — the resting pose for its slot plus any re-stack nudge (CSS
 *                            translate / rotate / scale read from custom properties that the
 *                            re-stack timeline tweens)
 *  · `.hero-frame-intro`   — the one-off load-in
 * Each print is a button: choosing one brings it to the front.
 */
export function HeroFrame({ frame, slot, restSlot, priority = false, onSelect }: HeroFrameProps) {
  const pose = slotPose(slot);
  const rest = slotPose(restSlot);
  const isFront = slot === 0;

  return (
    <figure
      data-slot={slot}
      className="hero-frame absolute top-1/2 left-1/2 m-0 w-[var(--frame-w)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ zIndex: rest.z }}
    >
      <div
        className="hero-slot"
        style={
          {
            "--slot-x": rest.x,
            "--slot-y": rest.y,
            "--slot-r": `${rest.rotate}deg`,
            "--slot-s": rest.scale,
            "--nudge-x": 0,
            "--nudge-y": 0,
            "--nudge-r": "0deg",
            "--nudge-s": 1,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "hero-frame-intro group/print relative transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            !isFront && "hover:-translate-y-2",
          )}
        >
          <button
            type="button"
            onClick={onSelect}
            aria-pressed={isFront}
            aria-label={isFront ? `${frame.title} — in front` : `Bring ${frame.title} to the front`}
            className={cn(
              "hero-print block w-full bg-cream p-[clamp(6px,0.7vw,11px)] pb-[clamp(30px,3.2vw,46px)] text-left outline outline-1 outline-offset-[clamp(5px,0.6vw,9px)] transition-[outline-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-primary dark:bg-night-ink",
              "shadow-[0_60px_110px_-40px_rgba(0,0,0,0.9),0_22px_40px_-22px_rgba(0,0,0,0.65)]",
              isFront ? "cursor-default outline-night-ink/40" : "cursor-pointer outline-night-ink/15 hover:outline-night-ink/45",
            )}
          >
            <span className="relative block aspect-[2/3] overflow-hidden bg-mist">
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                priority={priority}
                fetchPriority={priority ? "high" : undefined}
                sizes="(max-width: 768px) 62vw, 340px"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-night opacity-[var(--dim)] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/print:opacity-0"
                style={{ "--dim": pose.dim } as React.CSSProperties}
              />
            </span>
          </button>
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[clamp(30px,3.2vw,46px)] items-center justify-between px-[clamp(8px,0.9vw,14px)] type-kicker text-[0.62rem] tracking-[0.18em] text-ink/70 uppercase md:text-[0.68rem]">
            <span className="truncate">{frame.label}</span>
            <span aria-hidden className="h-px w-6 shrink-0 bg-ink/30" />
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
