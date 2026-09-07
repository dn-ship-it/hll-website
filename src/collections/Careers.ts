import type { CollectionConfig } from "payload";

import { publishStatusField } from "../blocks/index";

export const Careers: CollectionConfig = {
  slug: "careers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "expiryDate", "status"],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return {
        status: {
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
    },
    {
      name: "summary",
      type: "richText",
    },
    {
      name: "expiryDate",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "externalApplyUrl",
      type: "text",
      admin: {
        description: "Optional link to recruitment portal.",
      },
    },
    publishStatusField,
    {
      name: "documents",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "file",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
