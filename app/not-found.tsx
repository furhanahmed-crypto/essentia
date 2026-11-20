import { Cta } from "@/components/shared/editorial/Cta";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center bg-background">
      <div className="shell grid gap-10 py-24 lg:grid-cols-12 lg:items-end">
        <p aria-hidden className="m-0 font-heading text-[clamp(8rem,28vw,20rem)] leading-[0.8] tracking-tighter text-mist lg:col-span-6">
          404
        </p>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="m-0 type-label text-em">Page not found</p>
          <h1 className="mt-4 mb-0 type-title text-ink">
            This page has <em>stepped out</em>.
          </h1>
          <p className="mt-6 mb-0 text-text">That page does not exist. Head home or browse the menu.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Cta href={ROUTES.home}>Home</Cta>
            <Cta href={ROUTES.services} variant="outline">
              The menu
            </Cta>
          </div>
        </div>
      </div>
    </main>
  );
}
