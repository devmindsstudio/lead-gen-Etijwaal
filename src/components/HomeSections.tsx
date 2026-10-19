import Link from "next/link";
import type { Site } from "@/lib/schema";
import { copy } from "@/lib/sites";
import { Icon } from "./Icon";
import { CtaButton } from "./CtaButton";
import { ArchLines, BigStar, Skyline, StarPattern } from "./designs/Decor";
import { CoastalBanner, CoastalBenefits, CoastalSteps } from "./designs/Coastal";
import { NetworkBanner, NetworkBenefits, NetworkSteps } from "./designs/Network";

export function SectionHeading({
  site,
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "auto",
}: {
  site: Site;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  /** "auto" centres headings for designs that use a centred layout (arch). */
  align?: "auto" | "left";
}) {
  const centered = align === "auto" && site.design === "arch";
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] ${
            dark ? "text-accent" : "text-brand"
          }`}
        >
          {site.design === "geometric" && <span className="h-2.5 w-2.5 bg-accent" />}
          {site.design === "network" && <span className="font-mono normal-case tracking-normal">{"//"}</span>}
          {site.design === "coastal" && (
            <svg viewBox="0 0 24 12" className="h-3 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M1 6c3-4 5-4 8 0s5 4 8 0 4-4 6-2" strokeLinecap="round" /></svg>
          )}
          {site.design === "arch" && <span className="h-px w-6 bg-accent" />}
          {eyebrow}
          {site.design === "arch" && <span className="h-px w-6 bg-accent" />}
        </p>
      )}
      <h2 className={`mt-3 text-3xl leading-tight sm:text-[2.6rem] ${dark ? "text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

/* ─────────────────────────── Benefits ─────────────────────────── */

export function Benefits({ site }: { site: Site }) {
  const items = site.home.benefits;
  const heading = (
    <SectionHeading site={site} eyebrow={copy(site, "benefitsEyebrow")} title={copy(site, "benefitsHeading")} />
  );

  if (site.design === "coastal") return <CoastalBenefits site={site} heading={heading} />;
  if (site.design === "network") return <NetworkBenefits site={site} heading={heading} />;

  if (site.design === "geometric") {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        {heading}
        <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {items.map((b, i) => (
            <li key={b.title} className="grid grid-cols-[auto_1fr] gap-6 border-t-2 border-ink pt-6">
              <span className="heading text-5xl leading-none text-brand">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="flex items-center gap-2 text-xl">
                  <Icon name={b.icon} className="h-5 w-5 text-brand" />
                  {b.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (site.design === "boarding") {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        {heading}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => (
            <div key={b.title} className="frame relative overflow-hidden rounded-site p-6 pl-8 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="absolute inset-y-0 left-0 w-1.5 bg-brand" />
              <span className="absolute right-5 top-5 h-3 w-3 rounded-full border-2 border-line bg-surface-2" />
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand/10 text-brand">
                <Icon name={b.icon} />
              </span>
              <h3 className="mt-5 text-2xl">{b.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (site.design === "arch") {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        {heading}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => (
            <div key={b.title} className="arch-top frame px-7 pb-8 pt-14 text-center transition hover:-translate-y-1 hover:shadow-xl">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-accent text-brand">
                <Icon name={b.icon} />
              </span>
              <h3 className="mt-6 text-xl">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // skyline: bento grid with a feature tile.
  const [first, ...rest] = items;
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      {heading}
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-site-lg bg-night p-8 text-white lg:row-span-2">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand opacity-60 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-accent opacity-25 blur-3xl" />
          <span className="glass relative grid h-14 w-14 place-items-center rounded-2xl text-accent">
            <Icon name={first.icon} className="h-7 w-7" />
          </span>
          <h3 className="relative mt-8 text-3xl">{first.title}</h3>
          <p className="relative mt-4 text-lg leading-relaxed text-white/70">{first.body}</p>
          <Skyline className="absolute inset-x-0 bottom-0 h-24 w-full text-white/[0.07]" />
        </div>
        {rest.map((b, i) => (
          <div
            key={b.title}
            // With 6 benefits the feature tile + 4 cards fill two rows; stretch the leftover card across the third.
            className={`frame group rounded-site-lg p-7 transition hover:-translate-y-1 ${
              rest.length % 2 === 1 && i === rest.length - 1 ? "lg:col-span-3" : ""
            }`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-brand to-brand/70 text-brand-ink shadow-lg shadow-brand/30">
              <Icon name={b.icon} />
            </span>
            <h3 className="mt-5 text-lg">{b.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── How it works ─────────────────────────── */

export function HowItWorks({ site }: { site: Site }) {
  const steps = site.home.howItWorks;
  const title = copy(site, "howItWorksHeading");

  if (site.design === "coastal" || site.design === "network") {
    const heading = <SectionHeading site={site} eyebrow="How it works" title={title} tone="dark" />;
    return site.design === "coastal" ? <CoastalSteps site={site} heading={heading} /> : <NetworkSteps site={site} heading={heading} />;
  }

  if (site.design === "boarding") {
    return (
      <section id="how-it-works" className="scroll-mt-20 bg-surface-2">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading site={site} eyebrow="Your itinerary" title={title} />
            <div className="mt-8">
              <CtaButton site={site} placement="how-it-works" />
            </div>
          </div>
          <ol className="relative space-y-6 border-l-2 border-dashed border-brand/40 pl-10">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="absolute -left-[3.15rem] top-5 grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-bold text-brand-ink ring-4 ring-surface-2">
                  {i + 1}
                </span>
                <div className="frame rounded-site p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Step {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-2xl">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
            <li className="relative flex items-center gap-3 text-sm font-semibold text-brand">
              <span className="absolute -left-[3.15rem] grid h-8 w-8 place-items-center rounded-full bg-accent text-ink ring-4 ring-surface-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></svg>
              </span>
              Arrived and online
            </li>
          </ol>
        </div>
      </section>
    );
  }

  if (site.design === "geometric") {
    return (
      <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden border-y-2 border-ink bg-night text-white">
        <StarPattern id="steps-stars" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading site={site} eyebrow="How it works" title={title} tone="dark" />
          <ol className="mt-14 grid gap-0.5 bg-white/20 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-night p-7">
                <span className="heading block text-6xl leading-none text-accent">{i + 1}</span>
                <h3 className="mt-6 text-xl">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-white/70">{s.body}</p>
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

  if (site.design === "arch") {
    return (
      <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden bg-night text-white">
        <ArchLines className="pointer-events-none absolute left-1/2 top-0 h-[130%] -translate-x-1/2 text-accent/15" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading site={site} eyebrow="How it works" title={title} tone="dark" />
          <ol className="mt-16 grid gap-10 text-center md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="arch-top heading mx-auto grid h-20 w-16 place-items-center border border-accent/60 pt-3 text-2xl text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 text-center">
            <CtaButton site={site} placement="how-it-works" variant="accent" />
          </div>
        </div>
      </section>
    );
  }

  // skyline
  return (
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden bg-night text-white">
      <div className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brand opacity-30 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading site={site} eyebrow="How it works" title={title} tone="dark" />
        <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <span className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-linear-to-r from-transparent via-accent/50 to-transparent lg:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="glass relative rounded-site-lg p-6">
              <span className="heading grid h-11 w-11 place-items-center rounded-full bg-linear-to-br from-accent to-accent/60 text-lg text-[#111]">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <CtaButton site={site} placement="how-it-works" variant="accent" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Shared sections (styled by tokens) ─────────────────────────── */

export function Comparison({ site }: { site: Site }) {
  const c = site.home.comparison;
  if (!c) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading site={site} eyebrow="Compare" title={c.heading} intro={c.intro} />
      <div className="frame mt-12 overflow-x-auto rounded-site-lg">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="px-5 py-5" />
              {c.columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={`px-5 py-5 text-base font-semibold ${i === 0 ? "bg-brand text-brand-ink" : "text-ink"}`}
                >
                  {col}
                  {i === 0 && (
                    <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider">
                      Best
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {c.rows.map((r) => (
              <tr key={r.label} className="transition hover:bg-surface-2/60">
                <th scope="row" className="px-5 py-4 font-semibold">{r.label}</th>
                {r.values.map((v, i) => (
                  <td key={i} className={`px-5 py-4 ${i === 0 ? "bg-brand/[0.06] font-semibold text-ink" : "text-muted"}`}>
                    {v}
                  </td>
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
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <SectionHeading site={site} align="left" eyebrow="Coverage" title={n.heading} intro={n.intro} />
        <ul className="grid gap-4">
          {n.items.map((it) => (
            <li key={it.name} className="frame flex gap-4 rounded-site p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-site bg-brand text-brand-ink">
                <Icon name="signal" />
              </span>
              <div>
                <h3 className="text-lg">{it.name}</h3>
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
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="prose-site">
        {site.home.sections.map((s) => (
          <div key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
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
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading site={site} eyebrow="Travel guides" title="Know before you go" />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((g, i) => (
          <Link
            key={g.slug}
            href={`/${g.slug}`}
            className={`frame group flex flex-col rounded-site-lg p-6 transition hover:-translate-y-1 hover:shadow-xl ${
              site.design === "arch" ? "text-center" : ""
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Guide {String(i + 1).padStart(2, "0")} · {readingMinutes(g)} min read
            </span>
            <h3 className="mt-3 text-xl leading-snug transition group-hover:text-brand">{g.h1}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{g.description}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-brand">
              Read guide <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function readingMinutes(g: Site["guides"][number]): number {
  const text = [g.intro, ...g.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]), ...g.faqs.map((f) => f.a)].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

/* ─────────────────────────── Closing CTA ─────────────────────────── */

export function CtaBanner({ site, placement }: { site: Site; placement: string }) {
  const heading = copy(site, "bannerHeading");
  const body = copy(site, "bannerBody");

  if (site.design === "coastal") return <CoastalBanner site={site} placement={placement} />;
  if (site.design === "network") return <NetworkBanner site={site} placement={placement} />;

  if (site.design === "geometric") {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden border-2 border-ink bg-brand px-6 py-14 text-brand-ink shadow-[10px_10px_0_0_var(--ink)] sm:px-12">
          <BigStar className="absolute -right-10 top-1/2 h-80 w-80 -translate-y-1/2 text-white/10" />
          <h2 className="relative max-w-2xl text-4xl leading-[1.05] sm:text-5xl">{heading}</h2>
          <p className="relative mt-4 max-w-xl text-white/80">{body}</p>
          <div className="relative mt-8">
            <CtaButton site={site} placement={placement} variant="light" />
          </div>
        </div>
      </section>
    );
  }

  if (site.design === "boarding") {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="frame grid overflow-hidden rounded-site-lg md:grid-cols-[1fr_auto]">
          <div className="bg-brand px-8 py-12 text-brand-ink sm:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Final call</p>
            <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">{heading}</h2>
            <p className="mt-4 max-w-xl text-white/80">{body}</p>
          </div>
          <div className="relative flex items-center justify-center border-t-2 border-dashed border-line px-8 py-10 md:border-l-2 md:border-t-0">
            <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-surface md:-left-3 md:top-auto md:translate-x-0" />
            <CtaButton site={site} placement={placement} />
          </div>
        </div>
      </section>
    );
  }

  if (site.design === "arch") {
    return (
      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <div className="arch-top relative overflow-hidden bg-night px-6 pb-14 pt-28 text-center text-white sm:px-12">
          <ArchLines className="absolute left-1/2 top-4 h-[130%] -translate-x-1/2 text-accent/25" />
          <h2 className="relative mx-auto max-w-2xl text-4xl leading-tight sm:text-5xl">{heading}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/75">{body}</p>
          <div className="relative mt-8">
            <CtaButton site={site} placement={placement} variant="accent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-site-lg bg-night px-6 py-16 text-center text-white sm:px-12">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-brand opacity-50 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent opacity-25 blur-3xl" />
        <Skyline className="absolute inset-x-0 bottom-0 h-28 w-full text-white/[0.06]" />
        <h2 className="relative mx-auto max-w-2xl text-4xl sm:text-5xl">{heading}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/70">{body}</p>
        <div className="relative mt-8">
          <CtaButton site={site} placement={placement} variant="accent" />
        </div>
      </div>
    </section>
  );
}
