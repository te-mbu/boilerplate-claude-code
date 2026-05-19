import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContentProvider();
  const post = await content.getBlogPost(slug);

  const title = post?.title ?? "Article";
  const category = post?.category?.title ?? "";
  const author = post?.author?.name ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {category && (
            <div
              style={{
                fontSize: 20,
                color: "#7c8aff",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {author && (
            <div style={{ fontSize: 22, color: "#a0a0b0" }}>Par {author}</div>
          )}
          <div style={{ fontSize: 18, color: "#555566" }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
