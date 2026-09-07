import type { CollectionConfig } from "payload";

import { pageBlocks, seoFields } from "../blocks/index";

export const Pages: CollectionConfig = {
  slug: "pages",
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
