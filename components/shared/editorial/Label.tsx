import { cn } from "cn";

interface LabelProps {
  /** Sage number in front of the label: 2 → "02". Omit for a plain label. */
  index?: number;
  as?: "p" | "h2" | "span";
  className?: string;
  children: React.ReactNode;
}

// The index label that opens a section: "02 — The Menu". Replaces handwritten eyebrows.
export function Label({ index, as: Tag = "p", className, children }: LabelProps) {
  return (
    <Tag className={cn("m-0 type-label flex items-center gap-3 text-current/70", className)}>
      {index ? (
        <>
          <span className="text-em tabular-nums">{String(index).padStart(2, "0")}</span>
          <span aria-hidden className="h-px w-8 bg-current/40" />
        </>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}
