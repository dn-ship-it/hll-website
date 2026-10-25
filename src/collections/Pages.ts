import type { CollectionConfig } from "payload";

import { pageBlocks, seoFields } from "../blocks/index";

import { revalidateOnChangeOrDelete } from "@/lib/payload/revalidate-site";

export const Pages: CollectionConfig = {
  slug: "pages",
  // Edits show on the site without a redeploy.
  hooks: revalidateOnChangeOrDelete,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return {
        _status: {
          equals: "published",
        },
      };
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL path without leading slash, e.g. "about" or "contact".',
      },
    },
    {
      name: "layout",
      type: "blocks",
      blocks: pageBlocks,
      required: true,
      admin: {
        description:
          "Compose the page from blocks. Shader variants map to your LightFX React components.",
      },
    },
    ...seoFields,
  ],
};
