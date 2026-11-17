import { GradientRevealTextSlow } from "@/components/hll";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import { RevealRoot } from "@/components/hll/reveal/reveal-root";
import { loadEngagements } from "@/lib/payload/engagements";

import { EngagementList } from "./engagement-list";

export async function EngagementPage() {
  const engagements = await loadEngagements();

  return (
    <MarketingShell>
      {/* Card images grow in from a blur, card text fades in word by word. */}
      <RevealRoot skip=".hll-display, .hll-label">
        <div className="hll-home hll-service-page pb-[154px]">
          <div className={`pt-[311px] lg:pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] ${SERVICE_GUTTER}`}>
            <GradientRevealTextSlow
              as="h1"
              text="Engagements / Work"
              variant="engagement"
              className="block font-light text-[var(--hll-dark-grey)]"
              fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
              letterSpacing="0"
              lineHeight="1.16"
            />
          </div>
          <EngagementList engagements={engagements} />
        </div>
      </RevealRoot>
    </MarketingShell>
  );
}
