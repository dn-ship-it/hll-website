import { notFound } from "next/navigation";

import { GradientRevealTextSlow, HLLButton } from "@/components/hll";
import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import { placeholderJdSections } from "@/data/careers-page";

import { loadCareersContent, loadRoles } from "./careers-page";
import { OutlineTag, roleTags } from "./role-tags";
import { JdAccordion } from "./jd-accordion";

/** Figma Desktop › JD (1116:7340): the detail page of one open role. */
export async function JdPage({ slug }: { slug: string }) {
  const [roles, content] = await Promise.all([loadRoles(), loadCareersContent()]);
  const role = roles.find((r) => r.slug === slug);
  if (!role) notFound();

  const tags = roleTags(role);
  // Figma: "Apply button takes you to the email."
  const applyHref = role.applyUrl ?? `mailto:careers@hyperlychee.com?subject=${encodeURIComponent(role.title)}`;
  const sections = role.sections?.length ? role.sections : placeholderJdSections;

  return (
    <MarketingShell>
      <div className="hll-home hll-service-page">
        {/* Figma JD mobile: title at y 385, tags 12px under it, the summary
            54px below, Apply 84px under that. */}
        <section className={`pt-[311px] lg:pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] ${SERVICE_GUTTER}`}>
          <div className="grid gap-[54px] lg:grid-cols-[653fr_799fr] lg:gap-0">
            <div>
              <GradientRevealTextSlow
                as="h1"
                text={role.title}
                variant="contact"
                className="block font-light text-[var(--hll-dark-grey)]"
                fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
                letterSpacing="0"
                lineHeight="1.16"
              />
              {tags.length ? (
                <div className="mt-3 flex flex-wrap gap-[6px] lg:mt-8 lg:gap-2">
                  {tags.map((tag) => (
                    <OutlineTag key={tag} size="hero">{tag}</OutlineTag>
                  ))}
                </div>
              ) : null}
            </div>
            <p className="max-w-[344px] text-[24px] leading-[1.16] text-[var(--hll-dark-grey)] lg:max-w-[721px] lg:pt-[19px] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)]">
              {role.summary}
            </p>
          </div>

          <div className="mt-[84px] flex justify-center lg:mt-[202px]">
            <HLLButton href={applyHref} variant="contact" size="md" className={BUTTON_MOBILE}>
              Apply
            </HLLButton>
          </div>
        </section>

        <section className={`grid gap-[54px] pt-[54px] lg:grid-cols-[534fr_864fr_54fr] lg:gap-0 lg:pt-[131px] ${SERVICE_GUTTER}`}>
          <HomeHeading eyebrow="Careers" title="About" eyebrowColor="var(--hll-mid-grey)" />
          <div className="lg:pt-[119px]">
            <JdAccordion sections={sections} />
          </div>
        </section>

        <section className={`pb-[84px] pt-[84px] lg:pb-[151px] lg:pt-[214px] ${SERVICE_GUTTER}`}>
          <HomeHeading eyebrow="Careers" title="About HLL" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/about/careers.webp"
            alt=""
            className="-mx-3 mt-8 aspect-[386/194] w-[calc(100%+24px)] max-w-none rounded-[6px] object-cover lg:mx-0 lg:ml-[24.5%] lg:mt-[17px] lg:aspect-[1096/551] lg:w-[75.5%] lg:rounded-none"
          />
          {/* Mobile: the copy and buttons from x 74. */}
          <div className="mt-8 space-y-[18px] pl-[54px] lg:ml-[45.2%] lg:mt-16 lg:max-w-[693px] lg:space-y-[56px] lg:pl-0">
            {content.aboutHll.paragraphs.map((text, i) => (
              <p key={i} className="text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
                {text}
              </p>
            ))}
          </div>
          <div className="mt-[54px] flex flex-wrap gap-[6px] pl-[54px] lg:ml-[45.2%] lg:mt-[84px] lg:gap-[10px] lg:pl-0">
            <HLLButton href="/about" variant="about" size="md" className={BUTTON_MOBILE}>
              About us
            </HLLButton>
            <HLLButton href="/team" variant="about" size="md" className={BUTTON_MOBILE}>
              Meet the team
            </HLLButton>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
}
