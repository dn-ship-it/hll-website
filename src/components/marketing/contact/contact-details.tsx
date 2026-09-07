import type { ContactPageContent } from "@/data/contact-page";
import { MediaPlaceholder, SectionTitle } from "@/components/marketing/home/primitives";

import { ContactSectionLabel } from "./contact-chrome";

export function ContactDetailsPanel({
  data,
  accentColor,
}: {
  data: ContactPageContent["details"];
  accentColor: string;
}) {
  return (
    <aside className="rounded-sm border border-black/6 bg-[#fafafa] p-[clamp(1.25rem,3vw,2rem)]">
      <ContactSectionLabel title={data.eyebrow} accentColor={accentColor} />
      <SectionTitle>{data.title}</SectionTitle>

      <dl className="mt-8 space-y-6">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.16em] text-black/40">Email</dt>
          <dd className="mt-2">
            <a
              href={`mailto:${data.email}`}
              className="text-sm text-black/70 underline decoration-black/20 underline-offset-4 hover:text-black"
            >
              {data.email}
            </a>
          </dd>
        </div>

        <div>
          <dt className="text-[10px] uppercase tracking-[0.16em] text-black/40">Social</dt>
          <dd className="mt-2">
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-black/15 px-4 py-1.5 text-[10px] uppercase tracking-wider text-black/70 hover:border-black/30"
            >
              {data.linkedinLabel}
            </a>
          </dd>
        </div>
      </dl>

      <MediaPlaceholder
        className="mt-8 aspect-[4/3] w-full min-h-[clamp(10rem,24vw,14rem)]"
        label="Office"
      />
    </aside>
  );
}

export function ContactLocationsSection({
  data,
  accentColor,
}: {
  data: ContactPageContent["locations"];
  accentColor: string;
}) {
  return (
    <section className="border-t border-black/6 bg-[#fafafa] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <ContactSectionLabel title={data.eyebrow} accentColor={accentColor} />
        <SectionTitle>{data.title}</SectionTitle>

        <div
          className="mt-10 grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
          }}
        >
          {data.items.map((location) => (
            <article
              key={location.id}
              className="rounded-sm border border-black/6 bg-white p-[clamp(1rem,2.5vw,1.5rem)]"
            >
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-medium text-black">{location.city}</h3>
                {location.label ? (
                  <span className="text-[10px] uppercase tracking-[0.14em] text-black/40">
                    {location.label}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-7 text-black/55">{location.address}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
