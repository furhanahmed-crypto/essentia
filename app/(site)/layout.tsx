import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { FloatActions } from "@/components/layout/FloatActions";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LazyToaster } from "@/components/ui/LazyToaster";
import { JsonLd } from "@/components/shared/JsonLd";
import { organizationData } from "@/utils/structuredData";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll>
        <JsonLd data={organizationData()} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatActions />
        <GoogleAnalytics />
        <LazyToaster
          offset={{ top: 96, right: 92, bottom: 24 }}
          mobileOffset={{ top: 96, left: 16, right: 16, bottom: 88 }}
        />
      </SmoothScroll>
    </MotionProvider>
  );
}
