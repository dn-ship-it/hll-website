/** Light grey content placeholder — swap for CMS media when finalized. */
export function MediaPlaceholder({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#e3e3e3] ${className}`}
      aria-hidden={!label}
      aria-label={label}
    >
      {label ? (
        <span className="absolute left-3 top-3 text-[10px] uppercase tracking-widest text-black/25">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/45">
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 text-[clamp(1.5rem,3vw,2rem)] font-normal tracking-tight text-black">
      {children}
    </h2>
  );
}

export function OutlinePillButton({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const cls =
    "inline-flex items-center rounded-full border border-black/20 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-black/80 transition hover:border-black/40 hover:bg-black/[0.02]";

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return <button type="button" className={cls}>{children}</button>;
}
