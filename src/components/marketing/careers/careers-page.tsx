import {
  careersPageContent,
  defaultCareerNotices,
  type CareerNotice,
} from "@/data/careers-page";
import { aboutPage } from "@/data/about";
import { HeroCollage } from "@/components/marketing/about/about-hero";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";
import { VoiceSection } from "@/components/marketing/services/expert-and-related";
import { isNoticeActive, mapCareerToNotice } from "@/lib/payload/careers";
import { mapAboutPage, mapCareersPageContent } from "@/lib/payload/marketing-mappers";
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

/** The four hero images: the About collage's (QA CR-05), until Careers has
 *  photos of its own. */
async function loadCollage() {
  try {
    return mapAboutPage(await getMarketingContent()).hero.images;
  } catch {
    return aboutPage.hero.images;
  }
}

/** Figma Desktop › Careers (1116:7183). */
export async function CareersPage() {
  const [content, roles, collage] = await Promise.all([
    loadCareersContent(),
    loadRoles(),
    loadCollage(),
  ]);
  const voice = content.teamVoice;

  return (
    <MarketingShell>
      <div className="hll-home hll-service-page">
        {/* "see open roles is sticky and takes you to the open roles
            section": pinned to the bottom of the screen until Open Roles. */}
        <div className="relative">
          <PageHero
            title="Careers"
            lead={content.hero.headline}
            collage={<HeroCollage images={collage} />}
          />

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
