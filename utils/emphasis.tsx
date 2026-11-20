import { Fragment, type ReactNode } from "react";

/**
 * Copy marks the emotional word of a headline with asterisks: "Essential care, *exceptionally* done."
 * The marked words render as <em>, which the base styles set in italic Libre Baskerville and sage.
 */
export function emphasis(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, index) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={index}>{part.slice(1, -1)}</em>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

/** The same copy with the marks removed, for metadata, alt text and aria labels. */
export const plain = (text: string) => text.replace(/\*/g, "");

/** Two-digit index used across the editorial labels: 1 → "01". */
export const indexOf = (position: number) => String(position).padStart(2, "0");
