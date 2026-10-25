import type { CollectionConfig } from "payload";

import { industryPageContentFields } from "../fields/marketing-fields";
import { seoFields } from "../blocks/index";

import { revalidateOnChangeOrDelete } from "@/lib/payload/revalidate-site";

export const Industries: CollectionConfig = {
  slug: "industries",
  // Edits show on the site without a redeploy.
  hooks: revalidateOnChangeOrDelete,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status"],
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
      name: "pageContent",
      type: "group",
      label: "Industry page content",
      fields: industryPageContentFields,
    },
    ...seoFields,
  ],
};
