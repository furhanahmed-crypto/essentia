import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { ArrowRight } from "lucide-react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "@/components/shared/Icon";
import { WA } from "@/constants/whatsapp";
import type { HeroFrameItem } from "@/types/home/content";

/**
 * Where the five prints settle around the assembled word: % of the layer, tilt, and depth. The
 * lower pair (`low`) would sit over the actions on phones, so it only shows from `sm` up.
 */
const SCATTER = [
  { left: "5%", top: "13%", rotate: -9, depth: 0.6, low: false },
  { left: "14%", top: "63%", rotate: 7, depth: 1, low: true },
  { left: "20%", top: "4%", rotate: 4, depth: 0.4, low: false },
  { right: "6%", top: "11%", rotate: 8, depth: 0.8, low: false },
  { right: "15%", top: "61%", rotate: -6, depth: 0.5, low: true },
] as const;

interface HeroFinaleProps {
  frames: HeroFrameItem[];
  kicker: string;
  primary: { label: string; href: string };
  secondary: { label: string };
  facts: { value: string; label: string }[];
  cue: string;
}

/**
 * Everything that frames the assembled ESSENTIA once the letters land, so the centred moment reads
 * as a composed brand page rather than a lone word:
 *  · the five prints return as a loose collage behind the word (`hero-scatter`), drifting at
 *    different depths while the word holds
 *  · a ruled kicker above the word, actions below the discipline line
 *  · a facts strip and a cue along the bottom edge
 * Starts hidden (CSS); the scroll timeline places and reveals each part.
 */
export function HeroFinale({ frames, kicker, primary, secondary, facts, cue }: HeroFinaleProps) {
  return (
    <>
      <div aria-hidden className="absolute inset-0">
        {frames.map((frame, index) => {
          const { depth, rotate, low, ...position } = SCATTER[index % SCATTER.length];
          return (
            <div
              key={frame.src}
              data-depth={depth}
              className={cn("hero-scatter absolute w-[clamp(4.25rem,8.5vw,8.5rem)]", low && "max-sm:!hidden")}
              style={{ ...position, rotate: `${rotate}deg` }}
            >
              <div className="bg-cream p-1.5 pb-4 shadow-[0_30px_60px_-28px_rgba(0,0,0,0.85)] dark:bg-night-ink">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image src={frame.src} alt="" fill sizes="140px" className="object-cover" />
                  <span className="absolute inset-0 bg-night/35" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hero-finale-kicker absolute inset-x-0 top-1/2 flex items-center justify-center gap-4 px-[var(--es-gutter)]">
        <span aria-hidden className="h-px w-8 bg-night-ink/40 sm:w-14" />
        <span className="type-kicker text-[0.62rem] tracking-[0.26em] whitespace-nowrap text-night-ink/80 uppercase sm:text-[0.72rem]">
          {kicker}
        </span>
        <span aria-hidden className="h-px w-8 bg-night-ink/40 sm:w-14" />
      </div>

      <div className="hero-finale-actions pointer-events-auto absolute inset-x-0 top-1/2 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-[var(--es-gutter)]">
        <Link
          href={primary.href}
          className="group inline-flex h-11 items-center gap-3 rounded-full bg-night-ink px-6 type-kicker tracking-[0.16em] text-night uppercase transition-colors hover:bg-primary hover:text-white"
        >
          {primary.label}
          <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a
          href={WA.home}
          target="_blank"
          rel="noopener"
          className="link-draw inline-flex items-center gap-2.5 pb-1 type-kicker tracking-[0.16em] whitespace-nowrap text-night-ink uppercase"
        >
          <Icon icon={faWhatsapp} className="text-base" />
          {secondary.label}
        </a>
      </div>

      <div className="hero-finale-foot absolute inset-x-0 bottom-0 px-[var(--es-gutter)] pb-[clamp(1rem,3svh,2rem)]">
        <div className="mx-auto grid max-w-[1320px] items-end gap-6 border-t border-night-ink/15 pt-4 sm:grid-cols-[1fr_auto_1fr]">
          <dl className="m-0 hidden gap-10 sm:flex">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-heading text-lg leading-none text-night-ink">{fact.value}</dt>
                <dd className="mt-1.5 mb-0 type-kicker text-[0.6rem] tracking-[0.2em] text-night-ink/55 uppercase">{fact.label}</dd>
              </div>
            ))}
          </dl>
          {/* Centred, clear of the floating WhatsApp button in the corner. */}
          <p className="m-0 flex flex-col items-center gap-2 justify-self-center type-kicker text-[0.62rem] tracking-[0.24em] text-night-ink/60 uppercase">
            {cue}
            <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-night-ink/20">
              <span className="hero-cue-dot absolute inset-x-0 top-0 h-1/2 bg-night-ink" />
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
