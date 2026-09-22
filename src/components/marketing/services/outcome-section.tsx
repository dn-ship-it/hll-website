import { getVariantColors, gradientCss, type ServiceVariant } from "@/components/hll/variants";
import type { ServicePageData } from "@/data/services/types";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

export function OutcomeSection({
  data,
  variant = "hll-foundation",
}: {
  data: ServicePageData["outcomes"];
  variant?: ServiceVariant;
}) {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]"
      style={{ background: gradientCss(getVariantColors(variant)) }}
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
