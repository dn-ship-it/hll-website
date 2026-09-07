import type { Media } from "@/payload-types";

export function resolveMediaUrl(
  media: Media | number | string | null | undefined,
): string | null {
  if (!media || typeof media === "number" || typeof media === "string") {
    return null;
  }

  return media.url ?? null;
}
