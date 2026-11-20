import { BRAND } from "@/constants/brand";

const absolute = (path: string) => new URL(path, BRAND.url).toString();
const SAME_AS = Object.values(BRAND.socials).filter(Boolean);
const ORG_ID = `${BRAND.url}/#organization`;

const AREA_SERVED = [
  { "@type": "City", name: "Hyderabad" },
  { "@type": "AdministrativeArea", name: "Telangana" },
];

const ADDRESSES = BRAND.addresses.map(({ street, locality, region }) => ({
  "@type": "PostalAddress",
  streetAddress: street,
  addressLocality: locality,
  addressRegion: region,
  addressCountry: "IN",
}));

export const organizationData = () => ({
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": ORG_ID,
  name: BRAND.fullName,
  alternateName: [BRAND.name, "Essentia Salon Lounge"],
  url: BRAND.url,
  logo: absolute(BRAND.logoMark),
  image: absolute(BRAND.shareImage),
  telephone: "+919644383838",
  email: BRAND.email,
  address: ADDRESSES,
  areaServed: AREA_SERVED,
  sameAs: SAME_AS,
  openingHours: "Mo-Su",
  description: BRAND.description,
});

export const websiteData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND.fullName,
  alternateName: [BRAND.name],
  url: `${BRAND.url}/`,
  publisher: { "@id": ORG_ID },
});

export const faqData = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

export const serviceData = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: absolute(path),
  provider: { "@id": ORG_ID },
  areaServed: AREA_SERVED,
});

export type Crumb = { name: string; path: string };

export const breadcrumbData = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
});
