import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import type { Principle } from "@/types/home/content";
import { indexOf } from "@/utils/emphasis";

interface ManifestoTileProps {
  principle: Principle;
  position: number;
  total: number;
  className?: string;
}

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * One bento photograph. The word always sits on the image; hovering (or focusing) slowly zooms the
 * photo, deepens the scrim and lifts the title and sentence into view. On touch screens, where there
 * is no hover, the sentence is simply shown.
 */
export function ManifestoTile({ principle, position, total, className }: ManifestoTileProps) {
  return (
    <Link
      href={principle.href}
      className={cn(
        "manifesto-tile group relative isolate block min-h-[22rem] overflow-hidden bg-night text-night-ink outline-none focus-visible:ring-2 focus-visible:ring-night-ink focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:min-h-0",
        className,
      )}
    >
      <Image
        src={principle.image}
        alt={principle.imageAlt}
        fill
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 440px"
        className={cn("-z-10 object-cover transition-transform duration-[1400ms] group-hover:scale-[1.07] group-focus-visible:scale-[1.07]", EASE)}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/35 to-night/5 transition-opacity duration-700",
          "[@media(hover:hover)]:from-night/70 [@media(hover:hover)]:via-night/10 [@media(hover:hover)]:to-transparent",
          EASE,
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 bg-night/45 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100",
          EASE,
        )}
      />

      <div className="flex h-full flex-col justify-between p-6 md:p-7">
        <div className="flex items-start justify-between type-kicker tracking-[0.16em] text-night-ink/80 uppercase">
          <span className="tabular-nums">
            {indexOf(position + 1)} / {indexOf(total)}
          </span>
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.25}
            className={cn(
              "size-6 transition-[transform,opacity] duration-500 [@media(hover:hover)]:-translate-x-2 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
              EASE,
            )}
          />
        </div>

        <div>
          <p className="m-0 font-heading text-[clamp(2.6rem,1.4rem+2.6vw,4.25rem)] leading-[0.95] tracking-[-0.04em] text-night-ink">
            {principle.word}
          </p>
          {/* Grid-row trick: 0fr → 1fr animates the reveal to the text's real height. */}
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-700 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 grid-rows-[1fr] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100",
              EASE,
            )}
          >
            <div className="overflow-hidden">
              <h3 className="mt-4 mb-1.5 font-heading text-xl text-night-ink italic">{principle.title}</h3>
              <p className="m-0 max-w-xs text-sm leading-relaxed text-night-ink/85">{principle.text}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
