import { getSite, sites } from "@/lib/sites";
import { renderOg } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Travel guide";

export async function generateStaticParams({ params }: { params: { site: string } }) {
  const site = sites.find((s) => s.id === params.site);
  return (site?.guides ?? []).map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ site: string; slug: string }> }) {
  const { site: id, slug } = await params;
  const site = getSite(id);
  return renderOg(site, site?.guides.find((g) => g.slug === slug)?.h1);
}
