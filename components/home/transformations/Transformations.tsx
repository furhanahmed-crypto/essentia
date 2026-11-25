"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "cn";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import home from "@/constants/home/content.json";
import type { BeforeAfterPair } from "@/types/home/content";
import { emphasis, indexOf } from "@/utils/emphasis";

interface TransformationsProps {
  /** Ground: ivory on the home page, cream where it follows a cream section. */
  tone?: "ivory" | "cream";
  /** Heading level id, unique per page. */
  id?: string;
}

/**
 * Real before & after results from the salon: a drag-to-compare frame beside the headline, with
 * thumbnails to switch between guests. Reused on the Hair chapter.
 */
export function Transformations({ tone = "ivory", id = "transformations-title" }: TransformationsProps) {
  const { transformations } = home;
  const pairs = transformations.pairs as BeforeAfterPair[];
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby={id} className={cn("py-24 md:py-32", tone === "ivory" ? "bg-background" : "bg-card")}>
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="m-0 type-kicker tracking-[0.18em] text-accent-deep uppercase">{transformations.label}</p>
          <h2 id={id} className="mt-5 mb-0 type-poster text-ink">
            {emphasis(transformations.title)}
          </h2>
          <p className="mt-6 mb-0 max-w-sm text-sm leading-relaxed text-muted-foreground">{transformations.lede}</p>

          <div className="mt-10">
            <p className="m-0 type-kicker tabular-nums text-ink/60">
              {indexOf(active + 1)} / {indexOf(pairs.length)}
            </p>
            <ul className="mt-4 mb-0 flex flex-wrap gap-3 p-0">
              {pairs.map((pair, index) => (
                <li key={pair.after} className="list-none">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={index === active}
                    aria-label={`Show transformation ${index + 1}`}
                    className={cn(
                      "relative block h-20 w-14 overflow-hidden transition-[opacity,outline-color] duration-300 outline-2 outline-offset-3 sm:h-24 sm:w-16",
                      index === active ? "opacity-100 outline-ink" : "opacity-55 outline-transparent hover:opacity-90",
                    )}
                  >
                    <Image src={pair.after} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <BeforeAfterSlider
            key={pairs[active].after}
            pair={pairs[active]}
            label={`Transformation ${indexOf(active + 1)}`}
            className="mx-auto max-w-[min(480px,calc((100svh-var(--header-h)-7rem)*2/3))]"
          />
        </div>
      </div>
    </section>
  );
}
