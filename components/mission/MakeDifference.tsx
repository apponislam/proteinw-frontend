import Link from "next/link";

export function MakeDifference() {
    return (
        <section className="py-16 bg-white">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-[32px] py-20 px-6 md:py-24 md:px-12 text-center text-white shadow-2xl relative overflow-hidden">
                    {/* Decorative subtle background pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                            Ready to make a difference?
                        </h2>
                        
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
                            Join hundreds of communities already using Kungsbjörnen to fuel their dreams.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto bg-white text-[#7C5800] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                                    Contact Us
                                </button>
                            </Link>
                            <Link href="/stories" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto border-2 border-white/60 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white hover:-translate-y-0.5 cursor-pointer">
                                    Our Success Stories
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
