"use client";

import { ReachMap } from "@/components/reach-map";

/**
 * The Our Reach map, used as delivered. Its engagement links default to /engagements/<id> but the site's pages live at
 * /engagement/<id>, so the link function is set here (a server page can't pass one).
 */
export function ReachMapEmbed() {
  return (
    <div className="hll-reach">
      <ReachMap engagementHref={(e: { id: string }) => `/engagement/${e.id}`} />
    </div>
  );
}
