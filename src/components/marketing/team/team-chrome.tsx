import Link from "next/link";

export function TeamBreadcrumb({ items }: { items: readonly string[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.22em] text-black/45">
      {items.map((item, i) => (
        <span key={`${item}-${i}`}>
          {i > 0 ? <span className="mx-2 text-black/25">›</span> : null}
          {i === items.length - 1 ? (
            <span className="text-black/70">{item}</span>
          ) : (
            <Link href={i === 0 ? "/about" : "#"} className="hover:text-black">
              {item}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function TeamSectionLabel({
  title,
  accentColor,
}: {
  title: string;
  accentColor: string;
}) {
  return (
    <p
      className="text-[10px] font-medium uppercase tracking-[0.24em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>
  );
}
