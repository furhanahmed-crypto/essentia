export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  packages: "/packages",
  contact: "/contact",
  privacy: "/privacy-policy",
} as const;

export const servicePath = (slug: string) => `${ROUTES.services}/${slug}`;

export type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

export const SERVICE_NAV = [
  { label: "Hair", href: servicePath("hair") },
  { label: "Skin Care", href: servicePath("skin-care") },
  { label: "Grooming", href: servicePath("grooming") },
  { label: "Nail", href: servicePath("nail") },
  { label: "Makeup", href: servicePath("makeup") },
] as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  {
    label: "Services",
    href: ROUTES.services,
    children: SERVICE_NAV.map(({ label, href }) => ({ label, href })),
  },
  { label: "Packages", href: ROUTES.packages },
  { label: "Contact", href: ROUTES.contact },
];

/** Desktop header splits the links around the centred logo; Home is the logo itself. */
export const NAV_LEFT: NavLink[] = NAV_LINKS.filter(({ href }) =>
  ([ROUTES.about, ROUTES.services, ROUTES.packages] as string[]).includes(href)
);

export const FOOTER_LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "About Us", href: ROUTES.about },
  { label: "Services", href: ROUTES.services },
  { label: "Packages", href: ROUTES.packages },
  { label: "Contact", href: ROUTES.contact },
];
