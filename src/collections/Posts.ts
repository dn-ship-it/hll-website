import type { Block, CollectionConfig, Field } from "payload";

import { seoFields } from "../blocks/index";

import { revalidateOnChangeOrDelete } from "@/lib/payload/revalidate-site";

const HEX = /^#[0-9a-f]{6}$/i;

const bodyField = {
  name: "body",
  type: "textarea",
  admin: { description: "Leave a blank line between paragraphs." },
} as const;

const labelField = {
  name: "label",
  type: "text",
  admin: { description: "Shown to the left of the section. Optional." },
} as const;

const statItems: Field = {
  name: "items",
  type: "array",
  fields: [
    {
      name: "stat",
      type: "text",
      required: true,
      admin: { description: "e.g. 30+, 65%. Counts up from 0." },
    },
    { name: "text", type: "textarea", required: true },
  ],
};

const colourField = (defaultValue: string, description: string): Field => ({
  name: "colour",
  type: "text",
  defaultValue,
  validate: (value: unknown) =>
    !value || (typeof value === "string" && HEX.test(value))
      ? true
      : "Use a hex colour like #086EE8.",
  admin: { description },
});

// Figma Insights (209:830): "The page is created with a dynamic CMS grid which
// allows the content blocks after the hero to be rearranged."
const insightBlocks: Block[] = [
  {
    slug: "insightText",
    labels: { singular: "Text section", plural: "Text sections" },
    fields: [labelField, { ...bodyField, required: true }],
  },
  {
    slug: "insightStats",
    labels: { singular: "Stats", plural: "Stats" },
    fields: [labelField, statItems],
  },
  {
    slug: "insightMedia",
    labels: { singular: "Image / video", plural: "Images / videos" },
    fields: [
      {
        name: "image",
        type: "upload",
        relationTo: "media",
        admin: { description: "Without one the section shows grey, as in the design." },
      },
      {
        name: "video",
        type: "upload",
        relationTo: "media",
        admin: { description: "Optional. Plays in place of the image." },
      },
    ],
  },
  {
    slug: "insightQuote",
    labels: { singular: "Quote", plural: "Quotes" },
    fields: [
      {
        name: "quote",
        type: "textarea",
        required: true,
        admin: { description: "The first sentence shows in the colour below." },
      },
      { name: "name", type: "text" },
      { name: "role", type: "text" },
      colourField("#086EE8", "Colour of the first sentence, e.g. #086EE8."),
    ],
  },
  {
    // "This is an open section in the CMS, the content within the box can be
    // a quote, a demo tool or outcome cards. The colour of the box can be
    // changed as well."
    slug: "insightBox",
    labels: { singular: "Coloured box", plural: "Coloured boxes" },
    fields: [
      colourField("#086EE8", "Box colour, e.g. #086EE8."),
      {
        name: "content",
        type: "select",
        defaultValue: "quote",
        required: true,
        options: [
          { label: "Quote", value: "quote" },
          { label: "Demo tool", value: "demo" },
          { label: "Outcome cards", value: "outcomes" },
        ],
      },
      {
        name: "quote",
        type: "textarea",
        admin: { condition: (_, s) => s?.content === "quote" },
      },
      {
        name: "name",
        type: "text",
        admin: { condition: (_, s) => s?.content === "quote" },
      },
      {
        name: "role",
        type: "text",
        admin: { condition: (_, s) => s?.content === "quote" },
      },
      {
        name: "demoUrl",
        type: "text",
        admin: {
          description: "The demo tool's address, shown inside the box.",
          condition: (_, s) => s?.content === "demo",
        },
      },
      {
        ...statItems,
        admin: { condition: (_, s) => s?.content === "outcomes" },
      } as Field,
    ],
  },
];

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Insight", plural: "Insights" },
  // Edits show on the site without a redeploy.
  hooks: revalidateOnChangeOrDelete,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "byline", "publishedAt", "_status"],
    description:
      "Articles for the Insights page; the latest three also show in the menu's \"In the News\".",
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
      admin: { description: "The headline, in bold." },
    },
    {
      // "Title is split into Headline (in bold) and Byline (in regular)."
      name: "byline",
      type: "text",
      admin: { description: "Optional. Shown under the headline, in regular." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "The page address: /insights/<slug>." },
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
      admin: { description: "e.g. Data, Payments, Wealth." },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: { description: "Shown under the featured article on the Insights page." },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "author",
      type: "group",
      fields: [
        { name: "name", type: "text" },
        { name: "photo", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      admin: {
        position: "sidebar",
        description: "Leads the Insights page. Without one, the latest article does.",
      },
    },
    {
      name: "body",
      type: "richText",
      label: "Intro",
      admin: { description: "Optional opening text under the cover image." },
    },
    {
      name: "sections",
      type: "blocks",
      blocks: insightBlocks,
      admin: { description: "The article's sections, in order. Drag to rearrange." },
    },
    {
      name: "related",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      maxRows: 3,
      admin: {
        description: "Related Articles. Left empty, the latest articles sharing a tag show.",
      },
    },
    ...seoFields,
  ],
};
