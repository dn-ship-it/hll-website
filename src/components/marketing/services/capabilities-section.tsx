import type { HLLFoundationData } from "@/data/services/hll-foundation";
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
  data: HLLFoundationData["capabilities"];
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
            {data.items.slice(0, 4).map((item) => (
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

        <div className="space-y-[clamp(2.5rem,6vw,4rem)]">
          {data.items.map((item) => (
            <article key={item.id} id={item.id} className="scroll-mt-28">
              <div className="flex items-baseline gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/35">
                  {item.index}
                </span>
                <h3
                  className="font-normal text-black"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                >
                  {item.title}
                </h3>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-black/55">{item.description}</p>

              {item.subServices && item.subServices.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.subServices.map((sub) => (
                    <ToolPill key={sub} label={sub} />
                  ))}
                </div>
              ) : null}

              {item.id === "tools" ? (
                <div className="mt-8 space-y-6">
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
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
