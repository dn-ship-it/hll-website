import type { Page, SiteSetting } from "@/payload-types";

import { BlockRenderer } from "./block-renderer";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export function CmsPage({
  page,
  settings: _settings,
}: {
  page: Page;
  settings: SiteSetting | null;
}) {
  return (
    <MarketingShell>
      <BlockRenderer blocks={page.layout} />
    </MarketingShell>
  );
}
