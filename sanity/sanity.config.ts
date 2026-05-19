import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./schemas";

export default defineConfig({
  name: "default",
  title: "[Client Name]",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [structureTool()],

  schema: {
    types: schemas,
  },
});
