import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";

export function HeroArea() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-blue-50 via-white to-gray-50 min-h-screen flex flex-col">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative z-10 flex-1 flex items-center">
                {/* Main Hero Banner */}
                <div className="mx-auto container px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-150">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h1 className="text-4xl sm:text-[72px] font-bold text-[#1A1C1C] leading-tight">
                                    Raise money for
                                    <br />
                                    your <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7C5800] to-[#F59E0B]">dreams</span> with
                                    <br />
                                    Kungsbjörnen
                                </h1>

                                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">The simplest way for classes, teams, and associations to sell premium Scandinavian candles, diffusers, and socks. Hand-crafted quality for community goals.</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href="/auth/register" className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#7C5800] to-[#FFB800] hover:from-[#8B6500] hover:to-[#FFCC00] text-white font-semibold px-8 py-4 rounded-[24px] shadow-lg hover:shadow-xl transition-all duration-300">
                                    Get Started
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                <Link href="#profit" className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-900 font-semibold px-8 py-4 rounded-[24px] hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors duration-300">
                                    See Your Profit
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Hero Banner Image */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                            <Image src="/herobanner.png" alt="Kungsbjörnen Premium Products" fill className="object-contain" priority />

                            {/* Profit Box - Absolutely Positioned */}
                            <div className="absolute bottom-4 left-4 backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6 shadow-md">
                                <div className="flex items-center gap-4">
                                    <TrendingUp className="text-[#7C5800]" />
                                    <p className="text-4xl font-bold text-gray-900">50%</p>
                                </div>
                                <p className="text-gray-600 text-sm mt-2 max-w-xs">Industry-leading profit margins for your group.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
