import { defineType, defineField } from "sanity";

export const faqGroup = defineType({
  name: "faqGroup",
  title: "FAQ Group",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
