import Link from "next/link";

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
    <h1
      className="font-light tracking-tight text-black"
      style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
    >
      {category}
    </h1>
  );
}
