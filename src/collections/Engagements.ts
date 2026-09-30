import type { Block, CollectionConfig } from "payload";

import { publishStatusField } from "../blocks/index";
import { INDUSTRY_GROUPS } from "../data/engagements";

const serviceOptions = [
  { label: "HLL AI", value: "hll-ai" },
  { label: "HLL Trust & Governance", value: "hll-trust" },
  { label: "HLL Foundation", value: "hll-foundation" },
  { label: "HLL Ontology", value: "hll-ontology" },
  { label: "HLL People & Policy", value: "hll-people" },
  { label: "HLL Application", value: "hll-application" },
];

const bodyField = {
  name: "body",
  type: "textarea",
  admin: { description: "Leave a blank line between paragraphs." },
} as const;

// Figma: "a custom cms page that allows the user to switch content blocks around".
const engagementBlocks: Block[] = [
  {
    slug: "engagementMedia",
    labels: { singular: "Media", plural: "Media" },
    fields: [
      { name: "image", type: "upload", relationTo: "media" },
      {
        name: "video",
        type: "upload",
        relationTo: "media",
        admin: { description: "Plays in place of the image." },
      },
    ],
  },
  {
    slug: "engagementQuote",
    labels: { singular: "Quote media block", plural: "Quote media blocks" },
    fields: [
      { name: "quote", type: "textarea", required: true },
      { name: "name", type: "text" },
      { name: "role", type: "text" },
      {
        name: "image",
        type: "upload",
        relationTo: "media",
        admin: {
          description:
            "Optional. Without one the quote sits on the textured background in the page colour.",
        },
      },
    ],
  },
  {
    slug: "engagementMediaGrid",
    labels: { singular: "Media grid", plural: "Media grids" },
    fields: [
      {
        name: "rows",
        type: "array",
        admin: {
          description:
            "Images in a row share one height; widths follow each image's ratio.",
        },
        fields: [
          {
            name: "images",
            type: "upload",
            relationTo: "media",
            hasMany: true,
            required: true,
          },
        ],
      },
    ],
  },
  {
    slug: "engagementText",
    labels: { singular: "Text section", plural: "Text sections" },
    fields: [
      {
        name: "label",
        type: "text",
        admin: {
          description:
            "e.g. The challenge, Our approach. Leave empty for an intro.",
        },
      },
      { ...bodyField, required: true },
      {
        name: "showsArtifact",
        type: "checkbox",
        admin: {
          description:
            "The sidebar stat card appears when this section comes up.",
        },
      },
    ],
  },
  {
    slug: "engagementShowcase",
    labels: { singular: "What we built", plural: "What we built" },
    fields: [
      { name: "label", type: "text", defaultValue: "What we built" },
      {
        name: "display",
        type: "select",
        defaultValue: "text",
        options: [
          { label: "Text", value: "text" },
          { label: "Image / video", value: "media" },
          { label: "Demo window", value: "demo" },
        ],
      },
      bodyField,
      { name: "image", type: "upload", relationTo: "media" },
      {
        name: "demoUrl",
        type: "text",
        admin: { description: "Embedded in the demo window." },
      },
    ],
  },
  {
    slug: "engagementOutcome",
    labels: { singular: "Outcome", plural: "Outcomes" },
    fields: [
      { name: "label", type: "text", defaultValue: "Outcome" },
      {
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
      },
    ],
  },
  {
    slug: "engagementTeam",
    labels: { singular: "Team", plural: "Teams" },
    fields: [
      { name: "label", type: "text", defaultValue: "Team" },
      {
        name: "rows",
        type: "array",
        fields: [
          { name: "role", type: "text", required: true },
          {
            name: "names",
            type: "textarea",
            required: true,
            admin: { description: "One name per line." },
          },
        ],
      },
    ],
  },
  {
    slug: "engagementLearnings",
    labels: { singular: "Learnings", plural: "Learnings" },
    fields: [
      { name: "label", type: "text", defaultValue: "Our learnings" },
      {
        name: "items",
        type: "array",
        fields: [{ name: "text", type: "textarea", required: true }],
      },
    ],
  },
];

export const Engagements: CollectionConfig = {
  slug: "engagements",
  admin: {
    useAsTitle: "client",
    defaultColumns: ["client", "year", "engagementType", "template", "status"],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { status: { equals: "published" } };
    },
  },
  defaultSort: "sortOrder",
  fields: [
    { name: "client", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    publishStatusField,
    {
      type: "row",
      fields: [
        { name: "year", type: "number", required: true },
        {
          name: "engagementType",
          type: "select",
          required: true,
          defaultValue: "case-study",
          options: [
            { label: "Insight", value: "insight" },
            { label: "Client Work", value: "client-work" },
            { label: "Case Study", value: "case-study" },
          ],
        },
        {
          name: "template",
          type: "select",
          required: true,
          defaultValue: "case-study",
          options: [
            { label: "Case Study", value: "case-study" },
            { label: "Engagement Story", value: "story" },
          ],
        },
      ],
    },
    {
      name: "services",
      type: "select",
      hasMany: true,
      options: serviceOptions,
    },
    {
      name: "industry",
      type: "select",
      options: INDUSTRY_GROUPS.flatMap((group) =>
        group.items.map((item) => ({ label: item, value: item })),
      ),
    },
    { name: "period", type: "text", admin: { description: "e.g. 2024-2026" } },
    { name: "location", type: "text" },
    {
      name: "primaryColor",
      type: "text",
      admin: {
        description:
          "Client colour, e.g. #FE5844. Colours the sidebar, subheadings and the Story page.",
      },
    },
    {
      name: "cardImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Card image on /engagement; the card takes the image's ratio.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      admin: {
        description: "Put in focus: the card spans the full grid width.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
    {
      name: "stat",
      type: "group",
      label: "Sidebar stat card",
      fields: [
        {
          name: "label",
          type: "text",
          admin: { description: "e.g. Operational Efficiency" },
        },
        { name: "value", type: "text", admin: { description: "e.g. 58.3" } },
        { name: "unit", type: "text", admin: { description: "e.g. %" } },
        { name: "body", type: "textarea" },
        {
          name: "chart",
          type: "array",
          maxRows: 6,
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              admin: { description: "e.g. Apr 25" },
            },
            { name: "value", type: "number", required: true },
          ],
        },
      ],
    },
    { name: "layout", type: "blocks", blocks: engagementBlocks },
    {
      name: "related",
      type: "relationship",
      relationTo: "engagements",
      hasMany: true,
      maxRows: 3,
      admin: {
        description:
          "Explore related engagements. Empty: engagements sharing a service.",
      },
    },
  ],
};
