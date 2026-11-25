import { cn } from "cn";

/**
 * The brand name, one span per letter (`hero-letter`) so the scroll sequence can lift each into
 * place on its own. At rest it sits beneath the prints at caption scale; the timeline then bounces
 * every letter up to the centre of the screen and grows it into the full-width signature word.
 * The line box is a full em so the capitals are never trimmed.
 */
export function HeroWordmark({ word, className }: { word: string; className?: string }) {
  return (
    <p
      aria-hidden
      style={{ fontSize: "min(0.6rem + 6vw, 8.5svh)" }}
      className={cn("hero-wordmark m-0 flex type-mega leading-none whitespace-nowrap select-none", className)}
    >
      {word
        .toUpperCase()
        .split("")
        .map((letter, index) => (
          <span key={`${letter}-${index}`} className="hero-letter inline-block pt-[0.04em] pb-[0.06em]">
            {letter}
          </span>
        ))}
    </p>
  );
}
