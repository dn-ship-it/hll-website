import type { Field, GlobalConfig } from "payload";

import { linkItemFields } from "../fields/marketing-fields";

/** A Home section's eyebrow and title; empty keeps the current text. */
const headingFields: Field[] = [
  { name: "eyebrow", type: "text" },
  { name: "title", type: "text" },
];

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
        {
          name: "heroVideo",
          type: "upload",
          relationTo: "media",
          admin: { description: "Plays in the hero window (Figma: window with video playing)." },
        },
        { name: "heroCtaLabel", type: "text" },
        { name: "heroCtaHref", type: "text" },
        {
          name: "whatWeDo",
          type: "group",
          label: "What we do",
          admin: { description: "Leave a field empty to keep the current text." },
          fields: [
            ...headingFields,
            {
              name: "items",
              type: "array",
              label: "Capabilities",
              admin: { description: "Shown in this order in the wheel. Empty: the six current capabilities." },
              fields: [
                { name: "label", type: "text", required: true, admin: { description: "Short name in the wheel, e.g. Foundation" } },
                { name: "name", type: "text", required: true, admin: { description: "e.g. HLL Foundation" } },
                { name: "description", type: "textarea", required: true },
                { name: "href", type: "text", required: true, admin: { description: "e.g. /services/hll-foundation" } },
                {
                  name: "variant",
                  type: "select",
                  required: true,
                  admin: { description: "Sets the colours, icon and default image." },
                  options: [
                    { label: "HLL Application", value: "hll-application" },
                    { label: "HLL People & Policy", value: "hll-people" },
                    { label: "HLL Trust & Governance", value: "hll-trust" },
                    { label: "HLL AI", value: "hll-ai" },
                    { label: "HLL Foundation", value: "hll-foundation" },
                    { label: "HLL Ontology", value: "hll-ontology" },
                  ],
                },
                { name: "image", type: "upload", relationTo: "media", admin: { description: "Optional: replaces the default image." } },
              ],
            },
          ],
        },
        {
          name: "promise",
          type: "group",
          label: "Our Promise",
          admin: { description: "Leave empty to keep the current text." },
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "line1", type: "text", admin: { description: "e.g. Intelligence you can audit." } },
            { name: "line2", type: "text", admin: { description: "e.g. Every model we ship carries its evidence with it." } },
          ],
        },
        {
          name: "impactGraph",
          type: "group",
          label: "Impact graph",
          admin: {
            description:
              "The clients in the Our Promise graph. Industries and capabilities are fixed in the design. Empty: the current list.",
          },
          fields: [
            {
              name: "clients",
              type: "array",
              fields: [
                { name: "name", type: "text", required: true },
                {
                  name: "industry",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Banking", value: "banking" },
                    { label: "Insurance", value: "insurance" },
                    { label: "Payments & Capital", value: "payments" },
                    { label: "Pharmaceutical", value: "pharma" },
                    { label: "Healthcare", value: "healthcare" },
                    { label: "Public Sector", value: "public" },
                    { label: "Consulting", value: "consulting" },
                    { label: "Consumer & Commerce", value: "consumer" },
                  ],
                },
                {
                  name: "services",
                  type: "select",
                  hasMany: true,
                  required: true,
                  options: [
                    { label: "Data Engineering", value: "data-engineering" },
                    { label: "Analytics", value: "analytics" },
                    { label: "Artificial Intelligence", value: "ai" },
                    { label: "Ontology", value: "ontology" },
                    { label: "Trust & Governance", value: "trust" },
                    { label: "Cloud Engineering", value: "cloud" },
                    { label: "Applications", value: "applications" },
                    { label: "Experience Design", value: "experience-design" },
                    { label: "People", value: "people" },
                  ],
                },
                { name: "href", type: "text", admin: { description: "Optional link, e.g. a case study." } },
              ],
            },
          ],
        },
        {
          name: "clients",
          type: "group",
          label: "Our Clients",
          fields: headingFields,
        },
        {
          name: "clientLogos",
          type: "array",
          label: "Client logos",
          admin: { description: "Our Clients marquee (PNG, WebP or SVG). Empty: grey placeholders." },
          fields: [
            { name: "name", type: "text" },
            { name: "logo", type: "upload", relationTo: "media" },
          ],
        },
        {
          name: "impact",
          type: "group",
          label: "Our Impact",
          fields: [
            ...headingFields,
            {
              name: "cards",
              type: "array",
              maxRows: 6,
              admin: { description: "Up to 6 cards, placed in the Figma grid in order. Empty: the current cards." },
              fields: [
                { name: "title", type: "text", required: true },
                {
                  name: "tags",
                  type: "array",
                  fields: [{ name: "label", type: "text", required: true }],
                },
                { name: "image", type: "upload", relationTo: "media" },
                { name: "href", type: "text", admin: { description: "Optional link, e.g. /engagement/bajaj" } },
              ],
            },
            {
              name: "stats",
              type: "array",
              label: "Counters",
              maxRows: 2,
              admin: { description: "Two counters, e.g. 60+ / Clients across the world." },
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
            { name: "ctaLabel", type: "text" },
            { name: "ctaHref", type: "text" },
          ],
        },
        {
          name: "howWeWork",
          type: "group",
          label: "How we work",
          admin: { description: "Also shown on the About page." },
          fields: [
            ...headingFields,
            {
              name: "steps",
              type: "array",
              minRows: 3,
              maxRows: 3,
              admin: { description: "Exactly 3 steps. Empty: the current Shape / Build / Evolve." },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
        {
          name: "whoWeAre",
          type: "group",
          label: "Who are we",
          fields: [
            ...headingFields,
            {
              name: "people",
              type: "array",
              maxRows: 4,
              admin: { description: "Up to 4 people. Empty: the current placeholders." },
              fields: [
                { name: "name", type: "text", required: true },
                { name: "role", type: "text", required: true },
                { name: "photo", type: "upload", relationTo: "media" },
              ],
            },
            { name: "ctaLabel", type: "text" },
            { name: "ctaHref", type: "text" },
          ],
        },
        {
          name: "lab",
          type: "group",
          label: "Inside the Lab",
          fields: [
            ...headingFields,
            { name: "background", type: "upload", relationTo: "media" },
            { name: "demoImage", type: "upload", relationTo: "media", admin: { description: "Shown in the demo window." } },
            { name: "demoVideo", type: "upload", relationTo: "media", admin: { description: "Plays in the demo window (the image is its poster)." } },
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
            { name: "eyebrow", type: "text", admin: { hidden: true } },
            { name: "headline", type: "text", admin: { description: "The page title, \"About\"." } },
            { name: "description", type: "textarea", admin: { hidden: true } },
            { name: "image", type: "upload", relationTo: "media", admin: { hidden: true } },
            { name: "ctaLabel", type: "text", admin: { hidden: true } },
            { name: "ctaHref", type: "text", admin: { hidden: true } },
            {
              name: "images",
              type: "array",
              label: "Collage images",
              maxRows: 4,
              admin: { description: "The 4 hero collage tiles, in order. Empty tiles stay grey." },
              fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
            },
          ],
        },
        {
          name: "story",
          type: "group",
          label: "Intro text",
          fields: [
            { name: "eyebrow", type: "text", admin: { hidden: true } },
            { name: "title", type: "text", admin: { hidden: true } },
            {
              name: "paragraphs",
              type: "array",
              admin: { description: "The paragraphs beside the About title." },
              fields: [{ name: "text", type: "textarea", required: true }],
            },
            { name: "image", type: "upload", relationTo: "media", admin: { hidden: true } },
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
                { name: "image", type: "upload", relationTo: "media", admin: { description: "Empty: the current image for this position." } },
                { name: "video", type: "upload", relationTo: "media", admin: { description: "Optional: plays over the image when in focus." } },
              ],
            },
          ],
        },
        {
          name: "leader",
          type: "group",
          label: "Leader quote",
          admin: { description: "Leave a field empty to keep the current text." },
          fields: [
            ...headingFields,
            { name: "quote", type: "textarea" },
            { name: "name", type: "text" },
            { name: "role", type: "text" },
            { name: "portrait", type: "upload", relationTo: "media" },
          ],
        },
        {
          name: "reach",
          type: "group",
          label: "Our Reach",
          fields: [
            ...headingFields,
            {
              name: "stats",
              type: "array",
              admin: { description: "e.g. 20+ Countries. Empty: the current two." },
              fields: [{ name: "text", type: "text", required: true }],
            },
            { name: "map", type: "upload", relationTo: "media", admin: { description: "Empty: the current world map." } },
            {
              name: "pins",
              type: "array",
              admin: {
                description:
                  "Map pins. x and y are positions on the map from 0 to 1 (0, 0 = top left). A pin with a title shows a card. Empty: the current pins.",
              },
              fields: [
                { name: "x", type: "number", required: true, min: 0, max: 1 },
                { name: "y", type: "number", required: true, min: 0, max: 1 },
                { name: "title", type: "text" },
                { name: "location", type: "text" },
                { name: "href", type: "text" },
              ],
            },
          ],
        },
        {
          name: "careers",
          type: "group",
          label: "Careers section",
          admin: {
            description:
              "Also shown on the Team page. The points come from Careers page › Culture › Highlights.",
          },
          fields: [
            ...headingFields,
            { name: "image", type: "upload", relationTo: "media" },
            { name: "label", type: "text", admin: { description: "e.g. Why work at HLL?" } },
            { name: "ctaLabel", type: "text" },
            { name: "ctaHref", type: "text" },
          ],
        },
        {
          name: "promise",
          type: "group",
          admin: { hidden: true },
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "line1", type: "text" },
            { name: "line2", type: "text" },
          ],
        },
        {
          name: "clients",
          type: "group",
          admin: { hidden: true },
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
            { name: "scheduleUrl", type: "text", admin: { description: "Schedule a call link (e.g. Calendly)." } },
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
                { name: "company", type: "text", admin: { description: "e.g. Hyper Lychee Labs" } },
                { name: "address", type: "textarea" },
                { name: "taxLabel", type: "text", admin: { description: "e.g. EIN No:, GSTIN:" } },
                { name: "taxId", type: "text" },
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
        {
          name: "noRolesMessage",
          type: "textarea",
          admin: { description: "Shown in Open Roles when no roles are open." },
        },
        {
          name: "aboutHll",
          type: "group",
          label: "About HLL (job pages)",
          admin: { description: "The \"About HLL\" section at the bottom of every job page." },
          fields: [
            { name: "image", type: "upload", relationTo: "media" },
            {
              name: "paragraphs",
              type: "array",
              fields: [{ name: "text", type: "textarea", required: true }],
            },
          ],
        },
        {
          name: "teamVoices",
          label: "Team Voice testimonials",
          type: "array",
          admin: {
            description:
              "The Team Voice carousel's slides, in order. The arrows, swipe and timer move between them.",
          },
          fields: [
            { name: "quote", type: "textarea", required: true },
            { name: "name", type: "text" },
            { name: "role", type: "text" },
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
      admin: { description: "The \"Let's start a conversation\" band above the footer on every page." },
      fields: [
        { name: "headline", type: "text" },
        { name: "buttonLabel", type: "text" },
        { name: "buttonHref", type: "text" },
        { name: "still", type: "upload", relationTo: "media", admin: { description: "Image behind the band." } },
        { name: "video", type: "upload", relationTo: "media", admin: { description: "Plays in the band on hover." } },
      ],
    },
    {
      name: "allCapabilities",
      type: "group",
      label: "All Capabilities wheel",
      admin: { description: "The wheel on /services. Empty: the current seven capabilities." },
      fields: [
        {
          name: "items",
          type: "array",
          label: "Capabilities",
          admin: { description: "Top to bottom." },
          fields: [
            { name: "name", type: "text", required: true },
            { name: "href", type: "text", admin: { description: "e.g. /services/hll-ai. Empty: shown without a link." } },
            { name: "description", type: "textarea" },
            {
              name: "tile",
              type: "select",
              required: true,
              admin: { description: "Tile colours and icon." },
              options: [
                { label: "HLL Application", value: "hll-application" },
                { label: "HLL People & Policy", value: "hll-people" },
                { label: "HLL Trust & Governance", value: "hll-trust" },
                { label: "HLL AI", value: "hll-ai" },
                { label: "HLL Foundation", value: "hll-foundation" },
                { label: "HLL Ontology", value: "hll-ontology" },
                { label: "HLL Cloud", value: "hll-cloud" },
              ],
            },
            {
              name: "subServices",
              type: "array",
              fields: [{ name: "label", type: "text", required: true }],
            },
          ],
        },
        {
          name: "startIndex",
          type: "number",
          min: 1,
          admin: { description: "Which capability is in focus first (1 = top). Empty: the 4th." },
        },
      ],
    },
    {
      name: "industryMenu",
      type: "array",
      label: "Industries menu",
      admin: {
        description:
          "Groups in the Industries menu, the mobile menu and the footer (three per footer column). Empty: the current six groups.",
      },
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "items",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", admin: { description: "Optional, e.g. /industries/healthcare. Empty: shown without a link." } },
          ],
        },
      ],
    },
  ],
};
