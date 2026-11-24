import { cacheLife } from "next/cache";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND } from "@/constants/brand";
import { FOOTER_LINKS, ROUTES, SERVICE_NAV } from "@/constants/routes";
import { WA } from "@/constants/whatsapp";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const link = "link-draw text-night-ink/85 transition-colors hover:text-night-ink";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="m-0 type-kicker tracking-[0.16em] text-night-muted uppercase">{title}</h2>
      <div className="mt-5 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function LinkList({ links }: { links: readonly { label: string; href: string }[] }) {
  return (
    <ul className="m-0 grid gap-2.5 p-0">
      {links.map(({ label, href }) => (
        <li key={href} className="list-none">
          <Link className={link} href={href}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Night footer: a closing line and three columns of practical links, then the brand name rising
// at full width as the last thing on the page.
export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="band-night overflow-hidden pb-14 lg:pb-0">
      <div className="shell pt-20 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="m-0 max-w-sm font-heading text-3xl leading-tight text-night-ink">
              Hair, skin, grooming, nails and makeup — considered, in Attapur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WA.home}
                target="_blank"
                rel="noopener"
                className="rounded-full bg-night-ink px-5 py-2.5 type-kicker tracking-[0.12em] text-night uppercase transition-colors hover:bg-primary hover:text-white"
              >
                WhatsApp ↗
              </a>
              <a
                href={BRAND.socials.instagram}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-night-ink/30 px-5 py-2.5 type-kicker tracking-[0.12em] text-night-ink uppercase transition-colors hover:border-night-ink"
              >
                Instagram ↗
              </a>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-7">
            <Column title="Studio">
              <LinkList links={FOOTER_LINKS} />
            </Column>
          </div>
          <div className="lg:col-span-2">
            <Column title="Disciplines">
              <LinkList links={SERVICE_NAV} />
            </Column>
          </div>
          <div className="lg:col-span-3">
            <Column title="The lounge">
              <address className="grid gap-2.5 text-night-ink/85 not-italic">
                <span>{BRAND.addressLine}</span>
                <span>{BRAND.hoursLine}</span>
                <a className={link} href={BRAND.phoneHref}>
                  {BRAND.phone}
                </a>
                <a className={`${link} break-all`} href={BRAND.emailHref}>
                  {BRAND.email}
                </a>
              </address>
            </Column>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <Reveal y={120}>
            <p aria-hidden className="m-0 text-center type-mega text-night-ink/90 select-none" style={{ fontSize: "min(1rem + 18vw, 22rem)" }}>
              {BRAND.name}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-2 py-6 text-xs text-night-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">
            &copy; {year} {BRAND.name}. {BRAND.disclaimer}
          </p>
          <Link href={ROUTES.privacy} className={link}>
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
