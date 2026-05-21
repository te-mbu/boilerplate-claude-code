// Sanity client — STUB
// This file is a placeholder. When cms: "sanity" is set in client.config.ts,
// run: pnpm add @sanity/client @sanity/image-url
// Then uncomment the real implementation below.

// import { createClient } from "@sanity/client";
//
// export const sanityClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
//   apiVersion: "2024-01-01",
//   useCdn: process.env.NODE_ENV === "production",
//   token: process.env.SANITY_API_TOKEN,
// });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sanityClient = null as unknown as { fetch: (query: string, params?: Record<string, unknown>) => Promise<any> };
