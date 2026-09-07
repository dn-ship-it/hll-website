import { notFound } from "next/navigation";

import {
  GradientRevealText,
  HLLButton,
  SERVICE_VARIANTS,
  VARIANT_GRADIENTS,
  type ServiceVariant,
} from "@/components/hll";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export default async function ServiceVerticalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SERVICE_VARIANTS.includes(slug as ServiceVariant)) {
    notFound();
  }

  const variant = slug as ServiceVariant;
  const { colors } = VARIANT_GRADIENTS[variant];
  const label = variant.replace("hll-", "").replace(/-/g, " ");

  return (
    <MarketingShell>
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div
            className="mb-8 h-1.5 w-24 rounded-full"
            style={{ background: `linear-gradient(90deg, ${colors.join(", ")})` }}
          />
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Service vertical</p>
          <GradientRevealText
            text={label}
            variant={variant}
            className="mt-6 capitalize"
            fontSize="clamp(2rem, 5vw, 3.25rem)"
          />
          <p className="mt-8 text-lg leading-8 text-white/65">
            Placeholder content for the {label} vertical. Replace with Figma MCP-built
            sections as each frame is implemented.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <HLLButton href="/services" variant="services">
              All services
            </HLLButton>
            <HLLButton href="/contact" variant={variant}>
              Discuss {label}
            </HLLButton>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
