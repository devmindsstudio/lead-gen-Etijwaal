import { ImageResponse } from "next/og";
import type { Site } from "./schema";

/** Shared by the home and guide OG images. */
export function renderOg(site: Site | undefined, headline?: string) {
  const name = site?.brand.name ?? "";
  const primary = site?.brand.primary ?? "#0f766e";
  const accent = site?.brand.accent ?? "#f59e0b";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: `linear-gradient(135deg, ${primary} 0%, #0f172a 100%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: accent, display: "flex" }} />
          {name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 950 }}>
            {headline ?? name}
          </div>
          <div style={{ fontSize: 32, opacity: 0.8 }}>{site?.brand.tagline}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
