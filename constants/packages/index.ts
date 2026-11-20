import packages from "@/constants/packages/packages.json";
import type { PackageItem, SalonPackage } from "@/types/services";

/** Centralised package data (packages.json) — inclusions only, never prices. */
export const PACKAGES: readonly SalonPackage[] = packages;

/** Everyday combination sets (female and male grooming). */
export const EVERYDAY_SETS = PACKAGES.filter((pkg) => Boolean(pkg.items));

/** Tiered occasion journeys (pre-bridal and groom). */
export const OCCASION_RITUALS = PACKAGES.filter((pkg) => Boolean(pkg.tiers));

/** One-line description of what a collection offers: tier names or the number of sets. */
export function packageShape(pkg: SalonPackage): string {
  if (pkg.tiers) return pkg.tiers.map((tier) => tier.name).join(" · ");
  return `${pkg.items?.length ?? 0} curated sets`;
}

/** Splits an inclusion like "Facial — Hydrafacial" into its category and detail. */
export function splitInclusion(line: string): { category: string; detail?: string } {
  const [category, detail] = line.split(" — ");
  return detail ? { category, detail } : { category: line };
}

/** What a set adds beyond its name, so a row never repeats itself: "Also includes Coffee Hands". */
export function setDetail(item: PackageItem): string {
  const name = item.name.toLowerCase();
  const extras = item.includes.filter((part) => !name.includes(part.toLowerCase()));
  if (extras.length > 0) return `Also includes ${extras.join(", ")}`;
  return `${item.includes.length} services, one visit`;
}
