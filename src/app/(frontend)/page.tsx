import { OurPromise } from "@/components/hll";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { HomeHero, OurClients, WhatWeDo } from "@/components/marketing/home/hero-and-services";
import { OurImpact } from "@/components/marketing/home/our-impact";
import {
  HowWeWork,
  InsideTheLab,
  WhoWeAre,
} from "@/components/marketing/home/sections-bottom";
import { getMarketingContent } from "@/lib/payload/queries";
import { homePageContent } from "@/data/home";
import { getCmsImageUrl, mapHomePage } from "@/lib/payload/marketing-mappers";

/** "Line one. / Line two." with the design's coloured full stop; undefined
 *  keeps the component's own headline. */
function promiseHeadline(line1?: string | null, line2?: string | null) {
  const first = line1?.trim();
  if (!first) return undefined;
  const stop = first.endsWith(".");
  return (
    <>
      {stop ? first.slice(0, -1) : first}
      {stop ? <span className="our-promise-question-mark">.</span> : null}
      {line2?.trim() ? (
        <>
          <br />
          {line2.trim()}
        </>
      ) : null}
    </>
  );
}

export default async function HomePage() {
  let heroHeading: string | undefined;
  let heroCtaLabel: string | undefined;
  let heroCtaHref: string | undefined;
  let heroImageUrl: string | null = null;
  let heroVideoUrl: string | null = null;
  let content = homePageContent;
  let promise: { eyebrow?: string | null; line1?: string | null; line2?: string | null } | undefined;

  try {
    const marketing = await getMarketingContent();
    heroHeading = marketing?.home?.heroHeading ?? undefined;
    heroCtaLabel = marketing?.home?.heroCtaLabel ?? undefined;
    heroCtaHref = marketing?.home?.heroCtaHref ?? undefined;
    heroImageUrl = getCmsImageUrl(marketing?.home?.heroImage);
    heroVideoUrl = getCmsImageUrl(marketing?.home?.heroVideo);
    content = mapHomePage(marketing);
    promise = marketing?.home?.promise ?? undefined;
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
          heroVideoUrl={heroVideoUrl}
        />
        <WhatWeDo data={content.whatWeDo} />
        <OurClients data={content.clients} />
        <OurPromise
          impactGraph
          eyebrow={promise?.eyebrow?.trim() || undefined}
          headline={promiseHeadline(promise?.line1, promise?.line2)}
        />
        <OurImpact data={content.impact} />
        <HowWeWork data={content.howWeWork} />
        <WhoWeAre data={content.whoWeAre} />
        <InsideTheLab data={content.lab} />
      </div>
    </MarketingShell>
  );
}
