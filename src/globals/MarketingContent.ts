import type { GlobalConfig } from "payload";

import { linkItemFields } from "../fields/marketing-fields";

export const MarketingContent: GlobalConfig = {
  slug: "marketing-content",
  label: "Marketing content",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "home",
      type: "group",
      label: "Home page",
      fields: [
        { name: "heroHeading", type: "text" },
        { name: "heroImage", type: "upload", relationTo: "media" },
        { name: "heroCtaLabel", type: "text" },
        { name: "heroCtaHref", type: "text" },
        {
          name: "clientLogos",
          type: "array",
          fields: [
            { name: "name", type: "text" },
            { name: "logo", type: "upload", relationTo: "media" },
          ],
        },
      ],
    },
    {
      name: "about",
      type: "group",
      label: "About page",
      fields: [
        { name: "accentColor", type: "text", defaultValue: "#9AB4D3" },
        {
          name: "hero",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "headline", type: "text" },
            { name: "description", type: "textarea" },
            { name: "image", type: "upload", relationTo: "media" },
            { name: "ctaLabel", type: "text" },
            { name: "ctaHref", type: "text" },
          ],
        },
        {
          name: "story",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text" },
            {
              name: "paragraphs",
              type: "array",
              fields: [{ name: "text", type: "textarea", required: true }],
            },
            { name: "image", type: "upload", relationTo: "media" },
          ],
        },
        {
          name: "values",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text" },
            {
              name: "items",
              type: "array",
              fields: [
                { name: "id", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea" },
              ],
            },
          ],
        },
        {
          name: "promise",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "line1", type: "text" },
            { name: "line2", type: "text" },
          ],
        },
        {
          name: "clients",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text" },
            {
              name: "logos",
              type: "array",
              fields: [
                { name: "name", type: "text" },
                { name: "logo", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "contact",
      type: "group",
      label: "Contact page",
      fields: [
        { name: "accentColor", type: "text", defaultValue: "#076EB8" },
        {
          name: "hero",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "headline", type: "text" },
            { name: "description", type: "textarea" },
          ],
        },
        {
          name: "details",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text" },
            { name: "email", type: "email" },
            { name: "linkedin", type: "text" },
            { name: "linkedinLabel", type: "text" },
            { name: "officeImage", type: "upload", relationTo: "media" },
          ],
        },
        {
          name: "locations",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text" },
            {
              name: "items",
              type: "array",
              fields: [
                { name: "id", type: "text", required: true },
                { name: "city", type: "text", required: true },
                { name: "label", type: "text" },
                { name: "address", type: "textarea" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "careers",
      type: "group",
      label: "Careers page",
      fields: [
        { name: "accentColor", type: "text", defaultValue: "#FF9126" },
        {
          name: "hero",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "headline", type: "text" },
            { name: "description", type: "textarea" },
            { name: "image", type: "upload", relationTo: "media" },
          ],
        },
        {
          name: "culture",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text" },
            { name: "description", type: "textarea" },
            { name: "image", type: "upload", relationTo: "media" },
            {
              name: "highlights",
              type: "array",
              fields: [
                { name: "id", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "team",
      type: "group",
      label: "Team page",
      fields: [
        { name: "accentColor", type: "text", defaultValue: "#9AB4D3" },
        {
          name: "hero",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "headline", type: "text" },
            { name: "description", type: "textarea" },
          ],
        },
        {
          name: "grid",
          type: "group",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text" },
          ],
        },
        {
          name: "join",
          type: "group",
          fields: [
            { name: "title", type: "text" },
            { name: "description", type: "textarea" },
            { name: "ctaLabel", type: "text" },
            { name: "ctaHref", type: "text" },
          ],
        },
      ],
    },
    {
      name: "footerServices",
      type: "array",
      label: "Footer service labels",
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "footerIndustries",
      type: "array",
      label: "Footer industry labels",
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "cta",
      type: "group",
      label: "Global CTA band",
      fields: [
        { name: "headline", type: "text" },
        { name: "buttonLabel", type: "text" },
        { name: "buttonHref", type: "text" },
      ],
    },
  ],
};
