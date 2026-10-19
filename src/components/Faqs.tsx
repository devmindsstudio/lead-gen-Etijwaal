import type { Faq } from "@/lib/schema";

/** Native <details> so answers are in the HTML for crawlers and work without JS. */
export function Faqs({ items, heading = "Frequently asked questions" }: { items: Faq[]; heading?: string }) {
  if (!items.length) return null;
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
      <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface">
        {items.map((f) => (
          <details key={f.q} className="group px-5 py-4 sm:px-6">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-semibold">
              {f.q}
              <svg viewBox="0 0 20 20" className="faq-chevron h-5 w-5 shrink-0 text-muted transition" fill="currentColor" aria-hidden="true">
                <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
              </svg>
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
