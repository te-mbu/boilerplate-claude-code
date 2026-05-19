import { defineType, defineField } from "sanity";

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "JavaScript", value: "javascript" },
          { title: "TypeScript", value: "typescript" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "Python", value: "python" },
          { title: "Bash", value: "bash" },
          { title: "JSON", value: "json" },
          { title: "GraphQL", value: "graphql" },
          { title: "SQL", value: "sql" },
          { title: "Markdown", value: "markdown" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "filename",
      title: "Filename",
      type: "string",
      description: "Optional filename to display above the code block",
    }),
  ],
  preview: {
    select: { title: "filename", subtitle: "language" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Code Block",
        subtitle: subtitle || "Plain text",
      };
    },
  },
});
