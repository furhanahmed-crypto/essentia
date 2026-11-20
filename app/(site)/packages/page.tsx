import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { EverydaySets } from "@/components/packages/EverydaySets";
import { OccasionRitual } from "@/components/packages/OccasionRitual";
import { VisitBand } from "@/components/shared/VisitBand";
import content from "@/constants/packages/content.json";
import { OCCASION_RITUALS } from "@/constants/packages";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: content.seoTitle,
  description: content.lead,
  path: ROUTES.packages,
});

type RitualImageKey = keyof typeof content.occasion.images;

export default function PackagesPage() {
  return (
    <>
      <PageHero crumb="Packages" label={content.label} title={content.title} lede={content.lead} path={ROUTES.packages} />
      <EverydaySets />
      {OCCASION_RITUALS.map((pkg, index) => {
        const image = content.occasion.images[pkg.id as RitualImageKey];
        if (!image) return null;
        return (
          <OccasionRitual
            key={pkg.id}
            pkg={pkg}
            index={index + 2}
            tone={index % 2 === 0 ? "night" : "cream"}
            image={image}
            flip={index % 2 === 1}
          />
        );
      })}
      <VisitBand pathname={ROUTES.packages} />
    </>
  );
}
