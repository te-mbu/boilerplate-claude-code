import { defineType, defineArrayMember } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Rich Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "imageWithAlt",
    }),
    defineArrayMember({
      type: "cta",
    }),
    defineArrayMember({
      type: "codeBlock",
    }),
  ],
});
