import type { CollectionConfig } from "payload";

/** Messages sent from the Contact page form. Written by the server action only. */
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "createdAt"],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "message", type: "textarea", required: true },
    { name: "source", type: "text", label: "How did you hear about us?" },
  ],
};
