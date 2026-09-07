import type { CollectionConfig } from "payload";

import { publishStatusField } from "../blocks/index";

export const Tenders: CollectionConfig = {
  slug: "tenders",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "referenceNo", "expiryDate", "status"],
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
      name: "referenceNo",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "category",
      type: "text",
      admin: {
        description: "e.g. Supply, Services, Construction",
      },
    },
    {
      name: "summary",
      type: "textarea",
    },
    {
      name: "expiryDate",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
        position: "sidebar",
      },
    },
    {
      name: "archived",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Set automatically after expiry via hook, or manually.",
      },
    },
    publishStatusField,
    {
      name: "documents",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "file",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "corrigenda",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "publishedAt", type: "date" },
        {
          name: "file",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.expiryDate && !data.archived) {
          const expiry = new Date(data.expiryDate);
          if (expiry < new Date()) {
            data.archived = true;
          }
        }
        return data;
      },
    ],
  },
};
