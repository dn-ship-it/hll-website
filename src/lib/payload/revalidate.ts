import { revalidatePath } from "next/cache";
import type { CollectionConfig, GlobalConfig } from "payload";

/**
 * The marketing pages are prerendered at build time, so without this a CMS
 * edit only reaches the live site on the next deploy. Any saved or deleted
 * content marks every page stale; each is rebuilt on its next visit. The site
 * is small and its pages share globals (nav, footer), so refreshing all of it
 * is simpler and safer than tracking which page shows which document.
 */
function revalidateSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Outside a request (the onInit seed, migrations) there is no cache to
    // invalidate, and Next throws; nothing is served stale yet, so skip it.
  }
}

export function withSiteRevalidation(collection: CollectionConfig): CollectionConfig {
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), revalidateSite],
      afterDelete: [...(collection.hooks?.afterDelete ?? []), revalidateSite],
    },
  };
}

export function withGlobalRevalidation(global: GlobalConfig): GlobalConfig {
  return {
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [...(global.hooks?.afterChange ?? []), revalidateSite],
    },
  };
}
