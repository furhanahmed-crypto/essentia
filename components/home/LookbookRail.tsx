"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "cn";

interface LookbookRailProps {
  label: string;
  children: React.ReactNode;
}

const STEP_SHARE = 0.75;

// Horizontal rail with native scroll and snap, plus arrow buttons and a progress hairline.
// Works with touch, trackpad and keyboard (the rail is focusable).
export function LookbookRail({ label, children }: LookbookRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const ratio = max > 0 ? rail.scrollLeft / max : 1;
    setProgress(ratio);
    setEdges({ start: rail.scrollLeft <= 4, end: rail.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    measure();
    rail.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      rail.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * STEP_SHARE, behavior: "smooth" });
  };

  const arrow =
    "grid size-12 place-items-center border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-background disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <div
        ref={railRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="rail flex items-end gap-4 overflow-x-auto px-[max(var(--es-gutter),calc((100vw-1320px)/2))] [scroll-padding-inline:max(var(--es-gutter),calc((100vw-1320px)/2))] outline-none focus-visible:ring-2 focus-visible:ring-primary md:gap-6"
      >
        {children}
      </div>
      <div className="shell mt-10 flex items-center gap-6">
        <div aria-hidden className="relative h-px flex-1 bg-ink/15">
          <span
            className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-300"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous photographs" disabled={edges.start} onClick={() => step(-1)} className={arrow}>
            <ArrowLeft className="size-5" strokeWidth={1.25} />
          </button>
          <button type="button" aria-label="Next photographs" disabled={edges.end} onClick={() => step(1)} className={cn(arrow)}>
            <ArrowRight className="size-5" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </div>
  );
}
