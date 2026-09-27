import Link from "next/link";
import { Asterisk } from "lucide-react";

export function ServiceBreadcrumb({ items }: { items: readonly string[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.22em] text-black/45">
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 ? <span className="mx-2 text-black/25">›</span> : null}
          {i === items.length - 1 ? (
            <span className="text-black/70">{item}</span>
          ) : (
            <Link href="/services" className="hover:text-black">
              {item}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function ServiceBrandHeader({
  brand,
  foundation = false,
}: {
  brand: string;
  foundation?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 ${foundation ? "" : "border-b border-black/6 pb-4"}`}>
      {foundation ? (
        <span
          aria-hidden="true"
          className="grid size-5 place-items-center rounded-[4px]"
          style={{ background: "linear-gradient(135deg, #FB8330 0%, #FE5844 55%, #D75D87 100%)" }}
        >
          <Asterisk className="size-3.5 text-white" strokeWidth={2.2} />
        </span>
      ) : (
        <span className="flex size-7 items-center justify-center rounded-full bg-[#f5f5f5] text-[9px] font-bold text-black">
          HLL
        </span>
      )}
      <span className={`${foundation ? "text-[18px]" : "text-sm"} font-medium text-black`}>{brand}</span>
    </div>
  );
}
