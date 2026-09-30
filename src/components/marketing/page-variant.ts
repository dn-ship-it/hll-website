import { SERVICE_VARIANTS, type HLLVariant } from "@/components/hll/variants";

/**
 * The palette a page belongs to: its service's own on a service page, else
 * its nav section's (the colours of that section's nav button). Home has none.
 * The footer shader and footer button follow it ("The shader overlay shifts
 * variant").
 */
export function variantForPath(pathname: string): HLLVariant | null {
  const service = pathname.match(/^\/services\/([^/]+)/)?.[1];
  if (service && (SERVICE_VARIANTS as readonly string[]).includes(service))
    return service as HLLVariant;
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/industries")) return "industries";
  if (pathname.startsWith("/engagement")) return "engagement";
  if (/^\/(about|team|careers)/.test(pathname)) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  return null;
}
