import { GradientRevealTextSlow, HLLButton } from "@/components/hll";
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
  "hll-label text-[12px] uppercase leading-[1.2] text-[var(--hll-dark-grey)]";

/** Figma office row: country in Mid Grey, then company, address and tax ID. */
function Office({ office }: { office: ContactOffice }) {
  return (
    <li className="pt-[54px] first:pt-0">
      <div className="grid gap-4 pb-[54px] sm:grid-cols-[377fr_299fr] sm:gap-0">
        <p className="pt-[6px] text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-mid-grey)]">
          {office.country}
        </p>
        <div>
          <p className="text-[clamp(1.5rem,calc(1.92*var(--vw)),1.8125rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
            {office.company}
          </p>
          <p className="mt-12 whitespace-pre-line text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
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
              <p className="mt-2 text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                {office.taxId}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
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
            className={`grid gap-12 pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] lg:grid-cols-[472fr_864fr_116fr] lg:gap-0 ${SERVICE_GUTTER}`}
          >
            <GradientRevealTextSlow
              as="h1"
              text={content.title}
              variant="contact"
              className="block font-light text-[var(--hll-dark-grey)]"
              fontSize="clamp(2.5rem, calc(4.23*var(--vw)), 4rem)"
              letterSpacing="0"
              lineHeight="1.16"
            />
            <div className="lg:pt-[70px]">
              <ContactForm data={content.form} />
            </div>
          </section>

          {/* Figma "image": an image-only slot, 1452 × 396. */}
          <div className={`pt-[214px] ${SERVICE_GUTTER}`}>
            <div
              data-service-media
              className="aspect-[1452/396] w-full rounded-[6px] bg-[#D9D9D9]"
              style={
                content.image
                  ? {
                      background: `#D9D9D9 url(${content.image}) center / cover`,
                    }
                  : undefined
              }
            />
          </div>

          <section className={`pt-[85px] ${SERVICE_GUTTER}`}>
            <HomeHeading
              eyebrow={content.offices.eyebrow}
              title={content.offices.title}
            />
            <ul className="mt-1 lg:ml-[46.6%] lg:mr-[6.9%]">
              {content.offices.items.map((office) => (
                <Office key={office.id} office={office} />
              ))}
            </ul>
          </section>

          <section className={`pt-[214px] pb-[152px] ${SERVICE_GUTTER}`}>
            <div className="flex flex-wrap items-end justify-between gap-8 lg:pr-[129px]">
              <a
                href={`mailto:${getInTouch.email}`}
                className="min-w-0 break-words hover:opacity-80"
              >
                <HomeHeading
                  eyebrow={getInTouch.eyebrow}
                  title={getInTouch.email}
                />
              </a>
              <div className="lg:pb-[18px]">
                <HLLButton
                  href={getInTouch.scheduleHref}
                  variant="contact"
                  size="md"
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
