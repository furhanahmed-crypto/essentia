import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.fullName,
    short_name: BRAND.name,
    description: BRAND.description,
    start_url: "/",
    display: "standalone",
    background_color: BRAND.backgroundColor,
    theme_color: BRAND.themeColor,
    icons: [
      { src: "/images/logo/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/images/logo/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
