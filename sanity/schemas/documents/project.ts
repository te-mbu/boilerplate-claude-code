import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
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
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Landing Page", value: "landing" },
          { title: "Marketing Site", value: "marketing" },
          { title: "Corporate Site", value: "corporate" },
          { title: "Portfolio", value: "portfolio" },
          { title: "SaaS", value: "saas" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "url",
      title: "Project URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "completedAt",
      title: "Completed At",
      type: "date",
    }),
  ],
  orderings: [
    {
      title: "Completed (Newest)",
      name: "completedAtDesc",
      by: [{ field: "completedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "mainImage",
    },
  },
});
