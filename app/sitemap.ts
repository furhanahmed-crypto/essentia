import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";
import services from "@/constants/services/services.json";
import { ROUTES, servicePath } from "@/constants/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ROUTES.home,
    ROUTES.about,
    ROUTES.services,
    ROUTES.packages,
    ROUTES.contact,
    ROUTES.privacy,
    ...services.map((service) => servicePath(service.slug)),
  ];
  return pages.map((path) => ({ url: new URL(path, BRAND.url).toString() }));
}
