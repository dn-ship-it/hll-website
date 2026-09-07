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
      name: "demoWindow",
      type: "group",
      label: "Interactive demo window",
      admin: {
        description:
          "HTML demos rendered inside the hero demo window. Each entry can map to a hero tab key.",
      },
      fields: [
        {
          name: "selectorLabel",
          type: "text",
          defaultValue: "HLL Foundation",
          admin: {
            description: "Label on the pill above the demo iframe.",
          },
        },
        {
          name: "demos",
          type: "array",
          labels: { singular: "Demo", plural: "Demos" },
          admin: {
            description:
              "Optional per-tab demos. Set Tab key to match hero anchors (e.g. data-engineering).",
          },
          fields: [
            {
              name: "tabKey",
              type: "text",
              required: true,
            },
            {
              name: "title",
              type: "text",
            },
            {
              name: "contentType",
              type: "select",
              defaultValue: "inline",
              options: [
                { label: "Paste HTML", value: "inline" },
                { label: "Upload HTML file", value: "file" },
              ],
            },
            {
              name: "html",
              type: "textarea",
              admin: {
                rows: 16,
                condition: (_, siblingData) => siblingData?.contentType === "inline",
                description: "Full HTML document or fragment. Runs in a sandboxed iframe.",
              },
            },
            {
              name: "htmlFile",
              type: "upload",
              relationTo: "media",
              admin: {
                condition: (_, siblingData) => siblingData?.contentType === "file",
                description: "Upload a .html file (set Media type to HTML asset).",
              },
            },
          ],
        },
        {
          name: "fallbackHtml",
          type: "textarea",
          admin: {
            rows: 12,
            description: "Default HTML when no tab-specific demo matches.",
          },
        },
        {
          name: "fallbackFile",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Or upload a default .html demo file.",
          },
        },
      ],
    },
    {
      name: "layout",
      type: "blocks",
      blocks: pageBlocks,
    },
    ...seoFields,
  ],
};
