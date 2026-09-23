import { OurPromise } from "@/components/hll";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { HomeHero, OurClients, WhatWeDo } from "@/components/marketing/home/hero-and-services";
import { OurImpact } from "@/components/marketing/home/our-impact";
import {
  HomeCta,
  HowWeWork,
  InsideTheLab,
  WhoWeAre,
} from "@/components/marketing/home/sections-bottom";
import { getMarketingContent } from "@/lib/payload/queries";
import { getCmsImageUrl } from "@/lib/payload/marketing-mappers";

export default async function HomePage() {
  let heroHeading: string | undefined;
  let heroCtaLabel: string | undefined;
  let heroCtaHref: string | undefined;
  let heroImageUrl: string | null = null;

  try {
    const marketing = await getMarketingContent();
    heroHeading = marketing?.home?.heroHeading ?? undefined;
    heroCtaLabel = marketing?.home?.heroCtaLabel ?? undefined;
    heroCtaHref = marketing?.home?.heroCtaHref ?? undefined;
    heroImageUrl = getCmsImageUrl(marketing?.home?.heroImage);
  } catch {
    // defaults in HomeHero
  }

  return (
    <MarketingShell>
      <div className="hll-home">
        <HomeHero
          heading={heroHeading}
          ctaLabel={heroCtaLabel}
          ctaHref={heroCtaHref}
          heroImageUrl={heroImageUrl}
        />
        <WhatWeDo />
        <OurClients />
        <OurPromise />
        <OurImpact />
        <HowWeWork />
        <WhoWeAre />
        <InsideTheLab />
        <HomeCta />
      </div>
    </MarketingShell>
  );
}
