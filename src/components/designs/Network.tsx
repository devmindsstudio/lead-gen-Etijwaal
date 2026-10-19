import type { Guide, Site } from "@/lib/schema";
import { copy } from "@/lib/sites";
import { CtaButton } from "../CtaButton";
import { Icon } from "../Icon";
import { RouteMap } from "./Decor";

/* Network design: multi-country route maps, grid paper, monospace data labels. Used by the GCC site. */

const places = (site: Site) => site.market.places ?? [site.home.hero.deviceLabel];

export function NetworkHero({ site }: { site: Site }) {
  const h = site.home.hero;
  const list = places(site);
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black_20%,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:py-24">
        <div>
          <p className="rise font-mono text-sm text-brand">{"// "}{h.eyebrow}</p>
          <h1 className="rise mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-[4.4rem]" style={{ ["--d" as string]: "80ms" }}>
            {h.h1}
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ ["--d" as string]: "160ms" }}>
            {h.subheading}
          </p>
          <ul className="rise mt-8 space-y-2.5" style={{ ["--d" as string]: "240ms" }}>
            {h.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm font-medium">
                <span className="font-mono text-brand">→</span>
                {b}
              </li>
            ))}
          </ul>
          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "320ms" }}>
            <CtaButton site={site} placement="hero" />
            <a href="#how-it-works" className="font-mono text-sm text-muted hover:text-ink">how_it_works ↓</a>
          </div>
        </div>

        <div className="rise frame overflow-hidden rounded-site-lg shadow-[0_30px_60px_-30px_rgb(15_18_34_/_0.35)]" style={{ ["--d" as string]: "200ms" }} aria-hidden="true">
          <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-2.5 font-mono text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              route_map
            </span>
            <span>{list.length} {list.length === 1 ? "place" : "countries"} · 1 eSIM · {site.copy.signalLabel}</span>
          </div>
          <div className="grid-bg relative bg-surface px-2 py-4">
            <RouteMap places={list} className="h-auto w-full" />
          </div>
          <dl className="grid grid-cols-3 divide-x divide-line border-t border-line font-mono text-xs">
            {site.copy.deviceRows.map(([k, v]) => (
              <div key={k} className="px-4 py-3">
                <dt className="text-muted">{k.toLowerCase().replace(/\s+/g, "_")}</dt>
                <dd className="mt-0.5 font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {site.home.stats.length > 0 && (
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-site-lg border border-line bg-line md:grid-cols-4">
          {site.home.stats.map((s, i) => (
            <div key={s.label} className="bg-surface px-6 py-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-xs text-muted">[{String(i + 1).padStart(2, "0")}]</dd>
              <dd className="heading mt-1 text-3xl text-ink">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
        </div>
      )}
      <div className="h-16" />
    </section>
  );
}

export function NetworkBenefits({ site, heading }: { site: Site; heading: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      {heading}
      <div className="mt-12 grid gap-px overflow-hidden rounded-site-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {site.home.benefits.map((b, i) => (
          <div key={b.title} className="group bg-surface p-7 transition hover:bg-surface-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted">[{String(i + 1).padStart(2, "0")}]</span>
              <span className="grid h-10 w-10 place-items-center rounded-site bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-brand-ink">
                <Icon name={b.icon} className="h-5 w-5" />
              </span>
            </div>
            <h3 className="mt-6 text-xl">{b.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NetworkSteps({ site, heading }: { site: Site; heading: React.ReactNode }) {
  return (
    <section id="how-it-works" className="grid-bg-dark relative scroll-mt-20 overflow-hidden bg-night text-white">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand opacity-40 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        {heading}
        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <span className="pointer-events-none absolute left-5 right-5 top-5 hidden h-px bg-linear-to-r from-accent via-brand to-accent opacity-60 lg:block" />
          {site.home.howItWorks.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-accent bg-night font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-6 font-mono text-xs text-white/50">step_{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-xl">{s.title}</h3>
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

export function NetworkBanner({ site, placement }: { site: Site; placement: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="grid-bg-dark relative grid items-center gap-8 overflow-hidden rounded-site-lg bg-night px-8 py-14 text-white sm:px-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand opacity-40 blur-3xl" />
        <div className="relative">
          <p className="font-mono text-xs text-accent">{places(site).join(" · ")}</p>
          <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">{copy(site, "bannerHeading")}</h2>
          <p className="mt-4 max-w-xl text-white/70">{copy(site, "bannerBody")}</p>
          <div className="mt-8">
            <CtaButton site={site} placement={placement} variant="accent" />
          </div>
        </div>
        <RouteMap places={places(site)} dark className="relative hidden h-auto w-full opacity-90 lg:block" />
      </div>
    </section>
  );
}

export function NetworkGuideHeader({ guide, meta }: { guide: Guide; meta: React.ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-surface">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6">
        {meta}
        <h1 className="mt-4 max-w-4xl text-5xl leading-[1.04] sm:text-6xl">{guide.h1}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{guide.intro}</p>
      </div>
    </header>
  );
}
