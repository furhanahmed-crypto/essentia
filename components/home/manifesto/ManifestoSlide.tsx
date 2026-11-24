import Image from "next/image";
import type { Principle } from "@/types/home/content";
import { indexOf } from "@/utils/emphasis";

/**
 * One strength: the word at poster scale (a faint ghost with a solid copy on top that the scroll
 * fills in), beside a tilted photograph and its sentence. Stacks in place only while pinned.
 */
export function ManifestoSlide({ principle, position }: { principle: Principle; position: number }) {
  return (
    <article className="manifesto-slide grid items-center gap-8 border-t border-ink/15 py-12 first:border-t-0 lg:grid-cols-12 lg:gap-10 in-[.is-pinned]:absolute in-[.is-pinned]:inset-0 in-[.is-pinned]:border-0 in-[.is-pinned]:py-0">
      <p aria-hidden className="relative m-0 font-heading text-[clamp(3.6rem,1rem+10vw,11rem)] leading-[0.9] tracking-[-0.045em] lg:col-span-8">
        <span className="text-ink/15">{principle.word}</span>
        <span className="manifesto-fill absolute inset-0 text-ink">{principle.word}</span>
      </p>

      <div className="flex items-end gap-6 lg:col-span-4 lg:flex-col lg:items-start">
        <div className="manifesto-photo relative aspect-[4/5] w-28 shrink-0 -rotate-3 overflow-hidden shadow-[0_30px_50px_-30px_rgba(52,51,48,0.6)] sm:w-36 lg:w-52">
          <Image src={principle.image} alt={principle.imageAlt} fill sizes="208px" className="object-cover" />
        </div>
        <div className="manifesto-copy">
          <span className="type-kicker text-ink/60 tabular-nums">{indexOf(position + 1)} / 04</span>
          <h3 className="mt-2 mb-2 font-heading text-2xl text-ink">{principle.title}</h3>
          <p className="m-0 max-w-xs text-sm leading-relaxed text-ink/80">{principle.text}</p>
        </div>
      </div>
    </article>
  );
}
