import { notFound } from "next/navigation";
import { getSite } from "@/lib/sites";
import { Hero } from "@/components/designs/Heroes";
import {
  Benefits,
  Comparison,
  CtaBanner,
  GuideCards,
  HowItWorks,
  Networks,
  Places,
  ProseSections,
} from "@/components/HomeSections";
import { Faqs } from "@/components/Faqs";
import { JsonLd, faqLd } from "@/components/JsonLd";

export default async function Home({ params }: PageProps<"/[site]">) {
  const site = getSite((await params).site);
  if (!site) notFound();

  return (
    <>
      <JsonLd data={faqLd(site.home.faqs)} />
      <Hero site={site} />
      <Benefits site={site} />
      <Places site={site} />
      <HowItWorks site={site} />
      <Comparison site={site} />
      <Networks site={site} />
      <ProseSections site={site} />
      <GuideCards site={site} />
      <Faqs items={site.home.faqs} />
      <CtaBanner site={site} placement="home-footer" />
    </>
  );
}
