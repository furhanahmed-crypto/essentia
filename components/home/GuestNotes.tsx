"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "cn";
import { Label } from "@/components/shared/editorial/Label";
import { indexOf } from "@/utils/emphasis";

export interface GuestNote {
  quote: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
}

interface GuestNotesProps {
  label: string;
  title: React.ReactNode;
  items: GuestNote[];
}

const ADVANCE_MS = 7000;

// One note at a time, set large in italic. A numbered selector (a real tab list) switches notes;
// they also advance slowly until the visitor picks one, and never under reduced motion.
export function GuestNotes({ label, title, items }: GuestNotesProps) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const note = items[active];

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % items.length), ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [active, auto, items.length]);

  const choose = (index: number) => {
    setAuto(false);
    setActive(index);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="flex flex-col gap-14 lg:col-span-7 lg:justify-between">
        <div>
          <Label index={6}>{label}</Label>
          <h2 id="notes-title" className="mt-6 mb-0 type-title text-ink">
            {title}
          </h2>
        </div>

        <div
          role="tabpanel"
          id="note-panel"
          aria-labelledby={`note-tab-${active}`}
          aria-live="polite"
          className="relative pt-10"
        >
          <span aria-hidden className="absolute -top-6 -left-1 font-heading text-[9rem] leading-none text-primary/30 select-none">
            “
          </span>
          <blockquote key={active} className="hero-rise m-0">
            <p className="m-0 max-w-2xl font-heading text-[1.65rem] leading-[1.35] tracking-tight text-ink italic sm:text-[2rem] sm:leading-[1.3]">
              {note.quote}
            </p>
            <footer className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span aria-hidden className="h-px w-10 bg-ink/40" />
              <span className="text-sm text-ink">{note.name}</span>
              <span className="type-label text-em">{note.role}</span>
            </footer>
          </blockquote>
        </div>

        <div role="tablist" aria-label="Guest notes" className="grid grid-cols-6 border-t border-line">
          {items.map((item, index) => (
            <button
              key={item.role}
              type="button"
              role="tab"
              id={`note-tab-${index}`}
              aria-selected={index === active}
              aria-controls="note-panel"
              aria-label={`${item.role} — note ${index + 1}`}
              onClick={() => choose(index)}
              className={cn(
                "relative -mt-px border-t-2 pt-4 text-left type-label transition-colors",
                index === active ? "border-ink text-ink" : "border-transparent text-ink/45 hover:text-ink",
              )}
            >
              {indexOf(index + 1)}
              <span className="mt-1 hidden truncate normal-case tracking-normal text-xs xl:block">{item.role}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative hidden min-h-[460px] overflow-hidden bg-mist lg:col-span-5 lg:block">
        {items.map((item, index) => (
          <Image
            key={item.image}
            src={item.image}
            alt={index === active ? item.imageAlt : ""}
            fill
            sizes="(max-width: 1320px) 40vw, 520px"
            className={cn(
              "object-cover transition-opacity duration-700",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
    </div>
  );
}
