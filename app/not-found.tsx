import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
            <div className="max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F59E0B]">Page not found</p>
                <h1 className="mt-6 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">404</h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">We couldn&apos;t find the page you were looking for. It may have been moved, renamed, or never existed.</p>
                <div className="mt-10 flex items-center justify-center gap-4">
                    <Link href="/" className="inline-flex items-center justify-center rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F59E0B]/20 transition hover:bg-[#d38707] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2">
                        Go back home
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-border/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-[#F59E0B] hover:text-[#F59E0B]">
                        Contact support
                    </Link>
                </div>
            </div>
        </main>
    );
}
