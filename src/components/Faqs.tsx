import type { Faq } from "@/lib/schema";

/** Native <details> so answers are in the HTML for crawlers and work without JS. */
export function Faqs({ items, heading = "Frequently asked questions" }: { items: Faq[]; heading?: string }) {
  if (!items.length) return null;
  return (
    <section id="faq" className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">FAQ</p>
        <h2 className="mt-3 text-3xl leading-tight sm:text-[2.6rem]">{heading}</h2>
        <p className="mt-4 text-muted">{items.length} quick answers before you travel.</p>
      </div>
      <div className="space-y-3">
        {items.map((f, i) => (
          <details key={f.q} className="frame group rounded-site px-5 py-1 transition open:shadow-lg sm:px-6" open={i === 0}>
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left text-[1.0625rem] font-semibold">
              {f.q}
              <span className="faq-chevron grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 text-brand transition">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
                </svg>
              </span>
            </summary>
            <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
