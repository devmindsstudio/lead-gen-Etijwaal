import type { Faq, Guide, Site } from "@/lib/schema";
import { siteUrl } from "@/lib/sites";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function websiteLd(site: Site) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brand.name,
    url: siteUrl(site),
    inLanguage: site.locale,
    publisher: { "@type": "Organization", name: site.partner.name, url: site.partner.url },
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleLd(site: Site, g: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.description,
    dateModified: g.updated,
    mainEntityOfPage: siteUrl(site, `/${g.slug}`),
    author: { "@type": "Organization", name: site.brand.name, url: siteUrl(site) },
    publisher: { "@type": "Organization", name: site.partner.name, url: site.partner.url },
  };
}

export function breadcrumbLd(site: Site, g: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.brand.name, item: siteUrl(site) },
      { "@type": "ListItem", position: 2, name: g.h1, item: siteUrl(site, `/${g.slug}`) },
    ],
  };
}
