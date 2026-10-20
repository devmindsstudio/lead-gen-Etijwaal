import type { Site } from "@/lib/schema";
import { CtaButton } from "../CtaButton";
import { ArchLines, Barcode, BigStar, Skyline, StarPattern, Stars } from "./Decor";
import { FloatChip, SitePhoto, TrustRow } from "../Media";
import { CoastalHero } from "./Coastal";
import { NetworkHero } from "./Network";

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" className={`h-5 w-5 shrink-0 ${className}`} fill="currentColor" aria-hidden="true">
    <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4z" />
  </svg>
);

function PhoneMock({ site, className = "" }: { site: Site; className?: string }) {
  return (
    <div className={`relative mx-auto w-64 sm:w-72 ${className}`} aria-hidden="true">
      <div className="relative rounded-[2.75rem] border-[10px] border-[#0b0f19] bg-[#0b0f19] shadow-2xl">
        <div className="overflow-hidden rounded-[2rem] bg-linear-to-b from-brand to-[#0b0f19] px-5 pb-8 pt-4 text-white">
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span>9:41</span>
            <span className="mx-auto h-5 w-20 rounded-full bg-[#0b0f19]" />
            <span className="flex items-end gap-0.5">
              {[1, 2, 3, 4].map((b) => (
                <span key={b} className="w-1 rounded-sm bg-white" style={{ height: `${b * 3}px` }} />
              ))}
              <span className="ml-1">{site.copy.signalLabel}</span>
            </span>
          </div>
          <div className="mt-10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Connected</p>
            <p className="mt-2 text-2xl font-bold">{site.home.hero.deviceLabel}</p>
          </div>
          <div className="mx-auto mt-8 grid h-28 w-28 place-items-center rounded-full border-4 border-white/25">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/15">
              <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12.5 10 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="mt-8 space-y-2.5">
            {site.copy.deviceRows.map(([k, v]) => (
              <div key={k} className="flex justify-between rounded-xl bg-white/10 px-3.5 py-2.5 text-xs">
                <span className="text-white/70">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Dubai · skyline ───────────────────────── */

function SkylineHero({ site }: { site: Site }) {
  const h = site.home.hero;
  return (
    <section className="relative -mt-16 overflow-hidden bg-night pt-16 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-brand opacity-40 blur-[120px]" />
        <div className="absolute -right-32 top-24 h-[28rem] w-[28rem] rounded-full bg-accent opacity-20 blur-[120px]" />
        {site.images ? (
          <>
            <SitePhoto photo={site.images.hero} sizes="100vw" priority className="opacity-90" />
            <div className="absolute inset-0 bg-linear-to-r from-night via-night/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-night via-night/60 to-transparent" />
          </>
        ) : (
          <>
            <Stars count={60} className="absolute inset-x-0 top-0 h-2/3 w-full" />
            <Skyline className="absolute inset-x-0 bottom-0 h-56 w-full text-white/[0.06] sm:h-72" />
          </>
        )}
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-10 pt-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pb-16 lg:pt-24">
        <div>
          <p className="rise glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-white/85">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {h.eyebrow}
          </p>
          <h1 className="rise mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-[4.25rem]" style={{ ["--d" as string]: "80ms" }}>
            {h.h1}
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-white/70" style={{ ["--d" as string]: "160ms" }}>
            {h.subheading}
          </p>
          <ul className="rise mt-8 flex flex-wrap gap-2.5" style={{ ["--d" as string]: "240ms" }}>
            {h.bullets.map((b) => (
              <li key={b} className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-sm text-white/90">
                <Check className="h-4 w-4 text-accent" />
                {b}
              </li>
            ))}
          </ul>
          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "320ms" }}>
            <CtaButton site={site} placement="hero" variant="accent" />
            <a href="#how-it-works" className="text-sm font-semibold text-white/70 hover:text-white">How it works ↓</a>
          </div>
          <TrustRow site={site} tone="dark" />
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-0 m-auto h-72 w-72 rounded-full bg-brand/50 blur-3xl" />
          <FloatChip icon="bolt" label="Scan the QR, done" className="left-0 top-16 hidden sm:flex lg:-left-6" />
          <FloatChip icon="signal" label={`${site.copy.signalLabel} on arrival`} className="bottom-20 right-0 hidden sm:flex lg:-right-4" />
          <PhoneMock site={site} className="float" />
        </div>
      </div>
      {site.home.stats.length > 0 && (
        <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <dl className="glass grid grid-cols-2 divide-white/10 rounded-site-lg md:grid-cols-4 md:divide-x">
            {site.home.stats.map((s) => (
              <div key={s.label} className="px-6 py-6 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="heading text-3xl text-white">{s.value}</dd>
                <dd className="mt-1 text-sm text-white/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

/* ───────────────────────── Saudi · geometric ───────────────────────── */

function GeometricHero({ site }: { site: Site }) {
  const h = site.home.hero;
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-surface">
      <StarPattern id="hero-stars" className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 text-brand/[0.09] lg:block" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
        <div>
          <p className="rise inline-flex items-center gap-2 border-2 border-ink bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
            {h.eyebrow}
          </p>
          <h1 className="rise mt-7 text-5xl leading-[0.95] sm:text-6xl lg:text-[5.5rem]" style={{ ["--d" as string]: "80ms" }}>
            {h.h1}
          </h1>
          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted" style={{ ["--d" as string]: "160ms" }}>
            {h.subheading}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "240ms" }}>
            <CtaButton site={site} placement="hero" />
            <a href="#how-it-works" className="border-b-2 border-ink pb-0.5 text-sm font-bold">How it works</a>
          </div>
          <TrustRow site={site} />
        </div>

        <div className="rise relative" style={{ ["--d" as string]: "200ms" }}>
          {site.images && (
            <div className="relative aspect-[5/4] overflow-hidden border-2 border-ink">
              <SitePhoto photo={site.images.hero} sizes="(min-width:1024px) 40vw, 100vw" priority />
              <BigStar className="absolute -right-10 -top-10 h-40 w-40 text-white/40" />
            </div>
          )}
          <div
            className={`relative overflow-hidden border-2 border-ink bg-brand p-7 text-brand-ink shadow-[10px_10px_0_0_var(--ink)] ${
              site.images ? "-mt-14 ml-10 sm:ml-24" : ""
            }`}
          >
            <BigStar className="absolute -right-16 -top-16 h-64 w-64 text-white/15" />
            <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-white/70">Connected · {site.copy.signalLabel}</p>
            <p className="heading relative mt-2 text-3xl">{h.deviceLabel}</p>
            <ul className="relative mt-7 space-y-3">
              {h.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 border-t border-white/20 pt-3 text-sm font-medium">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center bg-accent text-ink">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M8 13.6 4.4 10 3 11.4l5 5 9-9L15.6 6z" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <dl className="mt-6 grid grid-cols-3 border-2 border-ink bg-surface">
            {site.copy.deviceRows.map(([k, v], i) => (
              <div key={k} className={`p-3 ${i > 0 ? "border-l-2 border-ink" : ""}`}>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-1 text-sm font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* 2px gaps over an ink background draw the grid lines at any column count. */}
      {site.home.stats.length > 0 && (
        <dl className="relative grid grid-cols-2 gap-0.5 border-t-2 border-ink bg-ink md:grid-cols-4">
          {site.home.stats.map((s) => (
            <div key={s.label} className="bg-surface-2 px-6 py-8">
              <dt className="sr-only">{s.label}</dt>
              <dd className="heading text-5xl text-brand">{s.value}</dd>
              <dd className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

/* ───────────────────────── Qatar · boarding pass ───────────────────────── */

function BoardingPass({ site }: { site: Site }) {
  const h = site.home.hero;
  return (
    <div className="relative mx-auto w-full max-w-md -rotate-2 transition hover:rotate-0" aria-hidden="true">
      <div className="overflow-hidden rounded-site-lg bg-surface shadow-[0_30px_60px_-20px_rgb(35_22_26_/_0.35)] ring-1 ring-line">
        <div className="flex items-center justify-between bg-brand px-6 py-4 text-brand-ink">
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Boarding pass · eSIM</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></svg>
        </div>
        <div className="px-6 pb-6 pt-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">From</p>
              <p className="heading text-5xl">HOME</p>
            </div>
            <div className="mb-3 flex flex-1 items-center px-3 text-brand">
              <span className="h-px flex-1 border-t-2 border-dashed border-current" />
              <svg viewBox="0 0 24 24" className="mx-1 h-5 w-5 rotate-90" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></svg>
              <span className="h-px flex-1 border-t-2 border-dashed border-current" />
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">To</p>
              <p className="heading text-5xl text-brand">{site.market.countryCode}</p>
            </div>
          </div>
          <p className="mt-1 text-right text-sm text-muted">{h.deviceLabel}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {site.copy.deviceRows.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-0.5 text-sm font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="perforation mx-0" style={{ ["--perf-bg" as string]: "var(--surface-2)" }} />
        <div className="flex items-center justify-between gap-6 px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Network</p>
            <p className="text-sm font-bold">{site.copy.signalLabel} · Ready on landing</p>
          </div>
          <Barcode className="h-10 w-28 text-ink" />
        </div>
      </div>
    </div>
  );
}

function BoardingHero({ site }: { site: Site }) {
  const h = site.home.hero;
  return (
    <section className="relative overflow-hidden bg-surface-2">
      <svg className="pointer-events-none absolute -right-24 top-10 hidden h-[30rem] w-[44rem] text-brand/10 lg:block" viewBox="0 0 700 480" aria-hidden="true">
        <path d="M10 460C180 420 260 120 690 20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 10" />
      </svg>
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="rise text-sm font-semibold uppercase tracking-[0.22em] text-brand">{h.eyebrow}</p>
          <h1 className="rise mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl" style={{ ["--d" as string]: "80ms" }}>
            {h.h1}
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ ["--d" as string]: "160ms" }}>
            {h.subheading}
          </p>
          <ul className="rise mt-8 grid gap-3 sm:grid-cols-2" style={{ ["--d" as string]: "240ms" }}>
            {h.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm font-medium">
                <Check className="mt-0.5 text-brand" />
                {b}
              </li>
            ))}
          </ul>
          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "320ms" }}>
            <CtaButton site={site} placement="hero" />
            <a href="#how-it-works" className="text-sm font-semibold text-muted hover:text-ink">Your itinerary ↓</a>
          </div>
          <TrustRow site={site} />
        </div>
        <div className="rise relative" style={{ ["--d" as string]: "200ms" }}>
          {site.images ? (
            <>
              <div className="relative ml-auto aspect-[4/3] w-[88%] overflow-hidden rounded-site-lg shadow-xl lg:aspect-[4/5]">
                <SitePhoto photo={site.images.hero} sizes="(min-width:1024px) 40vw, 90vw" priority />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                <FloatChip icon="plane" label="Ready when you land" className="right-4 top-4" />
              </div>
              <div className="relative -mt-28 w-[94%] sm:-mt-40 lg:-mt-48">
                <BoardingPass site={site} />
              </div>
            </>
          ) : (
            <BoardingPass site={site} />
          )}
        </div>
      </div>
      {site.home.stats.length > 0 && (
        <dl className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 pb-16 sm:px-6 md:grid-cols-4">
          {site.home.stats.map((s) => (
            <div key={s.label} className="relative rounded-site bg-surface px-5 py-5 ring-1 ring-line">
              <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-surface-2" />
              <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-surface-2" />
              <dt className="sr-only">{s.label}</dt>
              <dd className="heading text-3xl text-brand">{s.value}</dd>
              <dd className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

/* ───────────────────────── Umrah · arch ───────────────────────── */

function ArchHero({ site }: { site: Site }) {
  const h = site.home.hero;
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent)_22%,transparent)_0%,transparent_65%)]" />
      <ArchLines className="pointer-events-none absolute left-1/2 top-6 h-[44rem] w-auto -translate-x-1/2 text-accent/20 [mask-image:linear-gradient(to_bottom,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-4xl px-4 pb-8 pt-20 text-center sm:px-6 lg:pt-28">
        <p className="rise mx-auto inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-brand">
          <span className="h-px w-8 bg-accent" />
          {h.eyebrow}
          <span className="h-px w-8 bg-accent" />
        </p>
        <h1 className="rise mx-auto mt-6 max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl" style={{ ["--d" as string]: "80ms" }}>
          {h.h1}
        </h1>
        <p className="rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted" style={{ ["--d" as string]: "160ms" }}>
          {h.subheading}
        </p>
        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-4" style={{ ["--d" as string]: "240ms" }}>
          <CtaButton site={site} placement="hero" />
          <a href="#how-it-works" className="text-sm font-semibold text-muted hover:text-ink">How it works ↓</a>
        </div>
        <TrustRow site={site} className="justify-center" />
        <ul className="rise mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3" style={{ ["--d" as string]: "320ms" }}>
          {h.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm font-medium text-ink/80">
              <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="rise relative mx-auto mt-6 max-w-md px-4" style={{ ["--d" as string]: "380ms" }} aria-hidden="true">
        <div className="arch-top relative flex h-[32rem] flex-col justify-end overflow-hidden bg-brand px-8 pb-8 text-center text-brand-ink shadow-2xl ring-8 ring-surface-2 sm:h-[36rem]">
          {site.images && <SitePhoto photo={site.images.hero} sizes="(min-width:640px) 448px, 100vw" priority />}
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-night via-night/75 to-transparent" />
          <ArchLines className="absolute left-1/2 top-3 h-[120%] -translate-x-1/2 text-white/25" />
          <p className="relative text-xs uppercase tracking-[0.25em] text-white/70">Connected · {site.copy.signalLabel}</p>
          <p className="heading relative mt-2 text-3xl">{h.deviceLabel}</p>
          <div className="relative mt-7 space-y-2.5 text-left">
            {site.copy.deviceRows.map(([k, v]) => (
              <div key={k} className="flex justify-between rounded-full bg-white/15 px-4 py-2.5 text-xs backdrop-blur">
                <span className="text-white/75">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {site.home.stats.length > 0 && (
        <dl className="relative mx-auto grid max-w-5xl grid-cols-2 px-4 py-14 sm:px-6 md:grid-cols-4">
          {site.home.stats.map((s, i) => (
            <div key={s.label} className={`px-4 py-4 text-center ${i > 0 ? "md:border-l md:border-accent/40" : ""}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="heading text-4xl text-brand">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

export function Hero({ site }: { site: Site }) {
  switch (site.design) {
    case "geometric":
      return <GeometricHero site={site} />;
    case "boarding":
      return <BoardingHero site={site} />;
    case "arch":
      return <ArchHero site={site} />;
    case "coastal":
      return <CoastalHero site={site} />;
    case "network":
      return <NetworkHero site={site} />;
    default:
      return <SkylineHero site={site} />;
  }
}
