import { getSite, sites, siteUrl } from "@/lib/sites";

export async function generateStaticParams() {
  return sites.map((s) => ({ site: s.id }));
}

export async function GET(_req: Request, { params }: RouteContext<"/[site]/robots.txt">) {
  const site = getSite((await params).site);
  if (!site) return new Response("Not found", { status: 404 });
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl(site, "/sitemap.xml")}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
