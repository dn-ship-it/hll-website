"use client";

import { useState } from "react";

import type { CareerNotice, CareersPageContent } from "@/data/careers-page";
import {
  expiryBadgeVariant,
  formatExpiryLabel,
} from "@/lib/payload/careers";
import { SectionTitle } from "@/components/marketing/home/primitives";

import { CareersSectionLabel } from "./careers-chrome";

const BADGE_STYLES = {
  open: "border-black/10 bg-[#f5f5f5] text-black/60",
  urgent: "border-orange-200 bg-orange-50 text-orange-800",
  closed: "border-black/10 bg-black/5 text-black/40",
} as const;

function ExpiryBadge({ expiryDate }: { expiryDate: string | null }) {
  const variant = expiryBadgeVariant(expiryDate);
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em] ${BADGE_STYLES[variant]}`}
    >
      {formatExpiryLabel(expiryDate)}
    </span>
  );
}

function NoticeRow({
  notice,
  expanded,
  onToggle,
}: {
  notice: CareerNotice;
  expanded: boolean;
  onToggle: () => void;
}) {
  const panelId = `career-notice-${notice.id}`;
  const applyHref = notice.applyUrl?.startsWith("mailto:")
    ? notice.applyUrl
    : `mailto:careers@hyperlychee.com?subject=${encodeURIComponent(notice.title)}`;

  return (
    <article className="careers-notice border-b border-black/6 last:border-b-0">
      <div className="flex items-start gap-4 py-[clamp(1.25rem,2vw,1.75rem)]">
        <div className="min-w-0 flex-1">
          <h3 className="w-full font-normal text-black">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 text-left"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={onToggle}
            >
              <span className="flex flex-wrap items-center gap-3">
                <span>{notice.title}</span>
                <ExpiryBadge expiryDate={notice.expiryDate} />
              </span>
              <span className="careers-notice__icon" aria-hidden="true">
                {expanded ? "−" : "+"}
              </span>
            </button>
          </h3>

          <div
            id={panelId}
            className={`careers-notice__panel${expanded ? " is-open" : ""}`}
            aria-hidden={!expanded}
          >
            <div className="careers-notice__panel-inner">
              {notice.summary ? (
                <p className="careers-body-copy mt-4 max-w-3xl leading-[1.25] text-black/55">
                  {notice.summary}
                </p>
              ) : null}

              {notice.documents.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-3">
                  {notice.documents.map((doc) => (
                    <li key={doc.label}>
                      <a
                        href={doc.url}
                        className="text-[11px] uppercase tracking-[0.14em] text-black/50 underline decoration-black/20 underline-offset-4 hover:text-black"
                      >
                        {doc.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              <a
                href={applyHref}
                className="mt-5 inline-flex rounded-full border border-black/20 px-5 py-2 text-[11px] uppercase tracking-[0.18em] text-black/80 transition hover:border-black/40 hover:bg-black/[0.02]"
              >
                Apply
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CareersNoticesSection({
  content,
  notices,
  accentColor,
}: {
  content: CareersPageContent["notices"];
  notices: CareerNotice[];
  accentColor: string;
}) {
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(
    notices[0]?.id ?? null,
  );

  return (
    <section
      id="open-roles"
      className="scroll-mt-24 border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]"
    >
      <div className="mx-auto max-w-[90rem]">
        <CareersSectionLabel title={content.eyebrow} accentColor={accentColor} />
        <SectionTitle>{content.title}</SectionTitle>

        {notices.length === 0 ? (
          <p className="mt-8 text-sm leading-7 text-black/55">{content.emptyMessage}</p>
        ) : (
          <div className="mt-8 rounded-sm border border-black/6 bg-white px-[clamp(1rem,3vw,2rem)]">
            {notices.map((notice) => (
              <NoticeRow
                key={notice.id}
                notice={notice}
                expanded={notice.id === expandedNoticeId}
                onToggle={() =>
                  setExpandedNoticeId((current) =>
                    current === notice.id ? current : notice.id,
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
