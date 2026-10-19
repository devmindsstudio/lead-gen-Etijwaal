# eTijwaal lead-gen sites

One Next.js codebase that serves many SEO landing sites (dubai-esim.com, saudi-sim.com, …), each on its own domain, all sending buyers to eTijwaal with UTM tracking.

## How it works

```
request: dubai-esim.com/whatsapp-calls-in-dubai
   │
   ▼  src/proxy.ts      looks up the host (map generated from sites/*.json)
   ▼  rewrite →         /dubai-esim/whatsapp-calls-in-dubai   (internal only, URL unchanged)
   ▼  src/app/[site]/…  renders using sites/dubai-esim.json
```

| Path | Purpose |
|---|---|
| `sites/<id>.json` | **All content for one site**: brand colours, SEO meta, home sections, guides, FAQs |
| `src/lib/schema.ts` | The JSON contract (zod). The build fails if a site file doesn't match it |
| `src/lib/sites.ts` | Validated site registry, plus the CTA/UTM helper |
| `src/lib/hosts.ts` | Domain → site map used by the proxy |
| `scripts/sync-sites.mjs` | Generates the registry and domain map from `/sites` (runs before dev/build) |
| `.claude/skills/build-landing-site/` | **The research-and-build skill**: researches a business and market, then writes a site |
| `src/app/[site]/` | Shared templates: home, `[slug]` guides, about, robots.txt, sitemap.xml, OG image, favicon |
| `scripts/check-sites.mjs` | Pre-build lint: schema, unique domains, duplicate titles, thin pages, sentences copied between sites (`--online` also checks CTA URLs) |

### SEO built in, for every site
- Fully static HTML (SSG), with real 404s for unknown URLs
- Self-referencing canonicals; `www` and `/<site-id>/…` paths 308-redirect to the clean URL
- Per-domain `robots.txt` and `sitemap.xml`
- JSON-LD: WebSite, FAQPage, Article, BreadcrumbList
- Auto-generated OG/Twitter share images and favicon in each site's brand colours
- FAQ answers in crawlable `<details>` blocks

### Lead tracking
Every CTA links to the eTijwaal shop page with
`utm_source=<domain>&utm_medium=referral&utm_campaign=<cta.campaign>&utm_content=<placement>`,
so eTijwaal's analytics shows which **domain** and which **button** (hero, header, guide-inline, …) drove each sale.
Set `analytics.ga4Id` in a site's JSON to add GA4. CTA clicks are sent as a `cta_click` event.

## Local development

```bash
npm install
npm run dev
```
- http://localhost:3000 serves the default site (`DEFAULT_SITE`, which is `dubai-esim`)
- http://dubai-esim.localhost:3000 picks a site by subdomain, which is useful once there are several

`npm run check:sites` validates all site files. It also runs automatically before `npm run build`.

## Adding a new site

**With the skill (recommended).** In Claude Code, from this repo, ask for example:

> Use build-landing-site to build oman-esim.com for etijwaal, sending people to https://etijwaal.com/shop/Oman-esim-travel-packages, aimed at Oman tourists.

The skill researches the partner and the market, plans keywords, writes `sites/oman-esim.json`, and validates it. It also works for partners other than eTijwaal: set `partner` and `copy` in the JSON.

**By hand.** Copy an existing `sites/*.json`, change everything, and run `npm run check:sites -- --online`. No code changes are needed; the registry and domain map regenerate automatically.

**Then, to launch:**
1. Commit and push. Vercel redeploys.
2. In Vercel, go to Settings → Domains and add `<domain>` and `www.<domain>`. Point DNS to Vercel as instructed there.
3. Add the domain as a property in Google Search Console and submit `https://<domain>/sitemap.xml`.

## Deploying (Vercel)

1. Push this repo to GitHub and import it into Vercel. No settings are needed beyond the defaults.
2. Add each domain under Settings → Domains. Every domain points at the same deployment.
3. **Testing before the domains are connected:** on any `*.vercel.app` URL, add `?site=<id>` to switch sites, e.g. `https://<project>.vercel.app/?site=saudi-sim`. The choice is remembered while you browse that site, and `?site=dubai-esim` switches back. Preview URLs are sent with `X-Robots-Tag: noindex`, so they never compete with the real domains in Google.

## Content to verify with eTijwaal before launch

The pilot copy is written to be accurate but cautious. Before going live, confirm:
- [ ] The CTA target URL and whether eTijwaal wants an affiliate/referral code added to links
- [ ] WhatsApp-calling claims on UAE plans (the copy follows eTijwaal's own UAE page wording)
- [ ] Whether UAE plans are data-only, plan activation policy, and hotspot support
- [ ] Whether eTijwaal wants a WhatsApp/support contact or a lead form on the sites
- [ ] GA4 measurement ID for each domain
