/** Height of the sticky site header in px, read from --header-h so pinned sections sit just below it. */
export function headerOffset(): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  return Number.parseFloat(value) || 0;
}

/** ScrollTrigger start that pins a section flush under the header. Function form re-reads on refresh. */
export const pinStart = () => `top ${headerOffset()}px`;
