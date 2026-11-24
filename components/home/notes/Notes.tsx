"use client";

import Image from "next/image";
import { useCallback } from "react";
import { NotesControls } from "@/components/home/notes/NotesControls";
import home from "@/constants/home/content.json";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { useStageIndex } from "@/hooks/useStageIndex";
import type { GuestNote } from "@/types/home/content";

const ADVANCE_MS = 7000;

/**
 * Night band with one guest at a time: a large photograph that wipes to the next, the next guest's
 * photo tucked behind it, and the quote set big in Bodoni italic under an oversized mark.
 */
export function Notes() {
  const { testimonials } = home;
  const notes = testimonials.items as GuestNote[];
  const { active, select, layerState } = useStageIndex();
  const note = notes[active];
  const upcoming = notes[(active + 1) % notes.length];

  const advance = useCallback(() => select((active + 1) % notes.length), [active, notes.length, select]);
  const { stop, pauseProps } = useAutoAdvance(advance, ADVANCE_MS, active);
  const choose = (index: number) => {
    stop();
    select(index);
  };

  return (
    <section aria-labelledby="notes-title" className="band-night overflow-hidden py-20 md:py-28" {...pauseProps}>
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="relative mx-auto w-full max-w-sm pr-10 pb-12 lg:col-span-5 lg:max-w-none">
          <div className="absolute right-0 bottom-0 aspect-[3/4] w-[42%] overflow-hidden opacity-60">
            <Image key={upcoming.image} src={upcoming.image} alt="" fill sizes="200px" className="object-cover animate-in fade-in-0 duration-700" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            {notes.map((item, index) => (
              <div key={item.name} data-state={layerState(index)} className="stage-layer absolute inset-0">
                <div className="absolute inset-0">
                  <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 1024px) 80vw, 460px" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <span aria-hidden className="pointer-events-none absolute -top-20 -left-3 font-heading text-[14rem] leading-none text-em/25 select-none md:-top-36 md:-left-6 md:text-[24rem]">
            “
          </span>
          <h2 id="notes-title" className="relative m-0 type-kicker tracking-[0.18em] text-night-ink/60 uppercase">
            {testimonials.title}
          </h2>
          <figure aria-live="polite" className="relative m-0 mt-8">
            <blockquote key={note.quote} className="m-0 font-heading text-[clamp(1.7rem,1rem+2.2vw,3.1rem)] leading-[1.15] tracking-tight text-night-ink italic animate-in fade-in-0 slide-in-from-bottom-6 duration-700">
              {note.quote}
            </blockquote>
            <figcaption key={note.name} className="mt-8 flex items-center gap-4 animate-in fade-in-0 duration-1000">
              <span className="h-px w-10 bg-em" />
              <span className="text-sm text-night-ink">{note.name}</span>
              <span className="type-kicker text-night-ink/55">{note.role}</span>
            </figcaption>
          </figure>
          <div className="mt-12">
            <NotesControls notes={notes} active={active} onSelect={choose} />
          </div>
        </div>
      </div>
    </section>
  );
}
