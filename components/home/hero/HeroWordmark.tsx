import { cn } from "cn";

/**
 * The brand name set as one oversized line; each letter is its own span so the intro can stagger it.
 * Capped by viewport height too, so short laptop screens keep room for the headline. The line box
 * is a full em (not type-mega's tight 0.82) so the clip that hides the rising letters never trims
 * the bottom of the capitals once they land.
 */
export function HeroWordmark({ word, className }: { word: string; className?: string }) {
  return (
    <p
      aria-hidden
      style={{ fontSize: "min(1rem + 15vw, 24svh)" }}
      className={cn("m-0 flex overflow-hidden pt-[0.04em] pb-[0.06em] type-mega leading-none whitespace-nowrap select-none", className)}
    >
      {word.toUpperCase().split("").map((letter, index) => (
        <span key={`${letter}-${index}`} className="hero-letter inline-block">
          {letter}
        </span>
      ))}
    </p>
  );
}
