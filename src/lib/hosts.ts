/**
 * Domain → site id map used by the proxy. Generated from `domain` / `aliases` in /sites/*.json
 * (scripts/sync-sites.mjs) and kept separate from the full configs so the proxy bundle stays tiny.
 */
import { hosts } from "./hosts.generated";

export { hosts };

export const siteIds = [...new Set(Object.values(hosts).map((h) => h.site))];

/** Used for localhost and *.vercel.app previews. `saudi-sim.localhost:3000` picks a specific site. */
export const DEFAULT_SITE = process.env.DEFAULT_SITE ?? "dubai-esim";

/** Files Next generates per site (and per guide) that legitimately live under /<site>/… */
export const SITE_METADATA_FILES =
  /^(?:\/[a-z0-9-]+)?\/(opengraph-image|twitter-image|icon|apple-icon)(?:[-\w]*)?(?:\.\w+)?$/;
