import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Band } from "@/components/shared/editorial/Band";
import privacy from "@/constants/legal/privacy.json";
import { ROUTES } from "@/constants/routes";
import { indexOf } from "@/utils/emphasis";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Essentia",
  description: "What Essentia collects when you contact us, why, and how to reach us about your data.",
  path: ROUTES.privacy,
});

// Kept in the project but not on the website: the leading underscore makes this a Next.js private
// folder, so it has no route. To publish it, rename the folder to `privacy-policy`, then re-add
// ROUTES.privacy to app/sitemap.ts and a footer link in components/layout/SiteFooter.tsx.
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero crumb="Privacy Policy" label={`Last updated · ${privacy.updated}`} title="Privacy *policy*" lede={privacy.intro} path={ROUTES.privacy} />
      <Band tone="ivory" className="pt-0 md:pt-4">
        <div className="grid gap-10 lg:grid-cols-12">
          {privacy.sections.map((section, index) => (
            <section key={section.title} className="border-t border-line pt-8 lg:col-span-8 lg:col-start-3">
              <div className="grid gap-4 sm:grid-cols-[4rem_minmax(0,1fr)]">
                <span className="pt-2 type-label text-em">{indexOf(index + 1)}</span>
                <div>
                  <h2 className="m-0 type-heading text-ink">{section.title}</h2>
                  <ul className="mt-5 mb-0 grid gap-3 pl-5 text-text marker:text-primary">
                    {section.items.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </Band>
    </>
  );
}
