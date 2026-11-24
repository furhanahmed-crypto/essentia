"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "cn";
import { GalleryFrame } from "@/components/home/gallery/GalleryFrame";
import { BRAND } from "@/constants/brand";
import home from "@/constants/home/content.json";
import { DESKTOP_MOTION } from "@/constants/motion";
import type { LookbookItem } from "@/types/home/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Item indexes per column. The title opens column one; the reels anchor columns two and four.
// "spread" columns lay their two frames side by side on mobile so the 2-up grid never leaves a hole.
const COLUMNS = [
  { items: [1, 6], offset: "", drift: 0, spread: true },
  { items: [0, 4], offset: "lg:mt-24", drift: -14, spread: false },
  { items: [2, 7], offset: "mt-12 lg:mt-56", drift: 10, spread: false },
  { items: [3, 5], offset: "lg:mt-10", drift: -22, spread: true },
] as const;

/** Editorial masonry: four columns of mixed proportions that drift at different speeds as you scroll. */
export function Gallery() {
  const { lookbook } = home;
  const items = lookbook.items as LookbookItem[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        gsap.utils.toArray<HTMLElement>(".gallery-col").forEach((column) => {
          const drift = Number(column.dataset.drift ?? 0);
          gsap.to(column, {
            yPercent: drift,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="gallery-title" className="overflow-hidden bg-card py-24 md:py-32">
      <div className="shell grid grid-cols-2 items-start gap-x-5 gap-y-10 lg:grid-cols-[1fr_1.3fr_1fr_1.15fr] lg:gap-x-16">
        {COLUMNS.map((column, columnIndex) => (
          <div
            key={column.items.join("-")}
            data-drift={column.drift}
            className={cn("gallery-col flex flex-col gap-10 lg:gap-16", column.offset, column.spread && "col-span-2 lg:col-span-1")}
          >
            {columnIndex === 0 ? (
              <div className="flex flex-col gap-5">
                <h2 id="gallery-title" className="m-0 type-poster text-ink">
                  {lookbook.title}
                </h2>
                <p className="m-0 max-w-xs text-sm leading-relaxed text-muted-foreground">{lookbook.lede}</p>
                <a
                  href={BRAND.socials.instagram}
                  target="_blank"
                  rel="noopener"
                  className="link-draw w-fit pb-1 type-kicker tracking-[0.16em] text-ink uppercase"
                >
                  Follow on Instagram ↗
                </a>
              </div>
            ) : null}
            <div
              className={
                column.spread ? "grid grid-cols-2 items-start gap-5 lg:flex lg:flex-col lg:items-stretch lg:gap-16" : "flex flex-col gap-10 lg:gap-16"
              }
            >
              {column.items.map((itemIndex) => (
                <GalleryFrame key={itemIndex} item={items[itemIndex]} position={itemIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
