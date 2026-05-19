import { defineType, defineField } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Ghost", value: "ghost" },
        ],
      },
      initialValue: "primary",
    }),
    defineField({
      name: "external",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
