import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">404</p>
      <h1 className="mt-3 text-3xl">This page has gone off-network</h1>
      <p className="mt-4 text-muted">The page you were looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 inline-block btn btn-solid px-6 py-3 font-semibold">
        Back to home
      </Link>
    </section>
  );
}
