import {
  careersPageContent,
  defaultCareerNotices,
  type CareerNotice,
} from "@/data/careers-page";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";
import { VoiceSection } from "@/components/marketing/services/expert-and-related";
import { isNoticeActive, mapCareerToNotice } from "@/lib/payload/careers";
import { mapCareersPageContent } from "@/lib/payload/marketing-mappers";
import {
  getMarketingContent,
  getPublishedCareers,
} from "@/lib/payload/queries";

import {
  CareersApproach,
  CareersOpenRoles,
  CareersProcess,
  SeeOpenRoles,
} from "./careers-sections";

export async function loadRoles(): Promise<CareerNotice[]> {
  try {
    const careers = await getPublishedCareers();
    const mapped = careers
      .map(mapCareerToNotice)
      .filter((notice) => isNoticeActive(notice));
    if (mapped.length > 0) return mapped;
  } catch {
    // fall through
  }
  return defaultCareerNotices.filter((notice) => isNoticeActive(notice));
}

export async function loadCareersContent() {
  try {
    return mapCareersPageContent(
      await getMarketingContent(),
      careersPageContent,
    );
  } catch {
    return careersPageContent;
  }
}

/** Figma Desktop › Careers (1116:7183). */
export async function CareersPage() {
  const [content, roles] = await Promise.all([
    loadCareersContent(),
    loadRoles(),
  ]);
  const voice = content.teamVoice;

  return (
    <MarketingShell>
      <div className="hll-home hll-service-page">
        {/* "see open roles is sticky and takes you to the open roles
            section": pinned to the bottom of the screen until Open Roles. */}
        <div className="relative">
          <PageHero title="Careers" lead={content.hero.headline} />

          <div className="pt-[84px] lg:pb-[61px]">
            <VoiceSection
              divider={false}
              headingInset
              slides={
                content.teamVoices?.length
                  ? content.teamVoices
                  : [{ quote: voice.quote, name: voice.name, role: voice.role }]
              }
              timerColor="var(--hll-mid-grey)"
              heading={
                <HomeHeading
                  eyebrow="Careers"
                  title="Team Voice"
                  eyebrowColor="var(--hll-mid-grey)"
                />
              }
            />
          </div>

          <div data-line className="mx-2 h-px bg-[var(--hll-mid-grey)] lg:mx-[10px]" />
          <CareersApproach data={content.approach} />
          <SeeOpenRoles />
        </div>
        <CareersOpenRoles
          roles={roles}
          emptyMessage={content.notices.emptyMessage}
        />
        <CareersProcess data={content.process} />
      </div>
    </MarketingShell>
  );
}
