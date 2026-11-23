import services from "@/constants/services/services.json";
import type { ServiceCategory } from "@/types/services";

/** The five service families in menu order (centralised data in services.json). */
export const SERVICES: readonly ServiceCategory[] = services;

export const findService = (slug: string): ServiceCategory | undefined =>
  SERVICES.find((service) => service.slug === slug);

/** Total listed treatments in a family, for the "38 treatments" counts. */
export const treatmentCount = (service: ServiceCategory): number =>
  service.groups.reduce((total, group) => total + group.items.length, 0);

/** A short taste of a family's menu: the first item of each group, up to `limit`. */
export const signatureTreatments = (service: ServiceCategory, limit = 4): string[] => {
  const perGroup = Math.max(1, Math.ceil(limit / service.groups.length));
  return service.groups.flatMap((group) => group.items.slice(0, perGroup)).slice(0, limit);
};
