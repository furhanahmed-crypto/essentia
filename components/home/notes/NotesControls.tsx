import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "cn";
import type { GuestNote } from "@/types/home/content";
import { indexOf } from "@/utils/emphasis";

interface NotesControlsProps {
  notes: GuestNote[];
  active: number;
  onSelect: (index: number) => void;
}

const round =
  "grid size-12 place-items-center rounded-full border border-night-ink/30 text-night-ink transition-colors hover:border-night-ink hover:bg-night-ink hover:text-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

/** Previous / next, a 01 / 06 counter, and a thumbnail per guest. */
export function NotesControls({ notes, active, onSelect }: NotesControlsProps) {
  const count = notes.length;
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Previous guest note" className={round} onClick={() => onSelect((active - 1 + count) % count)}>
          <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} />
        </button>
        <button type="button" aria-label="Next guest note" className={round} onClick={() => onSelect((active + 1) % count)}>
          <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
        </button>
      </div>
      <p className="m-0 font-heading text-xl text-night-ink tabular-nums">
        {indexOf(active + 1)} <span className="text-night-ink/40">/ {indexOf(count)}</span>
      </p>
      <ul className="m-0 flex gap-2 p-0">
        {notes.map((note, index) => (
          <li key={note.name} className="list-none">
            <button
              type="button"
              aria-label={`Show note from ${note.name}`}
              aria-pressed={index === active}
              onClick={() => onSelect(index)}
              className={cn(
                "relative block size-11 overflow-hidden rounded-full transition-[opacity,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                index === active ? "scale-110 opacity-100 ring-2 ring-em" : "opacity-45 hover:opacity-80",
              )}
            >
              <Image src={note.image} alt="" fill sizes="44px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
