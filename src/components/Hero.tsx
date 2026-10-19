import type { Site } from "@/lib/schema";
import { CtaButton } from "./CtaButton";

function PhoneMock({ label, rows, signal }: { label: string; rows: [string, string][]; signal: string }) {
  return (
    <div className="relative mx-auto w-64 sm:w-72" aria-hidden="true">
      <div className="absolute -inset-10 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-2xl">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand to-ink px-5 pb-8 pt-4 text-white">
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span>9:41</span>
            <span className="mx-auto h-5 w-20 rounded-full bg-ink" />
            <span className="flex items-end gap-0.5">
              {[1, 2, 3, 4].map((b) => (
                <span key={b} className="w-1 rounded-sm bg-white" style={{ height: `${b * 3}px` }} />
              ))}
              <span className="ml-1">{signal}</span>
            </span>
          </div>
          <div className="mt-10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Connected</p>
            <p className="mt-2 text-2xl font-bold">{label}</p>
          </div>
          <div className="mx-auto mt-8 grid h-28 w-28 place-items-center rounded-full border-4 border-white/25">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/15">
              <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12.5 10 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="mt-8 space-y-2.5">
            {rows.map(([k, v]) => (
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

export function Hero({ site }: { site: Site }) {
  const h = site.home.hero;
  return (
    <section className="relative overflow-hidden bg-surface-2">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--brand)_0%,transparent_55%)] opacity-[0.08]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {h.eyebrow}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {h.h1}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{h.subheading}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {h.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm font-medium">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-brand" fill="currentColor" aria-hidden="true">
                  <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4z" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CtaButton site={site} placement="hero" />
            <a href="#how-it-works" className="text-sm font-semibold text-muted hover:text-ink">
              How it works ↓
            </a>
          </div>
        </div>
        <PhoneMock label={h.deviceLabel} rows={site.copy.deviceRows} signal={site.copy.signalLabel} />
      </div>
    </section>
  );
}
