import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
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
      <h2 className="m-0 type-label text-night-muted">{title}</h2>
      <div className="mt-5 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// Night footer: a closing line, four ruled columns of practical links, and the full-width
// wordmark set at the foot of the page like a magazine colophon.
export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="band-night overflow-hidden pb-14 lg:pb-0">
      <div className="shell pt-20 md:pt-24">
        <div className="grid gap-12 border-b border-line pb-14 md:grid-cols-2 lg:grid-cols-12">
          <p className="m-0 max-w-sm font-heading text-2xl leading-snug text-night-ink lg:col-span-4">
            Hair, skin, grooming, nails and makeup — <em>considered</em>, in Attapur.
          </p>
          <div className="lg:col-span-2 lg:col-start-6">
            <Column title="Studio">
              <ul className="m-0 grid gap-2.5 p-0">
                {FOOTER_LINKS.map(({ label, href }) => (
                  <li key={href} className="list-none">
                    <Link className={link} href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>
          <div className="lg:col-span-2">
            <Column title="Disciplines">
              <ul className="m-0 grid gap-2.5 p-0">
                {SERVICE_NAV.map(({ label, href }) => (
                  <li key={href} className="list-none">
                    <Link className={link} href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>
          <div className="lg:col-span-3">
            <Column title="The lounge">
              <address className="grid gap-2.5 not-italic text-night-ink/85">
                <span>{BRAND.addressLine}</span>
                <span>{BRAND.hoursLine}</span>
                <a className={link} href={BRAND.phoneHref}>
                  {BRAND.phone}
                </a>
                <a className={`${link} break-all`} href={BRAND.emailHref}>
                  {BRAND.email}
                </a>
                <span className="mt-3 flex gap-5">
                  <a className={link} href={WA.home} target="_blank" rel="noopener">
                    WhatsApp ↗
                  </a>
                  <a className={link} href={BRAND.socials.instagram} target="_blank" rel="noopener">
                    Instagram ↗
                  </a>
                </span>
              </address>
            </Column>
          </div>
        </div>

        <Image
          src={BRAND.logoLight}
          alt={BRAND.fullName}
          width={1512}
          height={300}
          sizes="(max-width: 1320px) 92vw, 1320px"
          className="mt-14 h-auto w-full opacity-90"
        />

        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-night-muted sm:flex-row sm:items-center sm:justify-between">
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
