import type { Block } from "payload";

export const hllVariantOptions = [
  { label: "Services", value: "services" },
  { label: "Industries", value: "industries" },
  { label: "Engagement", value: "engagement" },
  { label: "About", value: "about" },
  { label: "Contact", value: "contact" },
  { label: "HLL AI", value: "hll-ai" },
  { label: "HLL Trust", value: "hll-trust" },
  { label: "HLL Foundation", value: "hll-foundation" },
  { label: "HLL Ontology", value: "hll-ontology" },
  { label: "HLL People", value: "hll-people" },
  { label: "HLL Application", value: "hll-application" },
] as const;

export const pageBlocks: Block[] = [
  {
    slug: "hero",
    labels: { singular: "Hero", plural: "Heroes" },
    fields: [
      { name: "heading", type: "text", required: true },
      { name: "subheading", type: "textarea" },
      {
        name: "variant",
        type: "select",
        options: [...hllVariantOptions],
        defaultValue: "services",
        admin: {
          description: "Maps to HLLButton / GradientRevealText shader variant.",
        },
      },
      {
        name: "revealSpeed",
        type: "select",
        options: [
          { label: "Slow (1200ms)", value: "slow" },
          { label: "Normal (600ms)", value: "normal" },
        ],
        defaultValue: "slow",
      },
      {
        name: "backgroundImage",
        type: "upload",
        relationTo: "media",
      },
    ],
  },
  {
    slug: "richText",
    labels: { singular: "Rich text", plural: "Rich text" },
    fields: [
      {
        name: "content",
        type: "richText",
        required: true,
      },
    ],
  },
  {
    slug: "imageBlock",
    labels: { singular: "Image", plural: "Images" },
    fields: [
      {
        name: "image",
        type: "upload",
        relationTo: "media",
        required: true,
      },
      { name: "caption", type: "text" },
      { name: "fullWidth", type: "checkbox", defaultValue: false },
    ],
  },
  {
    slug: "shaderSection",
    labels: { singular: "Shader section", plural: "Shader sections" },
    fields: [
      {
        name: "variant",
        type: "select",
        options: [...hllVariantOptions],
        required: true,
      },
      {
        name: "intensity",
        type: "number",
        min: 0,
        max: 100,
        defaultValue: 100,
      },
      {
        name: "placement",
        type: "select",
        options: [
          { label: "Full viewport background", value: "full" },
          { label: "Bottom wash", value: "bottom" },
        ],
        defaultValue: "full",
      },
    ],
  },
  {
    slug: "lottieAnimation",
    labels: { singular: "Lottie animation", plural: "Lottie animations" },
    fields: [
      {
        name: "animationFile",
        type: "upload",
        relationTo: "media",
        required: true,
        admin: {
          description: "Upload a .json Lottie file (set Media type to Lottie).",
        },
      },
      { name: "label", type: "text" },
      { name: "loop", type: "checkbox", defaultValue: true },
    ],
  },
  {
    slug: "video",
    labels: { singular: "Video", plural: "Videos" },
    fields: [
      {
        name: "videoFile",
        type: "upload",
        relationTo: "media",
        required: true,
      },
      {
        name: "poster",
        type: "upload",
        relationTo: "media",
      },
      { name: "autoplay", type: "checkbox", defaultValue: false },
      { name: "muted", type: "checkbox", defaultValue: true },
    ],
  },
  {
    slug: "htmlEmbed",
    labels: { singular: "HTML embed", plural: "HTML embeds" },
    fields: [
      {
        name: "html",
        type: "textarea",
        required: true,
        admin: {
          description:
            "Legacy or migration HTML. Sanitize on the React frontend before render.",
        },
      },
    ],
  },
  {
    slug: "cta",
    labels: { singular: "Call to action", plural: "Calls to action" },
    fields: [
      { name: "label", type: "text", required: true },
      { name: "href", type: "text", required: true },
      {
        name: "variant",
        type: "select",
        options: [...hllVariantOptions],
        defaultValue: "services",
      },
    ],
  },
  {
    slug: "contentGrid",
    labels: { singular: "Content grid", plural: "Content grids" },
    fields: [
      { name: "heading", type: "text" },
      {
        name: "items",
        type: "array",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "description", type: "textarea" },
          { name: "href", type: "text" },
          {
            name: "image",
            type: "upload",
            relationTo: "media",
          },
        ],
      },
    ],
  },
];

export const seoFields = [
  {
    name: "seo",
    type: "group" as const,
    fields: [
      { name: "title", type: "text" as const },
      { name: "description", type: "textarea" as const },
      {
        name: "ogImage",
        type: "upload" as const,
        relationTo: "media" as const,
      },
    ],
  },
];

export const publishStatusField = {
  name: "status",
  type: "select" as const,
  defaultValue: "draft",
  options: [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
  ],
  admin: {
    position: "sidebar" as const,
  },
};
