import { GradientRevealTextSlow } from "@/components/hll";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import { ServiceReveal } from "@/components/marketing/services/service-reveal";
import { loadEngagements } from "@/lib/payload/engagements";

import { EngagementList } from "./engagement-list";

/** Figma Desktop › Engagement Main (1068:4392) and Filter Expanded (1341:20475). */
export async function EngagementPage() {
  const engagements = await loadEngagements();

  return (
    <MarketingShell>
      <ServiceReveal>
        <div className="hll-home hll-service-page pb-[154px]">
          {/* Figma Engagements mobile: the title at y 385 of the first screen. */}
          <div className={`pt-[311px] lg:pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] ${SERVICE_GUTTER}`}>
            <GradientRevealTextSlow
              as="h1"
              text="Engagements/ Work"
              variant="engagement"
              className="block font-light text-[var(--hll-dark-grey)]"
              fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
              letterSpacing="0"
              lineHeight="1.16"
            />
          </div>
          <EngagementList engagements={engagements} />
        </div>
      </ServiceReveal>
    </MarketingShell>
  );
}
