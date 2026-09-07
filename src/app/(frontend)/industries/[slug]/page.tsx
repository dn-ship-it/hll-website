import { notFound } from "next/navigation";

import { HealthcareIndustryPage } from "@/components/marketing/industries/healthcare-page";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "healthcare" || slug === "health-life-sciences") {
    return <HealthcareIndustryPage />;
  }

  const label = slug.replace(/-/g, " ");

  if (slug === "payments" || slug === "insurance") {
    return (
      <MarketingShell>
        <section className="px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.24em] text-black/45">Industry</p>
            <h1
              className="mt-4 font-light capitalize text-black"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {label}
            </h1>
            <p className="mt-6 text-sm leading-7 text-black/55">
              This industry page is coming soon. See the Healthcare template at{" "}
              <a href="/industries" className="underline">
                /industries
              </a>
              .
            </p>
          </div>
        </section>
      </MarketingShell>
    );
  }

  notFound();
}
