import { contactPageContent } from "@/data/contact-page";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { ContactBreadcrumb } from "./contact-chrome";
import { ContactDetailsPanel, ContactLocationsSection } from "./contact-details";
import { ContactFormSection } from "./contact-form";
import { ContactHero } from "./contact-hero";

export function ContactPage() {
  const content = contactPageContent;

  return (
    <MarketingShell>
      <div className="space-y-4 px-[clamp(1.25rem,4vw,3rem)] pt-6">
        <div className="mx-auto max-w-[90rem]">
          <ContactBreadcrumb items={content.breadcrumb} />
        </div>
      </div>

      <ContactHero data={content.hero} accentColor={content.accentColor} />

      <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
        <div className="mx-auto grid max-w-[90rem] gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <ContactFormSection data={content.form} />
          <ContactDetailsPanel data={content.details} accentColor={content.accentColor} />
        </div>
      </section>

      <ContactLocationsSection data={content.locations} accentColor={content.accentColor} />

      <section
        className="px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2rem,5vw,3rem)]"
        style={{
          background: "linear-gradient(90deg, #ABBFFF 0%, #2BB4EB 50%, #076EB8 100%)",
        }}
      >
        <div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-light text-white" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
            Prefer email? Reach us directly.
          </p>
          <a
            href={`mailto:${content.details.email}`}
            className="inline-flex rounded-full border border-white/40 bg-white/15 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            {content.details.email}
          </a>
        </div>
      </section>
    </MarketingShell>
  );
}
