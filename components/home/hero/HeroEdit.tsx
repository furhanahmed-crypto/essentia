import { cn } from "cn";
import type { HeroFrameItem } from "@/types/home/content";
import { indexOf } from "@/utils/emphasis";

interface HeroEditProps {
  frames: HeroFrameItem[];
  /** Index (into `frames`) of the print currently in front. */
  active: number;
  kicker: string;
  volume: string;
  hint: string;
  coordinates: string;
  seal: string;
  onSelect: (frame: number) => void;
}

/**
 * Editorial furniture either side of the print stack (wide screens only), so the stage reads like
 * a printed spread rather than empty space:
 *  · left  — "The Finish Edit" index of the five looks; choosing one brings it to the front
 *  · right — the look in front at display size with its number, a brand seal that turns with
 *            scroll, and the salon's coordinates
 * Both columns lift away with the copy as the scroll sequence begins.
 */
export function HeroEdit({ frames, active, kicker, volume, hint, coordinates, seal, onSelect }: HeroEditProps) {
  const current = frames[active];
  return (
    <>
      <nav aria-label={kicker} className="hero-edit hero-edit-left absolute top-[44%] left-[var(--es-gutter)] hidden w-52 -translate-y-1/2 xl:block">
        <div className="hero-intro">
          <p className="m-0 type-kicker tracking-[0.22em] text-night-ink/80 uppercase">{kicker}</p>
          <p className="mt-1 mb-0 font-heading text-sm text-night-ink/55 italic">{volume}</p>
          <ol className="mt-7 mb-0 border-t border-night-ink/15 p-0">
            {frames.map((frame, index) => (
              <li key={frame.src} className="list-none border-b border-night-ink/10">
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  aria-current={index === active ? "true" : undefined}
                  className={cn(
                    "group flex w-full items-baseline gap-3 py-2.5 text-left transition-colors duration-500",
                    index === active ? "text-night-ink" : "text-night-ink/45 hover:text-night-ink/85",
                  )}
                >
                  <span className="type-kicker text-[0.62rem] tabular-nums text-em">{indexOf(index + 1)}</span>
                  <span className="font-heading text-[0.92rem] whitespace-nowrap">{frame.title}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "ml-auto h-px bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      index === active ? "w-5" : "w-0 group-hover:w-2.5",
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-4 mb-0 type-kicker text-[0.6rem] tracking-[0.2em] text-night-ink/40 uppercase">{hint}</p>
        </div>
      </nav>

      <div className="hero-edit hero-edit-right absolute top-[34%] right-[var(--es-gutter)] hidden w-44 -translate-y-1/2 flex-col items-end text-right xl:flex">
        <div className="hero-intro flex flex-col items-end">
          <svg viewBox="0 0 120 120" aria-hidden className="hero-seal size-24 text-night-ink/55 [@media(max-height:800px)]:hidden">
            <defs>
              <path id="hero-seal-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.6" />
            <text fill="currentColor" fontSize="8.6" letterSpacing="2.2" style={{ textTransform: "uppercase" }}>
              <textPath href="#hero-seal-ring" textLength="285" lengthAdjust="spacing">
                {seal}
              </textPath>
            </text>
            <circle cx="60" cy="60" r="2.2" className="fill-primary" />
          </svg>

          <p className="mt-8 mb-0 type-kicker text-[0.62rem] tracking-[0.22em] text-night-ink/50 uppercase tabular-nums">
            {indexOf(active + 1)} / {indexOf(frames.length)}
          </p>
          <p aria-live="polite" className="mt-2 mb-0 font-heading text-[1.7rem] leading-[1.05] text-night-ink italic">
            <span key={current.src} className="hero-swap inline-block">
              {current.title}
            </span>
          </p>
          <span aria-hidden className="mt-5 h-px w-12 bg-night-ink/25" />
          <p className="mt-5 mb-0 type-kicker text-[0.6rem] tracking-[0.2em] text-night-ink/40 uppercase">{coordinates}</p>
        </div>
      </div>
    </>
  );
}
