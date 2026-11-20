import type { Metadata } from "next";
import { AboutPromise } from "@/components/about/AboutPromise";
import { AboutStory } from "@/components/about/AboutStory";
import { PageHero } from "@/components/layout/PageHero";
import { VisitBand } from "@/components/shared/VisitBand";
import content from "@/constants/about/content.json";
import { BRAND } from "@/constants/brand";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: `About | ${BRAND.name}`,
  description: content.hero.lede,
  path: ROUTES.about,
});

export default function AboutPage() {
  const { hero } = content;
  return (
    <>
      <PageHero
        crumb={hero.crumb}
        label={hero.label}
        title={hero.title}
        lede={hero.lede}
        path={ROUTES.about}
        image={{ src: hero.image, alt: hero.imageAlt, position: hero.imagePosition }}
      />
      <AboutStory />
      <AboutPromise />
      <VisitBand pathname={ROUTES.about} />
    </>
  );
}
