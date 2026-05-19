import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/metadata";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a0a0b0",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            {siteConfig.description}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            fontSize: 18,
            color: "#555566",
          }}
        >
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
