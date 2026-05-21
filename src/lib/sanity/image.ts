// Sanity image URL builder — STUB
// When cms: "sanity" is set, run: pnpm add @sanity/client @sanity/image-url
// Then uncomment the real implementation below.

// import imageUrlBuilder from "@sanity/image-url";
// import { sanityClient } from "./client";
//
// const builder = imageUrlBuilder(sanityClient);
// export function urlFor(source: unknown) {
//   return builder.image(source);
// }

export function urlFor(_source: unknown) {
  throw new Error("Sanity not configured. Install @sanity/client and @sanity/image-url first.");
}
