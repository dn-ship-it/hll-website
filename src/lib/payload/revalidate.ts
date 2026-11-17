import { revalidatePath } from "next/cache";
import type { CollectionConfig, GlobalConfig } from "payload";

/**
 * Marks every page stale on a CMS save or delete so each rebuilds on its next visit; refreshing all is
 * simpler than tracking which page shows which document, since pages share globals.
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
