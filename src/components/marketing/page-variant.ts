import { serviceVariantForSlug, type HLLVariant } from "@/components/hll/variants";

/**
 * The palette a page belongs to: its service's own on a service page, else
 * its nav section's (the colours of that section's nav button). Home has none.
 * The footer shader and footer button follow it ("The shader overlay shifts
 * variant").
 */
export function variantForPath(pathname: string): HLLVariant | null {
  const slug = pathname.match(/^\/services\/([^/]+)/)?.[1];
  const service = slug ? serviceVariantForSlug(slug) : null;
  if (service) return service;
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/industries")) return "industries";
  if (pathname.startsWith("/engagement")) return "engagement";
  if (/^\/(about|team|careers)/.test(pathname)) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  return null;
}
