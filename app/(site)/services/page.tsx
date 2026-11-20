import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ServicesAtlas } from "@/components/services/ServicesAtlas";
import { VisitBand } from "@/components/shared/VisitBand";
import content from "@/constants/services/content.json";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: content.index.seoTitle,
  description: content.index.lead,
  path: ROUTES.services,
});

export default function ServicesPage() {
  const { index } = content;
  return (
    <>
      <PageHero crumb="Services" label={index.label} title={index.title} lede={index.lead} path={ROUTES.services} />
      <ServicesAtlas />
      <VisitBand pathname={ROUTES.services} />
    </>
  );
}
