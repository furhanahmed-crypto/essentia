import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "cn";

type CtaVariant = "solid" | "sage" | "outline" | "line";

interface CtaProps {
  href: string;
  variant?: CtaVariant;
  /** Opens in a new tab (WhatsApp, Instagram, maps) with the up-right arrow. */
  external?: boolean;
  /** Leading icon; the trailing arrow is drawn automatically. */
  icon?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
}

const VARIANTS: Record<CtaVariant, string> = {
  solid:
    "h-12 px-6 bg-ink text-background hover:bg-accent-deep dark:bg-night-ink dark:text-night dark:hover:bg-primary",
  sage: "h-12 px-6 bg-primary text-white hover:bg-accent-deep dark:text-night",
  outline: "h-12 px-6 border border-current/35 hover:border-current hover:bg-current/5",
  line: "pb-1.5 border-b border-current/40 hover:border-current",
};

// Rectangular call to action for the marketing pages: solid charcoal, sage, hairline outline, or an
// underlined text link. The arrow slides on hover. Internal links use next/link.
export function Cta({ href, variant = "solid", external = false, icon, ariaLabel, className, children }: CtaProps) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const classes = cn(
    "group/cta inline-flex items-center gap-3 text-[0.82rem] tracking-[0.08em] uppercase whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
    VARIANTS[variant],
    className,
  );
  const content = (
    <>
      {icon}
      <span>{children}</span>
      <Arrow
        aria-hidden
        className={cn(
          "size-4 transition-transform duration-300 group-hover/cta:translate-x-1",
          external && "group-hover/cta:-translate-y-0.5",
        )}
        strokeWidth={1.5}
      />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" aria-label={ariaLabel} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {content}
    </Link>
  );
}
