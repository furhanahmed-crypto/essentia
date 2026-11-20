export type ServiceGroup = {
  title: string;
  note?: string;
  items: string[];
};

export type ServiceCategory = {
  slug: string;
  name: string;
  short: string;
  summary: string;
  about: string;
  image: string;
  image_secondary: string;
  imageAlt: string;
  imageSecondaryAlt: string;
  seoTitle: string;
  seoDescription?: string;
  groups: ServiceGroup[];
};

export type PackageItem = {
  name: string;
  includes: string[];
};

export type PackageTier = {
  name: string;
  includes: string[];
};

export type SalonPackage = {
  id: string;
  audience: string;
  category: string;
  name: string;
  summary: string;
  items?: PackageItem[];
  tiers?: PackageTier[];
};
