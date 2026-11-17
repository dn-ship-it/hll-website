import Link from "next/link";

import { GradientRevealTextSlow } from "@/components/hll";
import { RevealRoot } from "@/components/hll/reveal/reveal-root";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import { formatInsightDate, loadInsights } from "@/lib/payload/insights";

import { FUNCTIONAL_STYLE, EngagementMediaBox } from "../engagement/engagement-card";

import { InsightCard, InsightCarousel, InsightTags, insightHref } from "./insight-card";

// Figma Insights (209:929): the line beside "What's New".
const INTRO =
  "Senior talent deployed across the stack with a knowledge graph window showing what customers see.";

const LATEST_COUNT = 6;

/**
 * Figma Insights list (209:929): "What's New" with the featured article, the
 * Latest articles on the gradient band, then every other article in threes.
 */
export async function InsightsPage() {
  const all = await loadInsights();
  const featured = all.find((i) => i.featured) ?? all[0];
  const others = all.filter((i) => i !== featured);
  const latest = others.slice(0, LATEST_COUNT);
  const rest = others.slice(LATEST_COUNT);

  return (
    <MarketingShell>
      <RevealRoot skip=".hll-display, .hll-label">
        <div className="hll-home hll-service-page">
          <div
            className={`grid gap-6 pt-[311px] lg:grid-cols-[731fr_721fr] lg:gap-[30px] lg:pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] ${SERVICE_GUTTER}`}
          >
            <GradientRevealTextSlow
              as="h1"
              text="What’s New"
              variant="engagement"
              className="block font-light text-[var(--hll-dark-grey)]"
              fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
              letterSpacing="0"
              lineHeight="1.16"
            />
            <p
              data-fade-up
              className="text-[20px] leading-[1.16] text-[var(--hll-dark-grey)] lg:pt-[20px] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)]"
            >
              {INTRO}
            </p>
          </div>

          {featured ? (
            <Link
              href={insightHref(featured)}
              className={`group mt-12 block lg:mt-[clamp(3rem,calc(4.96*var(--vw)),4.7rem)] ${SERVICE_GUTTER}`}
            >
              <div data-reveal-media>
                <EngagementMediaBox
                  media={featured.cover}
                  fallbackRatio={1452 / 982}
                  className="!aspect-[343/260] lg:!aspect-[1452/982]"
                >
                  <InsightTags
                    tags={featured.tags}
                    className="absolute bottom-2 left-2 right-2 !flex-wrap-reverse lg:bottom-[13px] lg:left-[13px]"
                  />
                </EngagementMediaBox>
              </div>
              {featured.date ? (
                <p
                  className="hll-label mt-4 text-[10px] uppercase leading-[1.2] text-black lg:mt-[33px] lg:text-[12px]"
                  style={FUNCTIONAL_STYLE}
                >
                  {formatInsightDate(featured.date)}
                </p>
              ) : null}
              <h2 className="mt-3 text-[24px] font-normal leading-[1.16] text-[var(--hll-dark-grey)] group-hover:underline lg:mt-[15px] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)]">
                {featured.title}
              </h2>
              {featured.excerpt ? (
                <p className="mt-2 max-w-[470px] text-[16px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
                  {featured.excerpt}
                </p>
              ) : null}
            </Link>
          ) : (
            <p className={`mt-12 text-[16px] text-[var(--hll-dark-grey)] ${SERVICE_GUTTER}`}>
              Articles are on their way.
            </p>
          )}

          {/* Figma: a 982px band of the gradient, "Latest" 110px in and the
              cards 268px in, running off the right edge. */}
          {latest.length ? (
            <section
              className="relative mt-[100px] overflow-hidden bg-[#1FA7D8] pb-[60px] pt-[60px] lg:mt-[clamp(5rem,calc(9.85*var(--vw)),9.3rem)] lg:pb-[clamp(5rem,calc(15.9*var(--vw)),15rem)] lg:pt-[clamp(4rem,calc(7.28*var(--vw)),6.9rem)]"
              style={{ background: "#1FA7D8 url(/assets/industries/lab-bg.webp) center / cover" }}
            >
              <h2
                className={`text-[30px] font-light leading-[1.16] text-white lg:text-[clamp(30px,calc(4.23*var(--vw)),4rem)] ${SERVICE_GUTTER}`}
              >
                Latest
              </h2>
              <div className="mt-8 lg:mt-[clamp(3rem,calc(5.56*var(--vw)),5.25rem)]">
                <InsightCarousel items={latest} onColour />
              </div>
            </section>
          ) : null}

          {rest.length ? (
            <div
              className={`grid gap-y-12 pt-[84px] sm:grid-cols-2 sm:gap-x-[10px] lg:grid-cols-3 lg:gap-x-5 lg:gap-y-[72px] lg:pt-[clamp(4rem,calc(7*var(--vw)),6.6rem)] ${SERVICE_GUTTER}`}
            >
              {rest.map((item) => (
                <div key={item.id} data-fade-up>
                  <InsightCard insight={item} />
                </div>
              ))}
            </div>
          ) : null}
          <div className="h-[154px] lg:h-[clamp(8rem,calc(16.9*var(--vw)),16rem)]" />
        </div>
      </RevealRoot>
    </MarketingShell>
  );
}
