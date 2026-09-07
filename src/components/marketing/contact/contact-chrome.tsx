export function ContactBreadcrumb({ items }: { items: readonly string[] }) {
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

export function ContactSectionLabel({
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

const FIELD_CLASS =
  "w-full rounded-sm border border-black/12 bg-white px-4 py-3 text-sm text-black placeholder:text-black/35 transition focus:border-black/25 focus:outline-none focus:ring-1 focus:ring-black/10";

export function ContactFieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-[11px] uppercase tracking-[0.14em] text-black/50">
      {children}
      {required ? <span className="text-black/35"> *</span> : null}
    </label>
  );
}

export function ContactTextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={FIELD_CLASS} {...props} />;
}

export function ContactTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${FIELD_CLASS} min-h-[clamp(8rem,20vw,10rem)] resize-y`}
      {...props}
    />
  );
}

export function ContactSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${FIELD_CLASS} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat`} {...props} />
  );
}
