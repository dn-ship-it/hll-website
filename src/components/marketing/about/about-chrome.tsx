import Link from "next/link";

export function AboutBreadcrumb({ items }: { items: readonly string[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.22em] text-black/45">
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 ? <span className="mx-2 text-black/25">›</span> : null}
          <span className="text-black/70">{item}</span>
        </span>
      ))}
    </nav>
  );
}

export function AboutPageHeader({
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
