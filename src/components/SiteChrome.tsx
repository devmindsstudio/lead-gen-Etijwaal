import Link from "next/link";
import type { Site } from "@/lib/schema";
import { CtaButton } from "./CtaButton";

function Logo({ site }: { site: Site }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-bold tracking-tight">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M4 20v-3M9 20v-7M14 20V9M19 20V4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-lg">{site.brand.name}</span>
    </Link>
  );
}

export function Header({ site }: { site: Site }) {
  const nav = site.guides.slice(0, 3);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-surface/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo site={site} />
        <nav className="hidden items-center gap-6 whitespace-nowrap text-sm font-medium text-muted lg:flex" aria-label="Main">
          {nav.map((g) => (
            <Link key={g.slug} href={`/${g.slug}`} className="hover:text-ink">
              {g.navLabel}
            </Link>
          ))}
          <Link href="/#faq" className="hover:text-ink">FAQ</Link>
        </nav>
        <CtaButton site={site} placement="header" label={site.copy.headerCta} size="sm" />
      </div>
    </header>
  );
}

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="mt-auto border-t border-line bg-surface-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo site={site} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.brand.tagline}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Guides</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {site.guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/${g.slug}`} className="hover:text-ink">{g.h1}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">About</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-ink">About this site</Link></li>
            {(
              [
                [site.partner.supportUrl, "Contact support"],
                [site.partner.privacyUrl, "Privacy policy"],
                [site.partner.termsUrl, "Terms"],
              ] as const
            ).map(([href, label]) =>
              href ? (
                <li key={label}><a href={href} className="hover:text-ink" rel="noopener">{label}</a></li>
              ) : null,
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          © {site.brand.name}. {site.partner.disclosure}{" "}
          <a href={site.partner.url} className="underline hover:text-ink" rel="noopener">{site.partner.name}</a>.
        </p>
      </div>
    </footer>
  );
}
