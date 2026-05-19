import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (rule) => rule.max(60).warning("Keep under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning("Keep under 160 characters"),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      description: "Prevent this page from being indexed by search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
