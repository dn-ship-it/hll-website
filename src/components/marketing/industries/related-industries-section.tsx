import type { IndustryPageData } from "@/types/industry";

export function RelatedIndustriesSection({
  items,
}: {
  items: IndustryPageData["relatedIndustries"];
}) {
  return (
    <section className="bg-[#f5f5f5] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2.5rem,6vw,4rem)]">
      <div className="mx-auto max-w-[90rem] text-center">
        <h2
          className="font-light text-black"
          style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)" }}
        >
          Related Industries
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
