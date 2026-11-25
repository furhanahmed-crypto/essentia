"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "cn";
import type { BeforeAfterPair } from "@/types/home/content";

const START = 50;

interface BeforeAfterSliderProps {
  pair: BeforeAfterPair;
  /** Accessible name for the comparison, e.g. "Transformation 02". */
  label: string;
  priority?: boolean;
  className?: string;
}

/**
 * Drag-to-compare frame: the after photo is clipped over the before photo, and a native range input
 * spread across the frame moves the divide — so mouse, touch and arrow keys all work for free.
 * Changing the pair (via `key`) resets the divide to the middle.
 */
export function BeforeAfterSlider({ pair, label, priority = false, className }: BeforeAfterSliderProps) {
  const [split, setSplit] = useState(START);

  return (
    <div className={cn("relative isolate aspect-[2/3] w-full touch-pan-y overflow-hidden bg-mist select-none", className)}>
      <Image src={pair.before} alt={pair.beforeAlt} fill priority={priority} sizes="(max-width: 1024px) 92vw, 560px" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
        <Image src={pair.after} alt={pair.afterAlt} fill priority={priority} sizes="(max-width: 1024px) 92vw, 560px" className="object-cover" />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 bg-night/70 px-3 py-1.5 type-kicker tracking-[0.18em] text-night-ink uppercase backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute top-4 right-4 bg-cream/90 px-3 py-1.5 type-kicker tracking-[0.18em] text-ink uppercase backdrop-blur-sm">
        After
      </span>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-cream" style={{ left: `${split}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)]">
          <MoveHorizontal className="size-5" strokeWidth={1.5} />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={split}
        onChange={(event) => setSplit(Number(event.target.value))}
        aria-label={`${label}: drag to compare before and after`}
        aria-valuetext={`${split}% before shown`}
        className="peer absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-primary ring-inset peer-focus-visible:ring-4"
      />
    </div>
  );
}
