import Link from "next/link";

import { GradientRevealTextSlow } from "@/components/hll";

export function IndustryBreadcrumb({ items }: { items: readonly string[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.22em] text-black/45">
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 ? <span className="mx-2 text-black/25">›</span> : null}
          {i === items.length - 1 ? (
            <span className="text-black/70">{item}</span>
          ) : (
            <Link href={i === 0 ? "/industries" : "#"} className="hover:text-black">
              {item}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function IndustryCategoryHeader({ category }: { category: string }) {
  return (
    <GradientRevealTextSlow
      as="h1"
      text={category}
      variant="industries"
      className="block tracking-tight text-black"
      fontSize="clamp(1.75rem, 3.5vw, 2.75rem)"
      letterSpacing="-0.01em"
    />
  );
}
