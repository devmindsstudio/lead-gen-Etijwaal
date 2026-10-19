import type { Guide, Site } from "@/lib/schema";
import { copy } from "@/lib/sites";
import { CtaButton } from "../CtaButton";
import { Icon } from "../Icon";
import { Mountains, Waves } from "./Decor";

/* Coastal design: sea and mountains, postcards and stamps. Used by Oman. */

function Stamp({ site, className = "" }: { site: Site; className?: string }) {
  return (
    <div className={`stamp grid h-24 w-20 place-items-center bg-brand p-2 text-brand-ink ${className}`} aria-hidden="true">
      <div className="grid h-full w-full place-items-center border border-white/40 text-center">
        <div>
          <Icon name="signal" className="mx-auto h-6 w-6" />
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider">{site.copy.signalLabel}</p>
        </div>
      </div>
    </div>
  );
}

function Postcard({ site }: { site: Site }) {
  const h = site.home.hero;
  return (
    <div className="relative mx-auto w-full max-w-md rotate-2 transition hover:rotate-0" aria-hidden="true">
      <div className="rounded-site bg-white p-4 shadow-[0_30px_70px_-25px_rgb(12_42_59_/_0.45)] ring-1 ring-line sm:p-5">
        <div className="grid grid-cols-[1.1fr_1fr] gap-4">
          <div className="relative h-60 overflow-hidden rounded-2xl bg-linear-to-b from-accent/70 via-brand/60 to-brand">
            <span className="absolute right-6 top-6 h-12 w-12 rounded-full bg-white/80 blur-[1px]" />
            <Mountains className="absolute inset-x-0 bottom-10 h-24 w-full text-[#0a2d42]/70" />
            <Waves className="absolute inset-x-0 bottom-0 h-12 w-full text-white/80" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a2d42]">Greetings from</p>
              <p className="heading text-xl leading-tight text-[#0a2d42]">{h.deviceLabel}</p>
            </div>
          </div>
          <div className="relative border-l-2 border-dashed border-line pl-4">
            <Stamp site={site} className="ml-auto" />
            <svg viewBox="0 0 80 80" className="absolute right-12 top-14 h-16 w-16 text-brand/50">
              <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="40" cy="40" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M4 34c10-6 20 6 32 0s20-6 40 0M4 46c10-6 20 6 32 0s20-6 40 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <dl className="mt-8 space-y-3">
              {site.copy.deviceRows.map(([k, v]) => (
                <div key={k} className="border-b border-line pb-1">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="text-sm font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoastalHero({ site }: { site: Site }) {
  const h = site.home.hero;
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-surface-2 via-surface-2 to-surface">
      <span className="pointer-events-none absolute right-[12%] top-14 h-56 w-56 rounded-full bg-accent/35 blur-3xl" />
      <Mountains className="pointer-events-none absolute inset-x-0 bottom-28 h-56 w-full text-brand/[0.09]" />
      <Waves className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-brand/[0.08]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-10 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24">
        <div>
          <p className="rise inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-brand shadow-sm ring-1 ring-line">
            <svg viewBox="0 0 24 12" className="h-3 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M1 6c3-4 5-4 8 0s5 4 8 0 4-4 6-2" strokeLinecap="round" /></svg>
            {h.eyebrow}
          </p>
          <h1 className="rise mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl" style={{ ["--d" as string]: "80ms" }}>
            {h.h1}
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ ["--d" as string]: "160ms" }}>
            {h.subheading}
          </p>
          <ul className="rise mt-8 flex flex-wrap gap-2.5" style={{ ["--d" as string]: "240ms" }}>
            {h.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-line">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "320ms" }}>
            <CtaButton site={site} placement="hero" />
            <a href="#how-it-works" className="text-sm font-semibold text-muted hover:text-ink">Plan your trip ↓</a>
          </div>
        </div>
        <div className="rise" style={{ ["--d" as string]: "200ms" }}>
          <Postcard site={site} />
        </div>
      </div>
      {site.home.stats.length > 0 && (
        <dl className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 pb-20 pt-6 sm:px-6 md:grid-cols-4">
          {site.home.stats.map((s) => (
            <div key={s.label} className="rounded-site bg-white/85 px-6 py-5 text-center shadow-sm ring-1 ring-line backdrop-blur">
              <dt className="sr-only">{s.label}</dt>
              <dd className="heading text-3xl text-brand">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

export function CoastalBenefits({ site, heading }: { site: Site; heading: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      {heading}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.home.benefits.map((b, i) => (
          <div key={b.title} className="frame relative overflow-hidden rounded-site-lg p-7 transition hover:-translate-y-1">
            <Waves className="absolute inset-x-0 bottom-0 h-10 w-full text-brand/[0.07]" />
            <span
              className="grid h-14 w-14 place-items-center bg-brand/10 text-brand"
              style={{ borderRadius: i % 2 ? "58% 42% 50% 50% / 45% 55% 45% 55%" : "42% 58% 46% 54% / 55% 45% 55% 45%" }}
            >
              <Icon name={b.icon} />
            </span>
            <h3 className="mt-6 text-xl">{b.title}</h3>
            <p className="relative mt-2 leading-relaxed text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CoastalSteps({ site, heading }: { site: Site; heading: React.ReactNode }) {
  return (
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden bg-night text-white">
      <Waves className="absolute inset-x-0 top-0 h-16 w-full rotate-180 text-surface" />
      <Mountains className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-white/[0.04]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
        {heading}
        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <span className="pointer-events-none absolute left-6 right-6 top-6 hidden border-t-2 border-dotted border-white/25 lg:block" />
          {site.home.howItWorks.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="relative grid h-12 w-12 place-items-center rounded-full rounded-br-none bg-accent text-lg font-bold text-[#0a2d42] shadow-lg">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14">
          <CtaButton site={site} placement="how-it-works" variant="accent" />
        </div>
      </div>
    </section>
  );
}

export function CoastalBanner({ site, placement }: { site: Site; placement: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-site-lg bg-brand px-8 pb-24 pt-14 text-brand-ink sm:px-14">
        <span className="absolute right-24 top-10 h-24 w-24 rounded-full bg-accent/50 blur-2xl" />
        <Mountains className="absolute inset-x-0 bottom-10 h-28 w-full text-white/10" />
        <Waves className="absolute inset-x-0 bottom-0 h-16 w-full text-white/15" />
        <Stamp site={site} className="absolute right-8 top-8 hidden rotate-6 bg-white/15 sm:grid" />
        <h2 className="relative max-w-2xl text-4xl leading-tight sm:text-5xl">{copy(site, "bannerHeading")}</h2>
        <p className="relative mt-4 max-w-xl text-white/80">{copy(site, "bannerBody")}</p>
        <div className="relative mt-8">
          <CtaButton site={site} placement={placement} variant="light" />
        </div>
      </div>
    </section>
  );
}

export function CoastalGuideHeader({ guide, meta }: { guide: Guide; meta: React.ReactNode }) {
  return (
    <header className="relative overflow-hidden bg-surface-2">
      <Mountains className="pointer-events-none absolute inset-x-0 bottom-10 h-32 w-full text-brand/[0.08]" />
      <Waves className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full text-surface" />
      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-12 sm:px-6">
        {meta}
        <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">{guide.h1}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{guide.intro}</p>
      </div>
    </header>
  );
}
