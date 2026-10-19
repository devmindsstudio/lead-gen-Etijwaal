import { NextResponse, type NextRequest } from "next/server";
import { hosts, siteIds, DEFAULT_SITE, SITE_METADATA_FILES } from "@/lib/hosts";

/**
 * Multi-domain routing: dubai-esim.com/foo  →  /dubai-esim/foo (internal rewrite).
 * The browser URL never changes; each domain only ever sees its own site.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const { pathname, search } = request.nextUrl;

  const entry = hosts[host];
  let site: string;

  if (entry) {
    site = entry.site;
    // www → apex (or any alias → primary) so Google sees one canonical host.
    if (!entry.canonical) {
      const primary = Object.keys(hosts).find(
        (h) => hosts[h].site === site && hosts[h].canonical,
      );
      if (primary) {
        return NextResponse.redirect(`https://${primary}${pathname}${search}`, 308);
      }
    }
  } else {
    // Local dev / *.vercel.app previews: `?site=saudi-sim` switches site (remembered in a cookie),
    // `saudi-sim.localhost:3000` also works, otherwise DEFAULT_SITE.
    const sub = host.split(".")[0];
    const fromQuery = request.nextUrl.searchParams.get("site");
    const fromCookie = request.cookies.get(PREVIEW_COOKIE)?.value;
    site =
      [fromQuery, fromCookie, host.endsWith(".localhost") ? sub : null].find(
        (s): s is string => !!s && siteIds.includes(s),
      ) ?? DEFAULT_SITE;
  }
  const preview = !entry;

  const prefix = `/${site}`;
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    const rest = pathname.slice(prefix.length) || "/";
    // Next serves per-site OG images / icons under /<site>/…; let those through.
    if (SITE_METADATA_FILES.test(rest)) return finish(NextResponse.next(), preview, request, site);
    // Anything else would be duplicate content — collapse to the clean URL.
    const url = request.nextUrl.clone();
    url.pathname = rest;
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `${prefix}${pathname === "/" ? "" : pathname}`;
  return finish(NextResponse.rewrite(url), preview, request, site);
}

const PREVIEW_COOKIE = "preview-site";

/** Preview hosts must never be indexed (they'd duplicate the real domains). */
function finish(res: NextResponse, preview: boolean, request: NextRequest, site: string) {
  if (!preview) return res;
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  if (request.nextUrl.searchParams.get("site") === site) {
    res.cookies.set(PREVIEW_COOKIE, site, { path: "/", sameSite: "lax" });
  }
  return res;
}

export const config = {
  matcher: [
    // Everything except Next internals and static assets in /public.
    // robots.txt and sitemap.xml are intentionally matched: they're generated per site.
    "/((?!_next/|api/|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|map|woff2?)$).*)",
  ],
};
