import type { Media } from "@/payload-types";

import { getCmsImageUrl, type CmsImageRef } from "@/lib/payload/marketing-mappers";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

type CmsImageProps = {
  media?: CmsImageRef;
  src?: string | null;
  alt: string;
  className?: string;
  label?: string;
};

export function CmsImage({ media, src, alt, className = "", label }: CmsImageProps) {
  const url = src ?? getCmsImageUrl(media);

  if (!url) {
    return <MediaPlaceholder className={className} label={label ?? alt} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt={alt} className={`object-cover ${className}`} />
  );
}

export function getMediaAlt(media: Media | number | null | undefined, fallback: string): string {
  if (!media || typeof media === "number") return fallback;
  return media.alt ?? fallback;
}
