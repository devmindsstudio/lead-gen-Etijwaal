import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, getSite, sites } from "@/lib/sites";
import { CtaButton } from "@/components/CtaButton";
import { CtaBanner, GuideCards, readingMinutes } from "@/components/HomeSections";
import { GuideHeader } from "@/components/designs/GuideHeader";
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

const anchor = (heading: string) =>
  heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
        <GuideHeader site={site} guide={guide} minutes={readingMinutes(guide)} updated={formatDate(guide.updated)} />

        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="prose-site max-w-3xl">
            {guide.sections.map((s, i) => (
              <section key={s.heading} id={anchor(s.heading)} className="scroll-mt-24">
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                {i === 1 && (
                  <aside className="frame my-10 flex flex-col items-start gap-4 rounded-site-lg p-6 sm:flex-row sm:items-center sm:justify-between lg:hidden">
                    <p className="font-semibold text-ink">{copy(site, "inlineCta")}</p>
                    <CtaButton site={site} placement={`guide-${guide.slug}-inline`} size="sm" />
                  </aside>
                )}
              </section>
            ))}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <nav aria-label="On this page" className="frame rounded-site-lg p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">On this page</p>
                <ol className="mt-3 space-y-1 text-sm">
                  {guide.sections.map((s, i) => (
                    <li key={s.heading}>
                      <a href={`#${anchor(s.heading)}`} className="flex gap-2.5 rounded-site px-2 py-1.5 text-muted transition hover:bg-surface-2 hover:text-ink">
                        <span className="font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="relative overflow-hidden rounded-site-lg bg-brand p-6 text-brand-ink">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
                <p className="heading relative text-xl leading-snug">{copy(site, "inlineCta")}</p>
                <CtaButton site={site} placement={`guide-${guide.slug}-sidebar`} size="sm" variant="light" className="relative mt-5" />
              </div>
            </div>
          </aside>
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
