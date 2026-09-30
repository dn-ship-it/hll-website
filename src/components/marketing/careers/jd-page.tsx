import { notFound } from "next/navigation";

import { GradientRevealTextSlow, HLLButton } from "@/components/hll";
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
        <section className={`pt-[clamp(8rem,23.2vw,21.9rem)] ${SERVICE_GUTTER}`}>
          <div className="grid gap-6 lg:grid-cols-[653fr_799fr] lg:gap-0">
            <div>
              <GradientRevealTextSlow
                as="h1"
                text={role.title}
                variant="contact"
                className="block font-light text-[var(--hll-dark-grey)]"
                fontSize="clamp(2.5rem, 4.23vw, 4rem)"
                letterSpacing="0"
                lineHeight="1.16"
              />
              {tags.length ? (
                <div className="mt-8 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <OutlineTag key={tag}>{tag}</OutlineTag>
                  ))}
                </div>
              ) : null}
            </div>
            <p className="max-w-[721px] text-[clamp(1.5rem,2.38vw,2.25rem)] leading-[1.16] text-[var(--hll-dark-grey)] lg:pt-[19px]">
              {role.summary}
            </p>
          </div>

          <div className="mt-[202px] flex justify-center">
            <HLLButton href={applyHref} variant="contact" size="md">
              Apply
            </HLLButton>
          </div>
        </section>

        <section className={`grid gap-10 pt-[131px] lg:grid-cols-[534fr_864fr_54fr] lg:gap-0 ${SERVICE_GUTTER}`}>
          <HomeHeading eyebrow="Careers" title="About" eyebrowColor="var(--hll-mid-grey)" />
          <div className="lg:pt-[119px]">
            <JdAccordion sections={sections} />
          </div>
        </section>

        <section className={`pt-[214px] pb-[151px] ${SERVICE_GUTTER}`}>
          <HomeHeading eyebrow="Careers" title="About HLL" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/about/careers.webp"
            alt=""
            className="mt-[17px] aspect-[1096/551] w-full object-cover lg:ml-[24.5%] lg:w-[75.5%]"
          />
          <div className="mt-16 space-y-[56px] lg:ml-[45.2%] lg:max-w-[693px]">
            {content.aboutHll.paragraphs.map((text, i) => (
              <p key={i} className="text-[clamp(1rem,1.32vw,1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                {text}
              </p>
            ))}
          </div>
          <div className="mt-[84px] flex flex-wrap gap-[10px] lg:ml-[45.2%]">
            <HLLButton href="/about" variant="about" size="md">
              About us
            </HLLButton>
            <HLLButton href="/team" variant="about" size="md">
              Meet the team
            </HLLButton>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
}
