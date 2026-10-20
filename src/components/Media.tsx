import Image from "next/image";
import type { Photo, Site } from "@/lib/schema";
import { Icon } from "./Icon";

/** A site photo filling its (positioned, sized) parent. */
export function SitePhoto({
  photo,
  sizes,
  priority = false,
  className = "",
}: {
  photo: Photo;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}

const FLAG_CODES: Record<string, string> = {
  ae: "ae", uae: "ae", "united arab emirates": "ae",
  sa: "sa", ksa: "sa", "saudi arabia": "sa",
  qa: "qa", qatar: "qa",
  om: "om", oman: "om",
  kw: "kw", kuwait: "kw",
  bh: "bh", bahrain: "bh",
};

/** Flag code for a country name or ISO code, if we ship that flag. */
export function flagCode(nameOrCode: string): string | undefined {
  return FLAG_CODES[nameOrCode.toLowerCase()];
}

/** Round country flag (SVGs from flag-icons, MIT, in /public/flags). */
export function Flag({ code, className = "h-6 w-6" }: { code?: string; className?: string }) {
  if (!code) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny local SVG, no optimisation needed
    <img src={`/flags/${code}.svg`} alt="" width={24} height={24} className={`rounded-full object-cover ring-2 ring-white ${className}`} />
  );
}

/** Small reassurance chips under the hero CTA. Only claims every partner plan supports. */
export function TrustRow({ site, tone = "light", className = "" }: { site: Site; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const items: [Parameters<typeof Icon>[0]["name"], string][] = [
    ["bolt", "QR code by email"],
    ["signal", `${site.copy.signalLabel} local networks`],
    ["wallet", "Top up in the app"],
  ];
  return (
    <ul className={`mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm ${dark ? "text-white/70" : "text-muted"} ${className}`}>
      {items.map(([icon, label]) => (
        <li key={label} className="flex items-center gap-2">
          <Icon name={icon} className={`h-4 w-4 ${dark ? "text-accent" : "text-brand"}`} />
          {label}
        </li>
      ))}
    </ul>
  );
}

/** Floating white feature chip laid over hero imagery (decorative). */
export function FloatChip({ icon, label, className = "" }: { icon: Parameters<typeof Icon>[0]["name"]; label: string; className?: string }) {
  return (
    <span className={`absolute z-10 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-[#111] shadow-xl ${className}`} aria-hidden="true">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-brand-ink">
        <Icon name={icon} className="h-3.5 w-3.5" />
      </span>
      {label}
    </span>
  );
}

/** App Store / Google Play links for the partner's app. */
export function AppBadges({ site, tone = "dark" }: { site: Site; tone?: "light" | "dark" }) {
  const { appStoreUrl, playStoreUrl } = site.partner;
  if (!appStoreUrl && !playStoreUrl) return null;
  const cls =
    tone === "dark"
      ? "bg-black text-white ring-1 ring-white/20 hover:bg-black/80"
      : "bg-white text-ink ring-1 ring-line hover:bg-surface-2";
  return (
    <div className="flex flex-wrap gap-3">
      {appStoreUrl && (
        <a href={appStoreUrl} rel="noopener" className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2 transition ${cls}`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M16.4 12.6c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.9-1.1-2.9-4.2zM13.9 5.1c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.6 3-1.5z" />
          </svg>
          <span className="text-left leading-tight">
            <span className="block text-[10px] opacity-75">Download on the</span>
            <span className="block text-sm font-semibold">App Store</span>
          </span>
        </a>
      )}
      {playStoreUrl && (
        <a href={playStoreUrl} rel="noopener" className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2 transition ${cls}`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path fill="#00d7fe" d="M3.6 2.3c-.3.3-.4.7-.4 1.3v16.8c0 .6.1 1 .4 1.3l9.3-9.7z" />
            <path fill="#ffce00" d="m16 15.1-3.1-3.1L16 8.9l3.6 2.1c1 .6 1 1.5 0 2.1z" />
            <path fill="#ff3a44" d="M16 15.1 12.9 12l-9.3 9.7c.4.4.9.4 1.6.1z" />
            <path fill="#00f076" d="M16 8.9 5.2 2.2c-.7-.4-1.3-.3-1.6.1l9.3 9.7z" />
          </svg>
          <span className="text-left leading-tight">
            <span className="block text-[10px] opacity-75">Get it on</span>
            <span className="block text-sm font-semibold">Google Play</span>
          </span>
        </a>
      )}
    </div>
  );
}
