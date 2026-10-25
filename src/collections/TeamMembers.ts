import type { CollectionConfig } from "payload";

import { revalidateOnChangeOrDelete } from "@/lib/payload/revalidate-site";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  // Edits show on the site without a redeploy.
  hooks: revalidateOnChangeOrDelete,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "department", "featured"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "department",
      type: "select",
      required: true,
      defaultValue: "leadership",
      options: [
        { label: "Leadership", value: "leadership" },
        { label: "Engineering", value: "engineering" },
        { label: "Design", value: "design" },
        { label: "Operations", value: "operations" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
  ],
};
