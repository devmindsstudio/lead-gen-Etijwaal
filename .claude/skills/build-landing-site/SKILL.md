---
name: build-landing-site
description: Research a business and a target market, then build a complete SEO lead-gen site for it in this multi-domain repo (one sites/<id>.json file). Use when asked to create, generate or research a new landing site/domain, e.g. "build saudi-sim.com for etijwaal's Saudi plans".
---

# Build a lead-gen landing site

This repo serves many domains from one Next.js app. **A site is a single JSON file** in `/sites/<id>.json`. Templates, routing, sitemap, robots, schema.org markup and OG images are all automatic. Your job is to research the topic and write excellent, accurate content into that file.

- Contract: `src/lib/schema.ts` (zod). Read it first; every field is enforced.
- Reference implementation: `sites/dubai-esim.json`. Match its depth and tone, **never its sentences**.

## 0. Inputs

You need the following. Ask only for what's missing and can't be inferred:

| Input | Example |
|---|---|
| Domain | `saudi-sim.com` (the id is the domain without its TLD: `saudi-sim`) |
| Partner (the business we generate leads for) | `https://etijwaal.com` |
| Target page the CTA should send people to | `https://etijwaal.com/shop/Saudi-Arabia-esim-travel-packages` |
| Market / topic angle | Saudi Arabia, tourists + business travellers; or "Umrah pilgrims" |

## 1. Research the partner (don't skip)

1. Fetch the partner's homepage, `/sitemap.xml` and the target page. Use `curl -sL -A "Mozilla/5.0"` if WebFetch returns only a title, because many sites render client-side.
2. Record: what they sell, USPs, how purchase works (web/app), and support/privacy/terms URLs.
3. Confirm the target URL actually exists in their sitemap or returns 200.
4. **Never invent prices, plan sizes, ratings, user counts or guarantees.** If the partner page doesn't state it, the site doesn't claim it. Point people to the CTA for plan details.
5. Note any partner claims you repeat (e.g. "WhatsApp calls work"). Attribute them to the partner and list them in your final report for client verification.

### Partner notes: eTijwaal
- Country pages are `https://etijwaal.com/shop/<Country-Name>-esim-travel-packages`. Region pages (GCC, Umrah, Hajj, …) are `https://etijwaal.com/region/<Name>-esim-travel-packages`. All of them are listed in `https://etijwaal.com/sitemap.xml`.
- Plan details (validity, network, hotspot, top-up) load client-side from `https://services.etijwaal.com/api/package/…`. You can read them to check facts, but **don't publish prices**, because they change.
- The FAQ pages under `https://etijwaal.com/faqs/…` are the source for activation, top-up and "data-only" claims.

## 2. Research the market and search intent

Run several WebSearch queries in parallel for:
- the head keyword ("saudi arabia esim", "sim card saudi arabia tourist") and the questions people ask about it
- local facts travellers need: operators, coverage, regulations, registration rules, arrival logistics, apps that do or don't work, payment, language
- what the top-ranking pages cover, so you can find gaps to cover better (don't copy them)

Every factual claim needs a credible source (operator, government or official tourism sites preferred). If sources disagree, or a fact is likely to change, write it cautiously ("has historically", "check before you travel") or leave it out.

## 3. Plan the site (a keyword map)

- **Home** targets the head keyword, e.g. `Saudi eSIM for Tourists`.
- **4–5 guides**, each targeting one distinct long-tail intent. Good patterns: setup how-to, the key local pain point (calls, VoIP, registration), local SIM vs eSIM vs roaming, compatibility, a niche audience (Umrah, business, transit), and data needs for a specific itinerary.
- Read every other file in `/sites` first. **This site must have its own angle.** Don't reuse guide topics word for word, titles or sentences from sibling sites. Google treats near-duplicate sites as doorway pages. Topics can overlap (every eSIM site can have an install guide), but the content must be specific to this market: local menu paths, local networks, local airports, local apps.

## 4. Write `sites/<id>.json`

Rules the schema can't enforce:
- **SEO:** `seo.title` ≤ 60 characters with the head keyword near the front. Descriptions should be 140–160 characters with a benefit and an action. Guide `title`s must be unique across all sites. One `h1` per page, phrased differently from the `<title>`.
- **Depth:** each guide should be **450+ words** (intro + sections + FAQ answers), with 4–6 sections and 2–3 guide FAQs. The home page needs 6–8 FAQs. Answer first, then explain.
- **Voice:** helpful travel-guide tone, in the second person. Use the partner's name only in the about/disclosure copy and attributed claims. Don't hard-sell in the guides; the templates add CTAs automatically.
- **Honesty:** `about.paragraphs` must say plainly that the plans are sold and supported by the partner. Set `partner.disclosure` accordingly.
- **Design:** set `design` to the layout language that fits the market, and prefer one that sibling sites aren't already using:
  - `skyline`: dark night-city luxury, glass panels, bento grid (Dubai)
  - `geometric`: desert sand, 8-point star patterns, bold editorial type, sharp corners (Saudi)
  - `boarding`: airline and boarding-pass styling, serif display type, itinerary timeline (Qatar and transit hubs)
  - `arch`: calm, centred layout with arch motifs and soft serif type (pilgrimage and heritage)
  - `coastal`: sea and mountain motifs, postcard-and-stamp hero, airy rounded cards (coastlines, nature and adventure destinations)
  - `network`: route map linking several places, grid background, monospace data labels (multi-country and regional plans). Fill `market.places` with the covered countries

  Each design changes typography, the hero, section layouts, buttons, header and footer. Content stays the same.
- **Brand:** pick a `primary` colour distinct from the sibling sites (it drives the favicon, OG image and buttons). `primaryInk` must have ≥ 4.5:1 contrast on `primary` (white on a dark primary). `accent` is used for small highlights on dark backgrounds.
- **CTA:** `cta.url` is the partner's target page with **no UTM parameters** (they're added automatically per button). Use `cta.campaign` = the site id.
- **Non-eSIM niche?** Override the template microcopy in `copy` (`headerCta`, `benefitsEyebrow`, `benefitsHeading`, `howItWorksHeading`, `inlineCta`, `bannerHeading`, `bannerBody`, `deviceRows`). `{place}` expands to the city or country. eSIM defaults apply when `copy` is omitted.
- Each guide's `navLabel` (≤ 24 characters) is what the header shows for the first 3 guides. Keep it 1–3 words ("Calling apps", "Setup guide").
- `copy.signalLabel` is the network badge in the hero phone ("5G" by default). Set it to "4G" if the partner's plans for this market are LTE only.
- `updated` dates are today's date (YYYY-MM-DD).
- `aliases` normally holds just `www.<domain>`.

## 5. Validate (all errors AND warnings must be fixed)

```bash
npm run check:sites -- --online
```
This checks the schema, unique domains, reserved slugs, duplicate titles across sites, thin guides (< 450 words), sentences reused from other sites, and that the CTA URL responds. It also regenerates the registry and domain map, so there's no code to edit.

Then build and smoke-test (skip this if another agent is building at the same time):
```bash
npm run build && npx next start -p 3100
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: <domain>" http://localhost:3100/
curl -s -H "Host: <domain>" http://localhost:3100/sitemap.xml
```
Every guide URL should return 200 and `/does-not-exist` should return 404.

## 6. Report back

- The domain, page list with target keywords, and total word count
- **Facts to verify with the partner**: every partner claim you repeated, plus anything uncertain
- Launch steps: add `<domain>` and `www.<domain>` to the Vercel project's Domains, point DNS, and create a Search Console property and submit `/sitemap.xml`
