import type { Page, SiteSetting } from "@/payload-types";

import { BlockRenderer } from "./block-renderer";
import { SiteShell } from "./site-shell";

export function CmsPage({
  page,
  settings,
}: {
  page: Page;
  settings: SiteSetting | null;
}) {
  return (
    <SiteShell settings={settings}>
      <BlockRenderer blocks={page.layout} />
    </SiteShell>
  );
}
