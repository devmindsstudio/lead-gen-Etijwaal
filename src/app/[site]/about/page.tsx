import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/sites";
import { CtaBanner } from "@/components/HomeSections";

export async function generateMetadata({ params }: PageProps<"/[site]/about">): Promise<Metadata> {
  const site = getSite((await params).site);
  if (!site) return {};
  return {
    title: site.about.heading,
    description: site.about.description,
    alternates: { canonical: "/about" },
  };
}

export default async function About({ params }: PageProps<"/[site]/about">) {
  const site = getSite((await params).site);
  if (!site) notFound();
  const credits = [site.images?.hero, ...(site.images?.places ?? []), ...site.guides.map((g) => g.image)].filter(
    (p): p is NonNullable<typeof p> => !!p,
  );
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl sm:text-5xl">{site.about.heading}</h1>
        <div className="prose-site">
          {site.about.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        </div>
        {credits.length > 0 && (
          <div className="mt-14 border-t border-line pt-8">
            <h2 className="text-xl">Photo credits</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              {credits.map((c) => (
                <li key={c.src}>
                  <a href={c.source} rel="noopener nofollow" className="underline-offset-2 hover:underline">
                    {c.alt}
                  </a>{" "}
                  · {c.credit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <CtaBanner site={site} placement="about" />
    </>
  );
}
