import type { HLLFoundationData } from "@/data/services/hll-foundation";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";
import { Tag } from "@/components/hll/tag";

const CARD_STYLES = {
  navy: "bg-[#1a2744] text-white",
  orange: "bg-[#FF6302] text-white",
  image: "bg-white text-black border border-black/8",
} as const;

export function EngagementSection({ data }: { data: HLLFoundationData["engagement"] }) {
  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <h2
          className="font-light text-black"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          {data.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55">{data.intro}</p>

        <div
          className="mt-10 grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
          }}
        >
          {data.cards.map((card) => (
            <article
              key={card.id}
              className={`flex min-h-[clamp(14rem,28vw,18rem)] flex-col p-[clamp(1rem,2.5vw,1.5rem)] ${CARD_STYLES[card.variant]}`}
            >
              {card.variant === "image" ? (
                <MediaPlaceholder className="mb-4 aspect-[4/3] w-full" label={card.title} />
              ) : (
                <p className="text-lg font-medium opacity-90">{card.client}</p>
              )}
              <div className="mt-3">
                <Tag variant={card.variant === "navy" ? "cool" : "warm"}>{card.tag}</Tag>
              </div>
              <h3 className="mt-4 text-xl font-medium">{card.title}</h3>
              <p
                className={`mt-2 flex-1 text-sm leading-6 ${
                  card.variant === "image" ? "text-black/55" : "text-white/80"
                }`}
              >
                {card.description}
              </p>
              {card.variant !== "image" ? (
                <span className="mt-6 text-[10px] uppercase tracking-[0.18em] text-white/90 underline decoration-white/40 underline-offset-4">
                  Learn more
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
