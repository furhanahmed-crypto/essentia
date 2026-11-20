import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Band } from "@/components/shared/editorial/Band";
import content from "@/constants/contact/content.json";
import { BRAND } from "@/constants/brand";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: `Contact | ${BRAND.name}`,
  description: content.hero.lede,
  path: ROUTES.contact,
});

export default function ContactPage() {
  const { hero } = content;
  return (
    <>
      <PageHero crumb={hero.crumb} label={hero.label} title={hero.title} lede={hero.lede} path={ROUTES.contact} />
      <Band tone="ivory" className="pt-0 md:pt-4">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <ContactDetails />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </Band>
    </>
  );
}
