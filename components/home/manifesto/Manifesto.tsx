"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "cn";
import { ManifestoTile } from "@/components/home/manifesto/ManifestoTile";
import home from "@/constants/home/content.json";
import { ANY_MOTION } from "@/constants/motion";
import type { Principle } from "@/types/home/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Bento placement (desktop 12 × 2): intro card, a tall hero tile across both rows, three squares.
// Auto-placement in DOM order fills it exactly: row 1 = intro · tall · tile; row 2 = tile · (tall) · tile.
const TILE_LAYOUT = [
  "sm:row-span-2 lg:col-span-4 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
] as const;

/**
 * "Why Essentia" on full sage, as a bento grid: an intro card and four photographs, each revealing
 * its reason on hover. The tiles wipe up into place once as the section scrolls in.
 */
export function Manifesto() {
  const { manifesto } = home;
  const principles = manifesto.principles as Principle[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ANY_MOTION, () => {
        gsap.from(".bento-cell", {
          clipPath: "inset(100% 0% 0% 0%)",
          y: 40,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="manifesto-title"
      className="bg-primary py-20 text-ink md:py-28 dark:text-primary-foreground"
    >
      <div className="shell grid gap-4 sm:auto-rows-[19rem] sm:grid-cols-2 md:gap-5 lg:auto-rows-[minmax(18rem,calc((100svh-var(--header-h)-15rem)/2))] lg:grid-cols-12">
        <div className="bento-cell flex flex-col justify-between gap-10 bg-card p-7 text-ink sm:col-span-2 lg:col-span-4 md:p-9">
          <p className="m-0 type-kicker tracking-[0.18em] text-accent-deep uppercase">{manifesto.label}</p>
          <div>
            <h2 id="manifesto-title" className="m-0 font-heading text-[clamp(2.2rem,1rem+2.3vw,3.4rem)] leading-[1] tracking-[-0.03em] text-ink">
              {manifesto.title}
            </h2>
            <p className="mt-5 mb-0 max-w-xs text-sm leading-relaxed text-muted-foreground">{manifesto.lede}</p>
          </div>
        </div>

        {principles.map((principle, index) => (
          <ManifestoTile
            key={principle.word}
            principle={principle}
            position={index}
            total={principles.length}
            className={cn("bento-cell", TILE_LAYOUT[index % TILE_LAYOUT.length])}
          />
        ))}
      </div>
    </section>
  );
}
