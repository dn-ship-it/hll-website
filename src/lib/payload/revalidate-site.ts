import { revalidatePath } from "next/cache";

/**
 * The marketing pages are built ahead of time, so a CMS edit only showed after
 * a redeploy. Saving or deleting anything they read marks every page stale:
 * the next visit to each one builds it fresh with the new content (a photo, a
 * line of copy, a team member).
 *
 * Outside Next (`payload run` scripts) there is nothing to mark, so this is a
 * no-op there; content written by a script still needs a redeploy.
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
