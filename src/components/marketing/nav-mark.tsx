"use client";

import { usePathname } from "next/navigation";

import { VARIANT_GRADIENTS } from "@/components/hll";

import { HllMark } from "./hll-mark";
import { variantForPath } from "./page-variant";

/**
 * Figma: "logo in the navbar changes colour according to the service or
 * industries". Service and industry pages pass their own colour; every other
 * section's logo takes the middle of its nav button's palette (Engagement
 * orange, About violet, Contact blue). Home stays grey.
 */
export function NavMark({ tint, className }: { tint?: string; className?: string }) {
  const variant = variantForPath(usePathname());
  const colors = variant ? VARIANT_GRADIENTS[variant].colors : null;
  const section = colors ? colors[Math.floor(colors.length / 2)] : undefined;
  return <HllMark tint={tint ?? section} className={className} />;
}
