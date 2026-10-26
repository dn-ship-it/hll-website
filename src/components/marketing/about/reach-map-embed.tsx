"use client";

import { ReachMap } from "@/components/reach-map";

/**
 * The design team's Our Reach map (reach-map-embed.zip, Hannan's canvas
 * 19/10/26), used as delivered on About and Contact. Its engagement links
 * default to /engagements/<id>; the site's pages live at /engagement/<id>.
 * The link function is set here because a server page can't pass one.
 */
export function ReachMapEmbed() {
  return (
    <div className="hll-reach">
      <ReachMap engagementHref={(e: { id: string }) => `/engagement/${e.id}`} />
    </div>
  );
}
