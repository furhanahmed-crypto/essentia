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

// Quote + contained photograph — no full-bleed section background.
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
    <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
      <div className="flex flex-col gap-10 lg:col-span-7 lg:justify-between">
        <div>
          <Label index={6}>{label}</Label>
          <h2 id="notes-title" className="mt-6 mb-0 max-w-lg type-title text-ink">
            {title}
          </h2>
        </div>

        <div
          role="tabpanel"
          id="note-panel"
          aria-labelledby={`note-tab-${active}`}
          aria-live="polite"
          className="relative max-w-2xl pt-6"
        >
          <span aria-hidden className="absolute -top-2 left-0 font-heading text-6xl leading-none text-primary/35 select-none">
            “
          </span>
          <blockquote key={active} className="m-0">
            <p className="m-0 font-heading text-[clamp(1.25rem,2vw,1.85rem)] leading-snug tracking-tight text-ink italic">
              {note.quote}
            </p>
            <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span aria-hidden className="h-px w-8 bg-ink/35" />
              <span className="text-sm text-ink">{note.name}</span>
              <span className="type-label text-em">{note.role}</span>
            </footer>
          </blockquote>
        </div>

        <div role="tablist" aria-label="Guest notes" className="grid grid-cols-3 gap-y-2 border-t border-line pt-5 sm:grid-cols-6">
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
                "relative -mt-px border-t-2 pt-3 text-left type-label transition-colors",
                index === active ? "border-ink text-ink" : "border-transparent text-ink/45 hover:text-ink",
              )}
            >
              {indexOf(index + 1)}
              <span className="mt-1 hidden truncate normal-case tracking-normal text-xs xl:block">{item.role}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[280px] overflow-hidden bg-mist sm:min-h-[360px] lg:col-span-5 lg:min-h-[420px]">
        {items.map((item, index) => (
          <Image
            key={item.image}
            src={item.image}
            alt={index === active ? item.imageAlt : ""}
            fill
            sizes="(max-width: 1024px) 90vw, 420px"
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
