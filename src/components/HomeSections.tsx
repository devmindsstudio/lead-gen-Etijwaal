import Link from "next/link";
import type { Site } from "@/lib/schema";
import { copy } from "@/lib/sites";
import { Icon } from "./Icon";
import { CtaButton } from "./CtaButton";

function SectionHeading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function Stats({ site }: { site: Site }) {
  if (!site.home.stats.length) return null;
  return (
    <section className="border-y border-line bg-surface">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
        {site.home.stats.map((s) => (
          <div key={s.label} className="text-center">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-2xl font-extrabold text-brand sm:text-3xl">{s.value}</dd>
            <dd className="mt-1 text-sm text-muted">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Benefits({ site }: { site: Site }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow={copy(site, "benefitsEyebrow")} title={copy(site, "benefitsHeading")} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.home.benefits.map((b) => (
          <div key={b.title} className="rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
              <Icon name={b.icon} />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks({ site }: { site: Site }) {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">How it works</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{copy(site, "howItWorksHeading")}</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {site.home.howItWorks.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-bold text-ink">{i + 1}</span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <CtaButton site={site} placement="how-it-works" variant="light" />
        </div>
      </div>
    </section>
  );
}

export function Comparison({ site }: { site: Site }) {
  const c = site.home.comparison;
  if (!c) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Compare" title={c.heading} intro={c.intro} />
      <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface-2">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold text-muted" />
              {c.columns.map((col, i) => (
                <th key={col} scope="col" className={`px-5 py-4 font-semibold ${i === 0 ? "text-brand" : ""}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {c.rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="px-5 py-4 font-medium">{r.label}</th>
                {r.values.map((v, i) => (
                  <td key={i} className={`px-5 py-4 ${i === 0 ? "bg-brand/5 font-semibold" : "text-muted"}`}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function Networks({ site }: { site: Site }) {
  const n = site.home.networks;
  if (!n) return null;
  return (
    <section className="bg-surface-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <SectionHeading eyebrow="Coverage" title={n.heading} intro={n.intro} />
        <ul className="grid gap-4">
          {n.items.map((it) => (
            <li key={it.name} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <Icon name="signal" />
              </span>
              <div>
                <h3 className="font-semibold">{it.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{it.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProseSections({ site }: { site: Site }) {
  if (!site.home.sections.length) return null;
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="prose-site">
        {site.home.sections.map((s) => (
          <div key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            {s.bullets && (
              <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function GuideCards({ site, exclude }: { site: Site; exclude?: string }) {
  const list = site.guides.filter((g) => g.slug !== exclude);
  if (!list.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Travel guides" title="Know before you go" />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {list.map((g) => (
          <Link
            key={g.slug}
            href={`/${g.slug}`}
            className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
          >
            <h3 className="font-semibold leading-snug group-hover:text-brand">{g.h1}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{g.description}</p>
            <span className="mt-auto pt-5 text-sm font-semibold text-brand">Read guide →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner({ site, placement }: { site: Site; placement: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center text-brand-ink sm:px-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10" />
        <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
          {copy(site, "bannerHeading")}
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl opacity-85">
          {copy(site, "bannerBody")}
        </p>
        <div className="relative mt-8">
          <CtaButton site={site} placement={placement} variant="light" />
        </div>
      </div>
    </section>
  );
}
