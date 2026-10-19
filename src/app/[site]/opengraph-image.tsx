import { getSite, sites } from "@/lib/sites";
import { renderOg } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Travel guide";

export async function generateStaticParams() {
  return sites.map((s) => ({ site: s.id }));
}

export default async function Image({ params }: { params: Promise<{ site: string }> }) {
  const site = getSite((await params).site);
  return renderOg(site, site?.home.hero.h1);
}
