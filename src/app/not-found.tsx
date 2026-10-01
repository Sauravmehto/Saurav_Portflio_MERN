import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-36 text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">This page is not here</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The link may be old, or the page was never added. The rest of the site is still up.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
        >
          Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
