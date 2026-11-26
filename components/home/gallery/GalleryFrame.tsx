"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { servicePath } from "@/constants/routes";
import { useInViewVideo } from "@/hooks/useInViewVideo";
import type { LookbookItem, LookbookWeight } from "@/types/home/content";
import { indexOf } from "@/utils/emphasis";

// Weight sets the proportion: reels run tall, supporting stills crop square or 4:5.
const RATIO: Record<LookbookWeight, string> = {
  feature: "aspect-[9/16]",
  tall: "aspect-[4/5]",
  small: "aspect-square",
};

interface GalleryFrameProps {
  item: LookbookItem;
  position: number;
  className?: string;
}

export function GalleryFrame({ item, position, className }: GalleryFrameProps) {
  const video = useInViewVideo();

  return (
    <figure className={cn("group relative m-0", className)}>
      <Link href={servicePath(item.service)} aria-label={`${item.caption} — ${item.alt}`} className="block">
        <MaskReveal className={RATIO[item.weight]} delay={(position % 3) * 0.12}>
          {item.video ? (
            <video
              ref={video}
              src={item.video}
              poster={item.image}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={item.alt}
              className="size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
          ) : (
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 1024px) 45vw, 360px"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
          )}
        </MaskReveal>
      </Link>
      <figcaption className="mt-3 flex items-baseline gap-3 lg:absolute lg:top-0 lg:-right-8 lg:mt-0 lg:rotate-180 lg:[writing-mode:vertical-rl]">
        <span className="type-kicker text-accent-deep tabular-nums">{indexOf(position + 1)}</span>
        <span className="font-heading text-base text-ink italic lg:text-lg">{item.caption}</span>
        {item.video ? <span className="type-kicker tracking-[0.14em] text-ink/45 uppercase">Reel</span> : null}
      </figcaption>
    </figure>
  );
}
