import type { Field } from "payload";

export const linkItemFields: Field[] = [
  { name: "label", type: "text", required: true },
  { name: "href", type: "text", required: true },
];

export const heroTabFields: Field[] = [
  { name: "id", type: "text", required: true },
  { name: "label", type: "text", required: true },
];

export const servicePageContentFields: Field[] = [
  { name: "brand", type: "text" },
  {
    name: "breadcrumb",
    type: "array",
    fields: [{ name: "label", type: "text", required: true }],
  },
  {
    name: "hero",
    type: "group",
    fields: [
      { name: "headline", type: "text" },
      { name: "tabs", type: "array", fields: heroTabFields },
      { name: "image", type: "upload", relationTo: "media" },
    ],
  },
  {
    name: "capabilities",
    type: "group",
    fields: [
      { name: "eyebrow", type: "text" },
      { name: "title", type: "text" },
      {
        name: "items",
        type: "array",
        fields: [
          { name: "id", type: "text", required: true },
          { name: "index", type: "text" },
          { name: "title", type: "text", required: true },
          { name: "description", type: "textarea" },
          {
            name: "subServices",
            type: "array",
            fields: [{ name: "label", type: "text", required: true }],
          },
        ],
      },
      {
        name: "tools",
        type: "group",
        fields: [
          {
            name: "cloud",
            type: "array",
            fields: [{ name: "label", type: "text", required: true }],
          },
          {
            name: "data",
            type: "array",
            fields: [{ name: "label", type: "text", required: true }],
          },
        ],
      },
    ],
  },
  {
    name: "outcomes",
    type: "group",
    fields: [
      { name: "title", type: "text" },
      {
        name: "cards",
        type: "array",
        fields: [
          { name: "stat", type: "text", required: true },
          { name: "description", type: "textarea" },
          { name: "hasMedia", type: "checkbox", defaultValue: false },
          { name: "image", type: "upload", relationTo: "media" },
        ],
      },
    ],
  },
  {
    name: "engagement",
    type: "group",
    fields: [
      { name: "title", type: "text" },
      { name: "intro", type: "textarea" },
      {
        name: "cards",
        type: "array",
        fields: [
          { name: "id", type: "text", required: true },
          { name: "title", type: "text", required: true },
          { name: "client", type: "text" },
          { name: "tag", type: "text" },
          { name: "description", type: "textarea" },
          {
            name: "variant",
            type: "select",
            options: [
              { label: "Navy", value: "navy" },
              { label: "Orange", value: "orange" },
              { label: "Image", value: "image" },
            ],
            defaultValue: "navy",
          },
          { name: "image", type: "upload", relationTo: "media" },
        ],
      },
    ],
  },
  {
    name: "expertVoice",
    type: "group",
    fields: [
      { name: "quote", type: "textarea" },
      { name: "name", type: "text" },
      { name: "role", type: "text" },
      { name: "company", type: "text" },
      { name: "portrait", type: "upload", relationTo: "media" },
    ],
  },
  {
    name: "relatedServices",
    type: "array",
    fields: linkItemFields,
  },
];

export const industryPageContentFields: Field[] = [
  { name: "category", type: "text" },
  {
    name: "breadcrumb",
    type: "array",
    fields: [{ name: "label", type: "text", required: true }],
  },
  { name: "accentColor", type: "text", defaultValue: "#0D9488" },
  {
    name: "hero",
    type: "group",
    fields: [
      { name: "title", type: "text" },
      { name: "headline", type: "text" },
      { name: "overlayLabel", type: "text" },
      { name: "image", type: "upload", relationTo: "media" },
      { name: "filters", type: "array", fields: heroTabFields },
    ],
  },
  {
    name: "capabilities",
    type: "group",
    fields: [
      { name: "eyebrow", type: "text" },
      { name: "title", type: "text" },
      {
        name: "sidebar",
        type: "array",
        fields: [{ name: "label", type: "text", required: true }],
      },
      {
        name: "items",
        type: "array",
        fields: [
          { name: "id", type: "text", required: true },
          { name: "index", type: "text" },
          { name: "title", type: "text", required: true },
          { name: "description", type: "textarea" },
          {
            name: "cards",
            type: "array",
            fields: [
              { name: "id", type: "text", required: true },
              { name: "title", type: "text", required: true },
              { name: "client", type: "text" },
              { name: "tag", type: "text" },
              { name: "description", type: "textarea" },
              {
                name: "variant",
                type: "select",
                options: [
                  { label: "Navy", value: "navy" },
                  { label: "Orange", value: "orange" },
                  { label: "Image", value: "image" },
                ],
              },
              { name: "image", type: "upload", relationTo: "media" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "clientVoice",
    type: "group",
    fields: [
      { name: "eyebrow", type: "text" },
      { name: "quote", type: "textarea" },
      { name: "name", type: "text" },
      { name: "role", type: "text" },
      { name: "company", type: "text" },
      { name: "slideCount", type: "number", defaultValue: 3 },
      { name: "galleryImage", type: "upload", relationTo: "media" },
    ],
  },
  {
    name: "experts",
    type: "group",
    fields: [
      { name: "eyebrow", type: "text" },
      { name: "title", type: "text" },
      {
        name: "people",
        type: "array",
        fields: [
          { name: "name", type: "text", required: true },
          { name: "bio", type: "textarea" },
          { name: "photo", type: "upload", relationTo: "media" },
        ],
      },
    ],
  },
  {
    name: "lab",
    type: "group",
    fields: [
      { name: "eyebrow", type: "text" },
      { name: "title", type: "text" },
      { name: "selectorLabel", type: "text" },
      { name: "demoUrl", type: "text" },
    ],
  },
  {
    name: "relatedIndustries",
    type: "array",
    fields: linkItemFields,
  },
];
