import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, getSite, sites } from "@/lib/sites";
import { CtaButton } from "@/components/CtaButton";
import { CtaBanner, GuideCards } from "@/components/HomeSections";
import { Faqs } from "@/components/Faqs";
import { JsonLd, articleLd, breadcrumbLd, faqLd } from "@/components/JsonLd";

// Only the sites/guides defined in /sites are valid; everything else is a hard 404.
export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { site: string } }) {
  const site = sites.find((s) => s.id === params.site);
  return (site?.guides ?? []).map((g) => ({ slug: g.slug }));
}

async function load(params: PageProps<"/[site]/[slug]">["params"]) {
  const { site: id, slug } = await params;
  const site = getSite(id);
  const guide = site?.guides.find((g) => g.slug === slug);
  return site && guide ? { site, guide } : null;
}

export async function generateMetadata({ params }: PageProps<"/[site]/[slug]">): Promise<Metadata> {
  const data = await load(params);
  if (!data) return {};
  const { guide } = data;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/${guide.slug}` },
    openGraph: { type: "article", url: `/${guide.slug}`, title: guide.title, description: guide.description },
  };
}

export default async function GuidePage({ params }: PageProps<"/[site]/[slug]">) {
  const data = await load(params);
  if (!data) notFound();
  const { site, guide } = data;

  const ld: Record<string, unknown>[] = [articleLd(site, guide), breadcrumbLd(site, guide)];
  if (guide.faqs.length) ld.push(faqLd(guide.faqs));

  return (
    <>
      <JsonLd data={ld} />
      <article>
        <header className="bg-surface-2">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/" className="hover:text-ink">{site.brand.name}</Link>
              <span className="mx-2">/</span>
              <span>Guides</span>
            </nav>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{guide.h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{guide.intro}</p>
            <p className="mt-6 text-sm text-muted">
              Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <div className="prose-site">
            {guide.sections.map((s, i) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                {i === 1 && (
                  <aside className="not-prose my-10 flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface-2 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-ink">
                      {copy(site, "inlineCta")}
                    </p>
                    <CtaButton site={site} placement={`guide-${guide.slug}-inline`} size="sm" />
                  </aside>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>
      <Faqs items={guide.faqs} heading="Questions about this topic" />
      <GuideCards site={site} exclude={guide.slug} />
      <CtaBanner site={site} placement={`guide-${guide.slug}-footer`} />
    </>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
