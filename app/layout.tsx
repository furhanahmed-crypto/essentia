import type { Metadata, Viewport } from "next";
import { Caveat, Libre_Baskerville, Merriweather } from "next/font/google";
import { env } from "@/config/env";
import { BRAND } from "@/constants/brand";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
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
      className={`${libreBaskerville.variable} ${merriweather.variable} ${caveat.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
