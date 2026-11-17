import { revalidatePath } from "next/cache";

/**
 * Marks every marketing page stale on a CMS save or delete, so each rebuilds on its next visit.
 * A no-op outside Next (`payload run` scripts); content written by a script still needs a redeploy.
 */
function revalidateSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Not inside a Next request (a script or a build).
  }
}

export const revalidateOnChange = {
  afterChange: [
    ({ doc }: { doc: unknown }) => {
      revalidateSite();
      return doc;
    },
  ],
};

export const revalidateOnChangeOrDelete = {
  ...revalidateOnChange,
  afterDelete: [
    ({ doc }: { doc: unknown }) => {
      revalidateSite();
      return doc;
    },
  ],
};
