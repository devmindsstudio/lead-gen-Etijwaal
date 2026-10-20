// Validates every /sites/*.json before deploy: schema, unique domains, and SEO hygiene
// (duplicate titles, thin pages, and copy reused across sites, which is a doorway-page risk).
// Run: npm run check:sites            (add --online to also verify each CTA URL responds)
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { siteSchema } from "../src/lib/schema.ts";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const dir = join(root, "sites");
const online = process.argv.includes("--online");

let errors = 0;
let warnings = 0;
const err = (id, msg) => (errors++, console.log(`  ✗ [${id}] ${msg}`));
const warn = (id, msg) => (warnings++, console.log(`  ! [${id}] ${msg}`));

const words = (...parts) => parts.flat(Infinity).join(" ").split(/\s+/).filter(Boolean).length;
const titles = new Map();
const domains = new Map();
const sentences = new Map(); // normalised sentence -> "site:path"

const sectionText = (secs) => secs.map((x) => [x.paragraphs, x.bullets ?? []]);

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const raw = JSON.parse(readFileSync(join(dir, file), "utf8"));
  const id = raw.id ?? file;
  const parsed = siteSchema.safeParse(raw);
  if (!parsed.success) {
    for (const i of parsed.error.issues) err(id, `${i.path.join(".")}: ${i.message}`);
    continue;
  }
  const s = parsed.data;

  if (`${s.id}.json` !== file) err(id, `file name should be ${s.id}.json`);
  for (const d of [s.domain, ...s.aliases]) {
    if (domains.has(d)) err(id, `domain ${d} is already used by ${domains.get(d)}`);
    domains.set(d, s.id);
  }
  const slugs = s.guides.map((g) => g.slug);
  for (const reserved of ["about", "robots.txt", "sitemap.xml", "xml-sitemap", "icon", "opengraph-image", s.id])
    if (slugs.includes(reserved)) err(id, `guide slug "${reserved}" is reserved`);
  if (new Set(slugs).size !== slugs.length) err(id, "duplicate guide slugs");

  const pages = [
    { path: "/", title: s.seo.title, body: [sectionText(s.home.sections), s.home.faqs.map((f) => f.a)] },
    ...s.guides.map((g) => ({
      path: `/${g.slug}`,
      title: g.title,
      body: [g.intro, sectionText(g.sections), g.faqs.map((f) => f.a)],
    })),
  ];
  for (const p of pages) {
    const key = p.title.toLowerCase();
    if (titles.has(key)) err(id, `duplicate <title> "${p.title}" (also on ${titles.get(key)})`);
    titles.set(key, `${s.domain}${p.path}`);

    const n = words(p.body);
    if (p.path !== "/" && n < 450) warn(id, `${p.path} has only ${n} words (aim for 450+), thin content risk`);

    for (const sentence of p.body.flat(Infinity).join(" ").split(/(?<=[.!?])\s+/)) {
      const norm = sentence.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
      if (norm.split(" ").length < 12) continue;
      const where = sentences.get(norm);
      if (where && !where.startsWith(`${s.id}:`))
        warn(id, `${p.path} reuses a sentence from ${where}: "${sentence.slice(0, 70)}…"`);
      else sentences.set(norm, `${s.id}:${p.path}`);
    }
  }
  // Every referenced photo must exist on disk.
  const photos = [s.images?.hero, ...(s.images?.places ?? []), ...s.guides.map((g) => g.image)].filter(Boolean);
  for (const ph of photos) {
    try {
      readFileSync(join(root, "public", ph.src));
    } catch {
      err(id, `missing image file public${ph.src}`);
    }
  }
  if (!s.images) warn(id, "no images: add a hero photo and place photos (see SKILL.md, Photos)");
  for (const g of s.guides) if (!g.image) warn(id, `/${g.slug} has no cover image`);

  if (s.guides.length < 4) warn(id, `only ${s.guides.length} guides, aim for 4+ for topical depth`);

  if (online) {
    try {
      const res = await fetch(s.cta.url, { method: "GET", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) err(id, `CTA URL returned ${res.status}: ${s.cta.url}`);
    } catch (e) {
      err(id, `CTA URL unreachable: ${s.cta.url} (${e.message})`);
    }
  }
  console.log(`  ✓ ${s.domain}: ${s.guides.length} guides, ${s.home.faqs.length} home FAQs, ${words(pages.map((p) => p.body))} words`);
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exitCode = errors ? 1 : 0;
