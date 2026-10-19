import Link from "next/link";
import type { Site } from "@/lib/schema";
import { CtaButton } from "./CtaButton";

function LogoMark({ site }: { site: Site }) {
  const bars = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 20v-3M9 20v-7M14 20V9M19 20V4" strokeLinecap="round" />
    </svg>
  );
  switch (site.design) {
    case "geometric":
      return (
        <span className="grid h-9 w-9 place-items-center border-2 border-ink bg-brand text-brand-ink">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <rect x="6" y="6" width="12" height="12" />
            <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
          </svg>
        </span>
      );
    case "boarding":
      return (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-brand-ink">
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 rotate-45" fill="currentColor" aria-hidden="true">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
          </svg>
        </span>
      );
    case "arch":
      return <span className="arch-top grid h-10 w-8 place-items-center bg-brand pt-1.5 text-accent">{bars}</span>;
    default:
      return (
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-brand to-accent text-white shadow-lg shadow-brand/30">
          {bars}
        </span>
      );
  }
}

function Logo({ site }: { site: Site }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
      <LogoMark site={site} />
      <span className="heading text-lg" style={{ letterSpacing: "-0.02em" }}>{site.brand.name}</span>
    </Link>
  );
}

export function Header({ site }: { site: Site }) {
  const nav = site.guides.slice(0, 3);
  const border = site.design === "geometric" ? "border-b-2" : "border-b";
  return (
    <header
      className={`sticky top-0 z-40 ${border} backdrop-blur-md`}
      style={{ background: "var(--header-bg)", color: "var(--header-ink)", borderColor: "var(--header-line)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo site={site} />
        <nav className="hidden items-center gap-7 whitespace-nowrap text-sm font-medium lg:flex" aria-label="Main">
          {nav.map((g) => (
            <Link key={g.slug} href={`/${g.slug}`} className="opacity-75 transition hover:opacity-100">
              {g.navLabel}
            </Link>
          ))}
          <Link href="/#faq" className="opacity-75 transition hover:opacity-100">FAQ</Link>
        </nav>
        <div className="flex items-center gap-2">
          {/* Phones get the sticky bottom bar instead. */}
          <div className="hidden sm:block">
            <CtaButton
              site={site}
              placement="header"
              label={site.copy.headerCta}
              size="sm"
              variant={site.design === "skyline" ? "accent" : "solid"}
            />
          </div>
          <MobileMenu site={site} />
        </div>
      </div>
    </header>
  );
}

/** No-JS disclosure menu for small screens. */
function MobileMenu({ site }: { site: Site }) {
  return (
    <details className="relative lg:hidden">
      <summary
        className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border"
        style={{ borderColor: "var(--header-line)" }}
        aria-label="Menu"
      >
        <svg viewBox="0 0 24 24" className="menu-open-hide h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 24 24" className="menu-open-show h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="frame absolute right-0 top-12 w-[min(20rem,calc(100vw-2rem))] rounded-site p-3 text-ink shadow-2xl">
        <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Guides</p>
        <ul>
          {site.guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/${g.slug}`} className="block rounded-site px-3 py-2.5 text-sm font-medium hover:bg-surface-2">
                {g.h1}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#faq" className="block rounded-site px-3 py-2.5 text-sm font-medium hover:bg-surface-2">FAQ</Link>
          </li>
          <li>
            <Link href="/about" className="block rounded-site px-3 py-2.5 text-sm font-medium hover:bg-surface-2">About</Link>
          </li>
        </ul>
        <CtaButton site={site} placement="mobile-menu" className="mt-3 w-full" />
      </div>
    </details>
  );
}

/** Persistent buy button on phones, where the header CTA is hidden. */
export function MobileCtaBar({ site }: { site: Site }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t px-4 py-3 backdrop-blur-md sm:hidden"
      style={{ background: "var(--header-bg)", borderColor: "var(--header-line)" }}
    >
      <CtaButton site={site} placement="mobile-bar" className="w-full" variant={site.design === "skyline" ? "accent" : "solid"} />
    </div>
  );
}

const footerHeading = { fontFamily: "inherit", fontWeight: 600, letterSpacing: 0 } as const;

export function Footer({ site }: { site: Site }) {
  const links = (
    [
      [site.partner.supportUrl, "Contact support"],
      [site.partner.privacyUrl, "Privacy policy"],
      [site.partner.termsUrl, "Terms"],
    ] as const
  ).filter(([href]) => href);
  return (
    <footer className="mt-auto pb-20 sm:pb-0" style={{ background: "var(--footer-bg)", color: "var(--footer-ink)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_0.7fr]">
        <div>
          <Logo site={site} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "var(--footer-muted)" }}>
            {site.brand.tagline}
          </p>
        </div>
        <div>
          <h2 className="text-sm" style={footerHeading}>Guides</h2>
          <ul className="mt-4 space-y-2.5 text-sm" style={{ color: "var(--footer-muted)" }}>
            {site.guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/${g.slug}`} className="hover:underline">{g.h1}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm" style={footerHeading}>About</h2>
          <ul className="mt-4 space-y-2.5 text-sm" style={{ color: "var(--footer-muted)" }}>
            <li><Link href="/about" className="hover:underline">About this site</Link></li>
            {links.map(([href, label]) => (
              <li key={label}><a href={href} className="hover:underline" rel="noopener">{label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "var(--footer-line)" }}>
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs sm:px-6" style={{ color: "var(--footer-muted)" }}>
          © {site.brand.name}. {site.partner.disclosure}{" "}
          <a href={site.partner.url} className="underline" rel="noopener">{site.partner.name}</a>.
        </p>
      </div>
    </footer>
  );
}
