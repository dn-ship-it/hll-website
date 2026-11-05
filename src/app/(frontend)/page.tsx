import { OurPromise } from "@/components/hll";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { RevealRoot } from "@/components/hll/reveal/reveal-root";
import { HomeHero, OurClients } from "@/components/marketing/home/hero-and-services";
import { AllCapabilities } from "@/components/marketing/services/all-capabilities";
import { getCapabilitiesWheel } from "@/components/marketing/services/all-capabilities-page";
import { OurImpact } from "@/components/marketing/home/our-impact";
import {
  HowWeWork,
  InsideTheLab,
  WhoWeAre,
} from "@/components/marketing/home/sections-bottom";
import { getMarketingContent } from "@/lib/payload/queries";
import { loadEngagements } from "@/lib/payload/engagements";
import { homePageContent } from "@/data/home";
import { getCmsImageUrl, mapHomePage } from "@/lib/payload/marketing-mappers";

/** "Line one. / Line two." with the design's coloured full stop; undefined
 *  keeps the component's own headline. A first line that doesn't end its
 *  sentence ("…move faster,") runs on into the second instead of breaking,
 *  which left "faster," alone on a line (Hannan, 28 Oct). */
function promiseHeadline(line1?: string | null, line2?: string | null) {
  const first = line1?.trim();
  if (!first) return undefined;
  const stop = first.endsWith(".");
  const second = line2?.trim();
  return (
    <>
      {stop ? first.slice(0, -1) : first}
      {stop ? <span className="our-promise-question-mark">.</span> : null}
      {second ? (
        <>
          {stop ? <br /> : " "}
          {second}
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
  const capabilities = await getCapabilitiesWheel();

  // A tile on a named client's engagement plays its card video (5 Nov
  // handoff): the slot is the one its image was cut for, and the wide tile,
  // which had its own still, takes the wide card.
  const engagements = await loadEngagements();
  content = {
    ...content,
    impact: {
      ...content.impact,
      cards: content.impact.cards.map((card, i, all) => {
        const slug = card.href?.match(/^\/engagement\/([^/?#]+)/)?.[1];
        const cardMedia = engagements.find((e) => e.slug === slug)?.art?.cardMedia;
        if (!cardMedia) return card;
        const slot =
          card.image?.match(/--(card-[a-z]+_\d+x\d+)/)?.[1] ??
          (i === all.length - 1 ? "card-wide_991x490" : undefined);
        const media = slot ? cardMedia[slot] : undefined;
        return media ? { ...card, media } : card;
      }),
    },
  };

  return (
    <MarketingShell>
      {/* House of Katha's reveal animations (5 Nov): paragraphs fade in word
          by word, images grow in from a blur. Headings (.hll-display) and
          eyebrows (.hll-label) keep their own reveal. */}
      <RevealRoot
        className="hll-home"
        skip=".hll-display, .hll-label"
        card={{ card: "[data-reveal-card]", text: ".reveal-card-text", image: ".reveal-card-photo" }}
      >
        <HomeHero
          heading={heroHeading}
          ctaLabel={heroCtaLabel}
          ctaHref={heroCtaHref}
          heroImageUrl={heroImageUrl}
          heroVideoUrl={heroVideoUrl}
        />
        {/* The All Capabilities wheel, which Hannan preferred to the Home
            one (2 Nov); here the page's scroll turns it, from the top. */}
        <AllCapabilities services={capabilities.services} scrollDriven headingAs="h2" />
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
      </RevealRoot>
    </MarketingShell>
  );
}
