import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050816",
          color: "#f4f1fb",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#915EFF" }}>Portfolio</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{siteConfig.name}</div>
          <div style={{ marginTop: 16, fontSize: 32, color: "#aaa6c3" }}>{siteConfig.role}</div>
        </div>
        <div style={{ fontSize: 24, color: "#aaa6c3" }}>{siteConfig.location}</div>
      </div>
    ),
    { ...size }
  );
}
