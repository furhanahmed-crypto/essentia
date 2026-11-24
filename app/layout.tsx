import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Caveat, Manrope } from "next/font/google";
import { env } from "@/config/env";
import { BRAND } from "@/constants/brand";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.fullName} | Premium Unisex Salon`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: BRAND.fullName,
    locale: BRAND.locale,
    images: [{ url: BRAND.shareImage, width: 1200, height: 630, alt: BRAND.shareImageAlt }],
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: env.googleSiteVerification() || undefined,
    other: env.bingSiteVerification() ? { "msvalidate.01": env.bingSiteVerification() } : undefined,
  },
};

export const viewport: Viewport = { themeColor: BRAND.themeColor };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${bodoniModa.variable} ${manrope.variable} ${caveat.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
