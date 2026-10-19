import Link from "next/link";
import type { Guide, Site } from "@/lib/schema";
import { ArchLines, Skyline, StarPattern } from "./Decor";

type Props = { site: Site; guide: Guide; minutes: number; updated: string };

function Meta({ site, minutes, updated, guide, dark = false, center = false }: Props & { dark?: boolean; center?: boolean }) {
  const muted = dark ? "text-white/60" : "text-muted";
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm ${muted} ${center ? "text-center" : ""}`}>
        <Link href="/" className={dark ? "hover:text-white" : "hover:text-ink"}>{site.brand.name}</Link>
        <span className="mx-2">/</span>
        <span>Guides</span>
      </nav>
      <div className={`mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${muted} ${center ? "justify-center" : ""}`}>
        <span className="inline-flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" /></svg>
          {minutes} min read
        </span>
        <span>
          Updated <time dateTime={guide.updated}>{updated}</time>
        </span>
      </div>
    </>
  );
}

export function GuideHeader(props: Props) {
  const { site, guide } = props;

  if (site.design === "skyline") {
    return (
      <header className="relative -mt-16 overflow-hidden bg-night pt-16 text-white">
        <div className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-brand opacity-40 blur-[110px]" />
        <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6">
          <Meta {...props} dark />
          <h1 className="mt-4 max-w-4xl text-4xl leading-[1.08] sm:text-6xl">{guide.h1}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">{guide.intro}</p>
        </div>
      </header>
    );
  }

  if (site.design === "geometric") {
    return (
      <header className="relative overflow-hidden border-b-2 border-ink bg-surface">
        <StarPattern id="guide-stars" className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/3 text-brand/10 md:block" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6">
          <Meta {...props} />
          <h1 className="mt-4 max-w-4xl text-5xl leading-[0.98] sm:text-7xl">{guide.h1}</h1>
          <p className="mt-6 max-w-3xl border-l-4 border-accent pl-5 text-lg leading-relaxed text-muted">{guide.intro}</p>
        </div>
      </header>
    );
  }

  if (site.design === "arch") {
    return (
      <header className="relative overflow-hidden bg-surface">
        <ArchLines className="pointer-events-none absolute left-1/2 top-4 h-[34rem] -translate-x-1/2 text-accent/35" />
        <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-16 text-center sm:px-6">
          <Meta {...props} center />
          <h1 className="mt-5 text-4xl leading-[1.1] sm:text-6xl">{guide.h1}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">{guide.intro}</p>
        </div>
      </header>
    );
  }

  // boarding
  return (
    <header className="bg-surface-2">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6">
        <Meta {...props} />
        <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">{guide.h1}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{guide.intro}</p>
        <div className="perforation mt-10" style={{ ["--perf-bg" as string]: "var(--surface)" }} />
      </div>
    </header>
  );
}
