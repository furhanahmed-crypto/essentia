import { cn } from "cn";

export type BandTone = "ivory" | "cream" | "night";

const TONES: Record<BandTone, string> = {
  ivory: "bg-background text-ink",
  cream: "bg-card text-ink",
  night: "band-night",
};

interface BandProps {
  id?: string;
  tone?: BandTone;
  /** Vertical rhythm. "none" lets the section handle its own spacing (full-bleed photos). */
  space?: "default" | "tight" | "none";
  /** Wrap children in the 1320px shell. */
  contained?: boolean;
  ariaLabelledby?: string;
  className?: string;
  children: React.ReactNode;
}

const SPACE = {
  default: "py-24 md:py-32",
  tight: "py-16 md:py-20",
  none: "",
} as const;

// One page band: a ground colour from the editorial palette and the shared vertical rhythm.
export function Band({
  id,
  tone = "ivory",
  space = "default",
  contained = true,
  ariaLabelledby,
  className,
  children,
}: BandProps) {
  return (
    <section id={id} aria-labelledby={ariaLabelledby} className={cn("relative", TONES[tone], SPACE[space], className)}>
      {contained ? <div className="shell">{children}</div> : children}
    </section>
  );
}
