import type { IndustryPageData } from "@/types/industry";
import { MediaPlaceholder, SectionTitle } from "@/components/marketing/home/primitives";
import { Tag } from "@/components/hll/tag";

const CARD_STYLES = {
  navy: "bg-[#1a2744] text-white",
  orange: "bg-[#FF6302] text-white",
  image: "bg-white text-black border border-black/8",
} as const;

function CapabilityCard({ card }: { card: IndustryPageData["capabilities"]["items"][number]["cards"][number] }) {
  return (
    <article className={`flex min-h-[clamp(12rem,24vw,16rem)] flex-col p-[clamp(1rem,2vw,1.25rem)] ${CARD_STYLES[card.variant]}`}>
      {card.variant === "image" ? (
        <MediaPlaceholder className="mb-3 aspect-[4/3] w-full" label={card.title} />
      ) : (
        <p className="text-base font-medium opacity-90">{card.client}</p>
      )}
      <div className="mt-2">
        <Tag variant={card.variant === "navy" ? "cool" : card.variant === "orange" ? "warm" : "neutral"}>
          {card.tag}
        </Tag>
      </div>
      <h4 className="mt-3 text-lg font-medium">{card.title}</h4>
      <p
        className={`mt-2 flex-1 text-sm leading-6 ${
          card.variant === "image" ? "text-black/55" : "text-white/80"
        }`}
      >
        {card.description}
      </p>
      {card.variant !== "image" ? (
        <span className="mt-4 text-[10px] uppercase tracking-[0.18em] text-white/90 underline decoration-white/40 underline-offset-4">
          Learn more
        </span>
      ) : null}
    </article>
  );
}

export function IndustryCapabilitiesSection({
  data,
  accentColor,
}: {
  data: IndustryPageData["capabilities"];
  accentColor: string;
}) {
  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <p
          className="text-[10px] font-medium uppercase tracking-[0.24em]"
          style={{ color: accentColor }}
        >
          {data.eyebrow}
        </p>

        <div className="mt-10 grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,14rem)_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionTitle>{data.title}</SectionTitle>
            <ul className="mt-8 hidden space-y-3 lg:block">
              {data.sidebar.map((item) => (
                <li key={item}>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-black/40">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-[clamp(3rem,7vw,5rem)]">
            {data.items.map((item) => (
              <article key={item.id} id={item.id} className="scroll-mt-28">
                <div
                  className="grid gap-6 border-b border-black/6 pb-[clamp(2rem,5vw,3rem)]"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
                  }}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-black/35">
                      {item.index}
                    </span>
                    <h3
                      className="mt-2 font-normal text-black"
                      style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-black/55">{item.description}</p>
                </div>

                <div
                  className="mt-6 grid gap-4"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
                  }}
                >
                  {item.cards.map((card) => (
                    <CapabilityCard key={card.id} card={card} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
