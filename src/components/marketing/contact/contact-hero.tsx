import type { ContactPageContent } from "@/data/contact-page";

import { ContactSectionLabel } from "./contact-chrome";

export function ContactHero({
  data,
  accentColor,
}: {
  data: ContactPageContent["hero"];
  accentColor: string;
}) {
  return (
    <section className="px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(1.5rem,4vw,2.5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <ContactSectionLabel title={data.eyebrow} accentColor={accentColor} />

        <h1
          className="mt-4 max-w-[min(100%,42rem)] font-light leading-[1.12] tracking-tight text-black"
          style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3.25rem)" }}
        >
          {data.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-black/55">{data.description}</p>
      </div>
    </section>
  );
}
