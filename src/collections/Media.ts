import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "mediaType", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
    mimeTypes: [
      "image/*",
      "video/*",
      "application/pdf",
      "application/json",
      "text/html",
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      admin: {
        description: "Required for images used on the public site.",
      },
    },
    {
      name: "mediaType",
      type: "select",
      required: true,
      defaultValue: "image",
      options: [
        { label: "Image", value: "image" },
        { label: "Video", value: "video" },
        { label: "Lottie JSON", value: "lottie" },
        { label: "PDF", value: "pdf" },
        { label: "HTML asset", value: "html" },
        { label: "Other", value: "other" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
