import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { VisitBand } from "@/components/shared/VisitBand";
import { NextChapters } from "@/components/services/NextChapters";
import { ServiceOverview } from "@/components/services/ServiceOverview";
import { TreatmentMenu } from "@/components/services/TreatmentMenu";
import content from "@/constants/services/content.json";
import { ROUTES, servicePath } from "@/constants/routes";
import { SERVICES, findService } from "@/constants/services";
import { indexOf } from "@/utils/emphasis";
import { pageMetadata } from "@/utils/seo";
import { serviceData } from "@/utils/structuredData";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

const RELATED_COUNT = 3;

export function generateStaticParams() {
  return SERVICES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription ?? service.summary,
    path: servicePath(service.slug),
  });
}

export default async function ServicePage({ params }: Props) {
  const service = findService((await params).slug);
  if (!service) redirect(ROUTES.services);
  const position = SERVICES.findIndex((entry) => entry.slug === service.slug);
  // The chapters that follow this one in menu order, wrapping round to the start.
  const related = Array.from({ length: RELATED_COUNT }, (_, offset) => SERVICES[(position + offset + 1) % SERVICES.length]);
  const copy = content.detail;

  return (
    <>
      <JsonLd data={serviceData(service.name, service.seoDescription ?? service.summary, servicePath(service.slug))} />
      <PageHero
        label={`${copy.label} ${indexOf(position + 1)} of ${indexOf(SERVICES.length)}`}
        title={service.name}
        lede={service.summary}
        path={servicePath(service.slug)}
        parent={{ name: "Services", path: ROUTES.services }}
      />
      <ServiceOverview service={service} label={copy.overviewLabel} />
      <TreatmentMenu groups={service.groups} label={copy.listLabel} title={copy.listTitle} note={copy.listNote} />
      <NextChapters items={related} label={copy.relatedLabel} title={copy.relatedTitle} />
      <VisitBand pathname={servicePath(service.slug)} />
    </>
  );
}
