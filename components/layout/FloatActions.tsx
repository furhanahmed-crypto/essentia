"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "@/components/shared/Icon";
import { ROUTES } from "@/constants/routes";
import { whatsappLink, whatsappMessageFor } from "@/constants/whatsapp";

// Quick contact. Phones and tablets: a flat two-part bar fixed to the bottom edge.
// Desktop: a single square WhatsApp tab in the corner whose label slides out on hover.
export function FloatActions() {
  const pathname = usePathname();
  const href = whatsappLink(whatsappMessageFor(pathname));

  return (
    <>
      <div aria-label="Quick contact" role="region" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-background lg:hidden">
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="flex h-14 items-center justify-center gap-2.5 border-r border-line type-label text-ink"
        >
          <Icon icon={faWhatsapp} className="text-lg text-whatsapp" />
          WhatsApp
        </a>
        <Link
          prefetch={false}
          href={ROUTES.contact}
          className="flex h-14 items-center justify-center bg-ink type-label text-background dark:bg-night-ink dark:text-night"
        >
          Enquire
        </Link>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="group fixed right-6 bottom-6 z-40 hidden h-14 items-center overflow-hidden bg-whatsapp text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)] lg:flex"
      >
        <span className="grid size-14 place-items-center text-2xl">
          <Icon icon={faWhatsapp} />
        </span>
        <span className="max-w-0 overflow-hidden pr-0 type-label whitespace-nowrap transition-[max-width,padding] duration-500 group-hover:max-w-40 group-hover:pr-5 group-focus-visible:max-w-40 group-focus-visible:pr-5">
          Message us
        </span>
      </a>
    </>
  );
}
