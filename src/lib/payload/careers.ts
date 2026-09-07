import type { Career, Media } from "@/payload-types";
import type { CareerNotice } from "@/data/careers-page";

import { resolveMediaUrl } from "./media";

function lexicalToPlainText(
  node: { type?: string; text?: string; children?: unknown[] } | null | undefined,
): string {
  if (!node) return "";
  if (typeof node.text === "string") return node.text;
  if (!Array.isArray(node.children)) return "";

  return node.children
    .map((child) =>
      lexicalToPlainText(child as { type?: string; text?: string; children?: unknown[] }),
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function mapCareerToNotice(career: Career): CareerNotice {
  const summaryRoot = career.summary?.root as
    | { children?: { type?: string; text?: string; children?: unknown[] }[] }
    | undefined;

  const summary = summaryRoot?.children
    ? summaryRoot.children.map((child) => lexicalToPlainText(child)).join(" ").trim()
    : "";

  return {
    id: String(career.id),
    slug: career.slug,
    title: career.title,
    summary,
    expiryDate: career.expiryDate ?? null,
    applyUrl: career.externalApplyUrl ?? null,
    documents:
      career.documents?.map((doc) => ({
        label: doc.label,
        url: resolveMediaUrl(doc.file as Media | number | null | undefined) ?? "#",
      })) ?? [],
  };
}

export function isNoticeActive(notice: CareerNotice, now = new Date()): boolean {
  if (!notice.expiryDate) return true;
  const expiry = new Date(notice.expiryDate);
  expiry.setHours(23, 59, 59, 999);
  return expiry >= now;
}

export function formatExpiryLabel(expiryDate: string | null): string {
  if (!expiryDate) return "Open";

  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Closed";
  if (diffDays === 0) return "Closes today";
  if (diffDays === 1) return "Closes tomorrow";
  if (diffDays <= 14) return `${diffDays} days left`;

  return `Closes ${expiry.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

export function expiryBadgeVariant(
  expiryDate: string | null,
): "open" | "urgent" | "closed" {
  if (!expiryDate) return "open";

  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "closed";
  if (diffDays <= 7) return "urgent";
  return "open";
}
