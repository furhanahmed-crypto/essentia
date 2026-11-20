/** Optional public env helpers — no secrets required for the static marketing site. */
export const env = {
  googleSiteVerification: () => process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  bingSiteVerification: () => process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
  gaMeasurementId: () => process.env.NEXT_PUBLIC_GA_ID ?? "",
};
