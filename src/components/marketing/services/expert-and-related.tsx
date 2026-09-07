import type { HLLFoundationData } from "@/data/services/hll-foundation";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

export function ExpertVoiceSection({ data }: { data: HLLFoundationData["expertVoice"] }) {
  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <h2
          className="font-light text-black"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Expert Voice
        </h2>

        <div
          className="mt-10 grid items-center gap-[clamp(1.5rem,4vw,3rem)]"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
          }}
        >
          <div>
            <MediaPlaceholder
              className="aspect-square w-full max-w-md min-h-[clamp(14rem,35vw,20rem)]"
              label="Expert portrait"
            />
            <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-black/35">
              01/02 · {data.company}
            </p>
          </div>

          <blockquote>
            <p
              className="font-light leading-snug text-black"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
            >
              &ldquo;{data.quote}&rdquo;
            </p>
            <footer className="mt-8 text-sm text-black/55">
              <cite className="not-italic">
                {data.name}, {data.role}, {data.company}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function RelatedServicesSection({
  items,
}: {
  items: HLLFoundationData["relatedServices"];
}) {
  return (
    <section className="bg-[#f5f5f5] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2.5rem,6vw,4rem)]">
      <div className="mx-auto max-w-[90rem] text-center">
        <h2
          className="font-light text-black"
          style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)" }}
        >
          Related Services
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-black/12 bg-white px-5 py-2 text-[11px] uppercase tracking-[0.14em] text-black/70 transition hover:border-black/25"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
