import { cn } from "cn";

/**
 * The brand name set as one oversized line; each letter is its own span so the intro can stagger it.
 * Capped by viewport height too, so short laptop screens keep room for the headline.
 */
export function HeroWordmark({ word, className }: { word: string; className?: string }) {
  return (
    <p
      aria-hidden
      style={{ fontSize: "min(1rem + 15vw, 24svh)" }}
      className={cn("m-0 flex overflow-hidden type-mega whitespace-nowrap select-none", className)}
    >
      {word.split("").map((letter, index) => (
        <span key={`${letter}-${index}`} className="hero-letter inline-block">
          {letter}
        </span>
      ))}
    </p>
  );
}
