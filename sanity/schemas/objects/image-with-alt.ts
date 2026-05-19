import { defineType, defineField } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for accessibility",
      validation: (rule) => rule.required().error("Alt text is required"),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "alt",
    },
  },
});
