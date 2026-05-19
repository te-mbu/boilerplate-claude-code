import { defineType, defineField } from "sanity";

export const changelogEntry = defineType({
  name: "changelogEntry",
  title: "Changelog Entry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Feature", value: "feature" },
          { title: "Improvement", value: "improvement" },
          { title: "Fix", value: "fix" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "portableText",
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      description: "e.g. 1.2.0",
    }),
  ],
  orderings: [
    {
      title: "Date (Newest)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      date: "date",
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle} — ${date || "No date"}`,
      };
    },
  },
});
