import { GradientRevealTextSlow, HLLButton } from "@/components/hll";
import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import { ServiceReveal } from "@/components/marketing/services/service-reveal";
import { contactPageContent, type ContactOffice } from "@/data/contact-page";
import { mapContactPage } from "@/lib/payload/marketing-mappers";
import { getMarketingContent } from "@/lib/payload/queries";

import { ContactForm } from "./contact-form";

async function loadContactData() {
  try {
    return mapContactPage(await getMarketingContent(), contactPageContent);
  } catch {
    return contactPageContent;
  }
}

const FUNCTIONAL =
  "hll-label text-[10px] uppercase leading-[1.2] text-[var(--hll-dark-grey)] lg:text-[12px]";
const BODY14 =
  "text-[14px] leading-[1.25] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]";

/** Figma office row: country in Mid Grey, then company, address and tax ID.
 *  Mobile stacks them 32px apart, a hairline to 8px from the edges between. */
function Office({ office }: { office: ContactOffice }) {
  return (
    <li className="pt-8 first:pt-0 lg:pt-[54px]">
      <div className="grid gap-8 pb-8 lg:grid-cols-[377fr_299fr] lg:gap-0 lg:pb-[54px]">
        <p className={`text-[var(--hll-mid-grey)] lg:pt-[6px] ${BODY14}`}>
          {office.country}
        </p>
        <div>
          <p className="text-[20px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1.5rem,calc(1.92*var(--vw)),1.8125rem)]">
            {office.company}
          </p>
          <p className={`mt-8 whitespace-pre-line text-[var(--hll-dark-grey)] lg:mt-12 ${BODY14}`}>
            {office.address}
          </p>
          {office.taxId ? (
            <div className="mt-8">
              <p
                className={FUNCTIONAL}
                style={{ fontFamily: "var(--hll-font-functional)" }}
              >
                {office.taxLabel}
              </p>
              <p className={`mt-[6px] text-[var(--hll-dark-grey)] lg:mt-2 ${BODY14}`}>
                {office.taxId}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <div data-line className="-mx-3 h-px bg-[var(--hll-mid-grey)] lg:mx-0" />
    </li>
  );
}

/** Figma Desktop › Contact (1341:11841). */
export async function ContactPage() {
  const content = await loadContactData();
  const { getInTouch } = content;

  return (
    <MarketingShell>
      <ServiceReveal>
        <div className="hll-home hll-service-page">
          {/* Title (slow anim) with the form beside it, 70px lower. */}
          <section
            className={`grid gap-[55px] pt-[311px] lg:grid-cols-[472fr_864fr_116fr] lg:gap-0 lg:pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] ${SERVICE_GUTTER}`}
          >
            <GradientRevealTextSlow
              as="h1"
              text={content.title}
              variant="contact"
              className="block font-light text-[var(--hll-dark-grey)]"
              fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
              letterSpacing="0"
              lineHeight="1.16"
            />
            <div className="lg:pt-[70px]">
              <ContactForm data={content.form} />
            </div>
          </section>

          {/* Figma "image": an image-only slot, 1452 × 396. */}
          <div className={`pt-[84px] lg:pt-[214px] ${SERVICE_GUTTER}`}>
            <div
              data-service-media
              className="-mx-3 aspect-[386/194] rounded-[6px] bg-[#D9D9D9] lg:mx-0 lg:aspect-[1452/396] lg:w-full"
              style={
                content.image
                  ? {
                      background: `#D9D9D9 url(${content.image}) center / cover`,
                    }
                  : undefined
              }
            />
          </div>

          <section className={`pt-[84px] lg:pt-[85px] ${SERVICE_GUTTER}`}>
            <HomeHeading
              eyebrow={content.offices.eyebrow}
              title={content.offices.title}
            />
            <ul className="mt-[67px] lg:ml-[46.6%] lg:mr-[6.9%] lg:mt-1">
              {content.offices.items.map((office) => (
                <Office key={office.id} office={office} />
              ))}
            </ul>
          </section>

          <section className={`pb-[84px] pt-[84px] lg:pb-[152px] lg:pt-[214px] ${SERVICE_GUTTER}`}>
            <div className="flex flex-wrap items-start justify-between gap-8 lg:items-end lg:pr-[129px]">
              <a
                href={`mailto:${getInTouch.email}`}
                className="min-w-0 break-words hover:opacity-80"
              >
                <HomeHeading
                  eyebrow={getInTouch.eyebrow}
                  title={getInTouch.email}
                  titleSize="clamp(25px, calc(4.23*var(--vw)), 4rem)"
                />
              </a>
              <div className="lg:pb-[18px]">
                <HLLButton
                  href={getInTouch.scheduleHref}
                  variant="contact"
                  size="md"
                  className={BUTTON_MOBILE}
                >
                  {getInTouch.scheduleLabel}
                </HLLButton>
              </div>
            </div>
          </section>
        </div>
      </ServiceReveal>
    </MarketingShell>
  );
}
