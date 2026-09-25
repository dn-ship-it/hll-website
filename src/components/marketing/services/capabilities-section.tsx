import type { ServicePageData } from "@/data/services/types";
import { SectionEyebrow, SectionTitle } from "@/components/marketing/home/primitives";

function ToolPill({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-black/70">
      {label}
    </span>
  );
}

export function CapabilitiesSection({
  data,
}: {
  data: ServicePageData["capabilities"];
}) {
  return (
    <section
      id="capabilities"
      className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]"
    >
      <div className="mx-auto grid max-w-[90rem] gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,14rem)_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
          <SectionTitle>{data.title}</SectionTitle>
          <ul className="mt-8 hidden space-y-3 lg:block">
            {data.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-black/40 hover:text-black"
                >
                  <span className="size-1.5 rounded-full bg-transparent group-hover:bg-[#EB3B3E]" />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-0">
          {data.items.map((item) => (
            <article key={item.id} id={item.id} className="grid scroll-mt-28 grid-cols-1 gap-x-8 border-t border-black/10 py-6 sm:grid-cols-[minmax(8rem,0.8fr)_minmax(0,1.2fr)] sm:py-8">
              <div className="flex items-baseline gap-4">
                <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-black/35">
                  {item.index}
                </span>
                <h3
                  className="font-normal text-black"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                >
                  {item.title}
                </h3>
              </div>
              <div>
                <p className="mt-4 text-sm leading-6 text-black/55 sm:mt-0">{item.description}</p>
                <SubServices items={item.subServices} />
              </div>
            </article>
          ))}

          {data.tools ? (
            <article className="scroll-mt-28 border-t border-black/6 pt-[clamp(2rem,4vw,3rem)]">
              <h3
                className="font-normal text-black"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
              >
                Tools and Technologies
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Cloud</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data.tools.cloud.map((t) => (
                      <ToolPill key={t} label={t} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Data</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data.tools.data.map((t) => (
                      <ToolPill key={t} label={t} />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Foundation's sub-services carry a body, so they render as a list; the other
    verticals are name-only and stay as pills. */
function SubServices({ items }: { items?: ServicePageData["capabilities"]["items"][number]["subServices"] }) {
  if (!items || items.length === 0) return null;

  const hasDescriptions = items.some((sub) => sub.description);

  if (!hasDescriptions) {
    return (
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((sub) => (
          <ToolPill key={sub.name} label={sub.name} />
        ))}
      </div>
    );
  }

  return (
    <dl className="mt-6 grid gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-5 sm:grid-cols-2">
      {items.map((sub) => (
        <div key={sub.name}>
          <dt className="text-[11px] uppercase tracking-[0.16em] text-black/70">{sub.name}</dt>
          {sub.description ? (
            <dd className="mt-2 text-sm leading-6 text-black/50">{sub.description}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
