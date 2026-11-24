import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { Faq } from "@/components/home/faq/Faq";
import { Finale } from "@/components/home/finale/Finale";
import { Gallery } from "@/components/home/gallery/Gallery";
import { Hero } from "@/components/home/hero/Hero";
import { Journey } from "@/components/home/journey/Journey";
import { Manifesto } from "@/components/home/manifesto/Manifesto";
import { Notes } from "@/components/home/notes/Notes";
import { Occasions } from "@/components/home/occasions/Occasions";
import { ServiceStage } from "@/components/home/services/ServiceStage";
import { Story } from "@/components/home/story/Story";
import home from "@/constants/home/content.json";
import { BRAND } from "@/constants/brand";
import { ROUTES } from "@/constants/routes";
import { faqData, websiteData } from "@/utils/structuredData";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: `${BRAND.fullName} | Premium Unisex Salon`,
  description: BRAND.description,
  path: ROUTES.home,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteData()} />
      <JsonLd data={faqData(home.faq.items)} />
      <Hero />
      <Story />
      <ServiceStage />
      <Gallery />
      <Occasions />
      <Manifesto />
      <Journey />
      <Notes />
      <Faq />
      <Finale />
    </>
  );
}
