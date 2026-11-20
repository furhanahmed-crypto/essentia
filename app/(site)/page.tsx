import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { Band } from "@/components/shared/editorial/Band";
import { VisitBand } from "@/components/shared/VisitBand";
import { Cover } from "@/components/home/Cover";
import { GuestNotes } from "@/components/home/GuestNotes";
import { Lookbook } from "@/components/home/Lookbook";
import { Lounge } from "@/components/home/Lounge";
import { MenuIndex } from "@/components/home/MenuIndex";
import { Questions } from "@/components/home/Questions";
import { Rituals } from "@/components/home/Rituals";
import { Statement } from "@/components/home/Statement";
import home from "@/constants/home/content.json";
import { BRAND } from "@/constants/brand";
import { ROUTES } from "@/constants/routes";
import { emphasis } from "@/utils/emphasis";
import { faqData, websiteData } from "@/utils/structuredData";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: `${BRAND.fullName} | Premium Unisex Salon`,
  description: BRAND.description,
  path: ROUTES.home,
});

export default function HomePage() {
  const { testimonials } = home;
  return (
    <>
      <JsonLd data={websiteData()} />
      <JsonLd data={faqData(home.faq.items)} />
      <Cover />
      <Statement />
      <MenuIndex />
      <Lookbook />
      <Rituals />
      <Lounge />
      <Band tone="ivory" ariaLabelledby="notes-title">
        <GuestNotes label={testimonials.label} title={emphasis(testimonials.title)} items={testimonials.items} />
      </Band>
      <Questions />
      <VisitBand pathname={ROUTES.home} />
    </>
  );
}
