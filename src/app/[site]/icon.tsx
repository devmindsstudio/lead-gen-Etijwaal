import { ImageResponse } from "next/og";
import { getSite, sites } from "@/lib/sites";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return sites.map((s) => ({ site: s.id }));
}

/** Signal-bars favicon in each site's brand colour. */
export default async function Icon({ params }: { params: Promise<{ site: string }> }) {
  const site = getSite((await params).site);
  const bg = site?.brand.primary ?? "#0f766e";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 5,
          padding: 12,
          borderRadius: 14,
          background: bg,
        }}
      >
        {[12, 22, 32, 42].map((h) => (
          <div key={h} style={{ width: 7, height: h, borderRadius: 3, background: "white" }} />
        ))}
      </div>
    ),
    size,
  );
}
