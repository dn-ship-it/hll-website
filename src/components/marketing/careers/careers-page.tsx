import {
  careersPageContent,
  defaultCareerNotices,
  type CareerNotice,
} from "@/data/careers-page";
import { HomeCta } from "@/components/marketing/home/sections-bottom";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import {
  isNoticeActive,
  mapCareerToNotice,
} from "@/lib/payload/careers";
import { mapCareersPageContent } from "@/lib/payload/marketing-mappers";
import { getMarketingContent, getPublishedCareers } from "@/lib/payload/queries";
import { CareersBreadcrumb } from "./careers-chrome";
import { CareersCultureSection } from "./careers-culture";
import { CareersHero } from "./careers-hero";
import { CareersNoticesSection } from "./careers-notices";
import { CareersReveal } from "./careers-reveal";

async function loadNotices(): Promise<CareerNotice[]> {
  try {
    const careers = await getPublishedCareers();
    const mapped = careers.map(mapCareerToNotice).filter((notice) => isNoticeActive(notice));
    if (mapped.length > 0) return mapped;
  } catch {
    // fall through
  }

  return defaultCareerNotices.filter((notice) => isNoticeActive(notice));
}

async function loadCareersContent() {
  try {
    const marketing = await getMarketingContent();
    return mapCareersPageContent(marketing, careersPageContent);
  } catch {
    return careersPageContent;
  }
}

export async function CareersPage() {
  const [content, notices] = await Promise.all([loadCareersContent(), loadNotices()]);

  return (
    <MarketingShell>
      <CareersReveal>
        <div className="hll-careers-page">
          <div className="space-y-4 px-[clamp(1.25rem,4vw,3rem)] pt-6">
            <div className="mx-auto max-w-[90rem]">
              <CareersBreadcrumb items={content.breadcrumb} />
            </div>
          </div>

          <CareersHero data={content.hero} accentColor={content.accentColor} />
          <CareersNoticesSection
            content={content.notices}
            notices={notices}
            accentColor={content.accentColor}
          />
          <CareersCultureSection data={content.culture} accentColor={content.accentColor} />
          <HomeCta />
        </div>
      </CareersReveal>
    </MarketingShell>
  );
}
