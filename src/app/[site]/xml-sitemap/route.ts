import { getSite, sites, siteUrl } from "@/lib/sites";

export async function generateStaticParams() {
  return sites.map((s) => ({ site: s.id }));
}

export async function GET(_req: Request, { params }: RouteContext<"/[site]/xml-sitemap">) {
  const site = getSite((await params).site);
  if (!site) return new Response("Not found", { status: 404 });

  const latest = site.guides.map((g) => g.updated).sort().at(-1);
  const urls = [
    { loc: siteUrl(site), lastmod: latest, priority: "1.0" },
    ...site.guides.map((g) => ({ loc: siteUrl(site, `/${g.slug}`), lastmod: g.updated, priority: "0.8" })),
    { loc: siteUrl(site, "/about"), lastmod: undefined, priority: "0.3" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}<priority>${u.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
