import { BRAND } from "@/constants/brand";
import { ROUTES } from "@/constants/routes";

const base = BRAND.whatsapp.split("?")[0];

export const whatsappLink = (text: string) =>
  `${base}?text=${encodeURIComponent(text)}`;

export const WA = {
  home: whatsappLink("Hi, I'd like to know more about Essentia services."),
  contact: whatsappLink("Hi, I'd like to visit Essentia — The Salon Lounge."),
  services: whatsappLink("Hi, I'd like to enquire about a service at Essentia."),
  packages: whatsappLink("Hi, I'd like to know more about Essentia packages."),
} as const;

export function whatsappMessageFor(pathname: string): string {
  if (pathname.startsWith(ROUTES.services)) return "Hi, I'd like to enquire about a service at Essentia.";
  if (pathname.startsWith(ROUTES.packages)) return "Hi, I'd like to know more about Essentia packages.";
  if (pathname.startsWith(ROUTES.contact)) return "Hi, I'd like to visit Essentia — The Salon Lounge.";
  return "Hi, I'd like to know more about Essentia services.";
}
