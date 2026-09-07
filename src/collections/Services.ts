import type { CollectionConfig } from "payload";

import { hllVariantOptions, pageBlocks, seoFields } from "../blocks/index";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "variant", "_status"],
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
    },
    {
      name: "variant",
      type: "select",
      required: true,
      options: [...hllVariantOptions],
      admin: {
        description: "Shader / button color preset for this service page.",
      },
    },
    {
      name: "summary",
      type: "textarea",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "layout",
      type: "blocks",
      blocks: pageBlocks,
    },
    ...seoFields,
  ],
};
