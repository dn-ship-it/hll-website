import { notFound, redirect } from "next/navigation";

import { HLLFoundationPage } from "@/components/marketing/services/foundation-page";
import { SERVICE_VARIANTS, type ServiceVariant } from "@/components/hll";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export default async function ServiceVerticalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "hll-foundation") {
    return <HLLFoundationPage />;
  }

  if (!SERVICE_VARIANTS.includes(slug as ServiceVariant)) {
    notFound();
  }

  const label = slug.replace("hll-", "").replace(/-/g, " ");

  return (
    <MarketingShell>
      <section className="px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.24em] text-black/45">Service vertical</p>
          <h1
            className="mt-4 font-light capitalize text-black"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {label}
          </h1>
          <p className="mt-6 text-sm leading-7 text-black/55">
            This vertical page is coming soon. See the HLL Foundation services template at{" "}
            <a href="/services" className="underline">
              /services
            </a>
            .
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
