import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getSite, sites, siteUrl } from "@/lib/sites";
import { Header, Footer } from "@/components/SiteChrome";
import { JsonLd, websiteLd } from "@/components/JsonLd";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Only the sites/guides defined in /sites are valid; everything else is a hard 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return sites.map((s) => ({ site: s.id }));
}

export async function generateMetadata({ params }: LayoutProps<"/[site]">): Promise<Metadata> {
  const site = getSite((await params).site);
  if (!site) return {};
  return {
    metadataBase: new URL(siteUrl(site)),
    title: { default: site.seo.title, template: `%s | ${site.brand.name}` },
    description: site.seo.description,
    keywords: site.seo.keywords,
    applicationName: site.brand.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: site.brand.name,
      locale: site.locale,
      url: "/",
      title: site.seo.title,
      description: site.seo.description,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export async function generateViewport({ params }: LayoutProps<"/[site]">): Promise<Viewport> {
  const site = getSite((await params).site);
  return { themeColor: site?.brand.primary };
}

export default async function SiteLayout({ children, params }: LayoutProps<"/[site]">) {
  const site = getSite((await params).site);
  if (!site) notFound();

  const theme = {
    "--brand": site.brand.primary,
    "--brand-ink": site.brand.primaryInk,
    "--accent": site.brand.accent,
  } as CSSProperties;

  const ga = site.analytics.ga4Id;

  return (
    <html lang={site.locale} className={`${jakarta.variable} h-full antialiased`} style={theme}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={websiteLd(site)} />
        <Header site={site} />
        <main className="flex-1">{children}</main>
        <Footer site={site} />
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-cta]');if(a)gtag('event','cta_click',{placement:a.dataset.cta});});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
