import { GradientRevealTextSlow, HLLButton } from "@/components/hll";
import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import { ServiceReveal } from "@/components/marketing/services/service-reveal";
import { ReachMapEmbed } from "@/components/marketing/about/reach-map-embed";
import { contactPageContent } from "@/data/contact-page";
import { mapContactPage } from "@/lib/payload/marketing-mappers";
import { getMarketingContent } from "@/lib/payload/queries";

import { ContactForm } from "./contact-form";
import { ContactOffices } from "./contact-offices";

async function loadContactData() {
  try {
    const marketing = await getMarketingContent();
    return { content: mapContactPage(marketing, contactPageContent) };
  } catch {
    return { content: contactPageContent };
  }
}

/** Figma Desktop › Contact (1341:11841). */
export async function ContactPage() {
  const { content } = await loadContactData();
  const { getInTouch } = content;

  return (
    <MarketingShell>
      <ServiceReveal>
        <div className="hll-home hll-service-page">
          {/* Figma "Contact – v2 (accordion)" (QA CT-02): the title (slow
              anim) with the reply-time line under it, the form beside. */}
          <section
            className={`grid gap-[55px] pt-[311px] lg:grid-cols-[547fr_865fr_40fr] lg:gap-0 lg:pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] ${SERVICE_GUTTER}`}
          >
            <div>
              <GradientRevealTextSlow
                as="h1"
                text={content.title}
                variant="contact"
                className="block font-light text-[var(--hll-dark-grey)]"
                fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
                letterSpacing="0"
                lineHeight="1.16"
              />
              {content.intro ? (
                <p
                  data-fade-up
                  className="mt-6 max-w-[372px] text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:mt-[24px] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]"
                >
                  {content.intro}
                </p>
              ) : null}
            </div>
            <div className="lg:-mt-[3px]">
              <ContactForm data={content.form} />
            </div>
          </section>

          {/* "The same interactive map as the About page." */}
          <div className="px-2 pt-[84px] lg:px-[20px] lg:pt-[clamp(5rem,calc(10.6*var(--vw)),10rem)]">
            <ReachMapEmbed />
          </div>

          {/* Get in touch: book a call, or the office closest to you – an
              accordion per country in the form's column. */}
          <section className={`pb-[84px] pt-[84px] lg:pb-[152px] lg:pt-[clamp(3rem,calc(5.95*var(--vw)),5.625rem)] ${SERVICE_GUTTER}`}>
            <HomeHeading eyebrow={getInTouch.eyebrow} title={getInTouch.title} />
            {getInTouch.text ? (
              <p
                data-fade-up
                className="mt-6 max-w-[500px] text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:mt-[24px] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]"
              >
                {getInTouch.text}
              </p>
            ) : null}
            <div className="mt-6 lg:mt-[48px]">
              <HLLButton href={getInTouch.scheduleHref} variant="contact" size="md" className={BUTTON_MOBILE}>
                {getInTouch.scheduleLabel}
              </HLLButton>
            </div>
            <div className="mt-[67px] lg:ml-[37.67%] lg:mr-[2.75%] lg:mt-[69px]">
              <ContactOffices offices={content.offices.items} />
            </div>
          </section>
        </div>
      </ServiceReveal>
    </MarketingShell>
  );
}
