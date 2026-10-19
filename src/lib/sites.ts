import { siteSchema, type Site } from "./schema";
import { rawSites } from "./sites.generated";

/**
 * Every site this deployment serves, validated against the schema.
 * To add a site: drop its JSON in /sites (the registry regenerates on dev/build), then add the domain in Vercel.
 */
export const sites: Site[] = rawSites.map((s) => {
  const parsed = siteSchema.safeParse(s);
  if (!parsed.success) {
    const id = (s as { id?: string }).id ?? "unknown";
    throw new Error(
      `Invalid site config "${id}":\n${parsed.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n")}`,
    );
  }
  return parsed.data;
});

const byId = new Map(sites.map((s) => [s.id, s]));

export function getSite(id: string): Site | undefined {
  return byId.get(id);
}

export function siteUrl(site: Site, path = "/"): string {
  return `https://${site.domain}${path === "/" ? "" : path}`;
}

/** Template microcopy with {place} filled in. */
export function copy(site: Site, key: Exclude<keyof Site["copy"], "deviceRows">): string {
  return site.copy[key].replaceAll("{place}", site.market.city ?? site.market.country);
}

/** Outbound link to the partner with UTM tags so every lead is attributable per domain. */
export function ctaHref(site: Site, content: string): string {
  const url = new URL(site.cta.url);
  url.searchParams.set("utm_source", site.domain);
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", site.cta.campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}
