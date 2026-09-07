import type { HLLFoundationData } from "@/data/services/hll-foundation";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

export function OutcomeSection({ data }: { data: HLLFoundationData["outcomes"] }) {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]"
      style={{
        background: "linear-gradient(135deg, #FF5A1E 0%, #FF9126 50%, #EB3B3E 100%)",
      }}
    >
      <div className="relative mx-auto max-w-[90rem]">
        <h2
          className="font-light text-white"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          {data.title}
        </h2>

        <div
          className="mt-10 grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
          }}
        >
          {data.cards.map((card) => (
            <article
              key={card.stat}
              className="flex min-h-[clamp(12rem,22vw,16rem)] flex-col rounded-sm bg-white p-[clamp(1rem,2.5vw,1.5rem)]"
            >
              <p
                className="font-light leading-none text-black"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {card.stat}
              </p>
              {card.hasMedia ? (
                <MediaPlaceholder className="my-4 aspect-square w-full max-w-[8rem]" />
              ) : null}
              <p className="mt-auto text-xs leading-6 text-black/55">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
