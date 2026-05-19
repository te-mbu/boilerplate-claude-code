import { type ContentProvider } from "./types";

let provider: ContentProvider | null = null;

export async function getContentProvider(): Promise<ContentProvider> {
  if (provider) return provider;

  if (process.env.CONTENT_PROVIDER === "sanity") {
    const { SanityContentProvider } = await import("./sanity-provider");
    provider = new SanityContentProvider();
  } else {
    const { StaticContentProvider } = await import("./static-provider");
    provider = new StaticContentProvider();
  }

  return provider;
}

export type { ContentProvider } from "./types";
export * from "./types";
