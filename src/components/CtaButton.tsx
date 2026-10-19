import type { Site } from "@/lib/schema";
import { ctaHref } from "@/lib/sites";

type Props = {
  site: Site;
  /** Placement label, becomes utm_content so you can see which button converts. */
  placement: string;
  variant?: "solid" | "light";
  label?: string;
  size?: "sm" | "md";
  className?: string;
};

export function CtaButton({ site, placement, variant = "solid", label, size = "md", className = "" }: Props) {
  const styles =
    variant === "solid"
      ? "bg-brand text-brand-ink hover:brightness-110 shadow-lg shadow-brand/25"
      : "bg-white text-ink hover:bg-surface-2";
  const sizing = size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3.5 text-base";
  return (
    <a
      href={ctaHref(site, placement)}
      rel="noopener sponsored"
      data-cta={placement}
      className={`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition ${sizing} ${styles} ${className}`}
    >
      {label ?? site.cta.label}
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M11.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L14.6 11H3a1 1 0 1 1 0-2h11.6l-3.3-3.3a1 1 0 0 1 0-1.4z" />
      </svg>
    </a>
  );
}
