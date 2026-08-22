"use client";

import { Lightbulb, TrendingUp } from "lucide-react";
import Image from "next/image";

interface FundraisingSummaryProps {
    packagesNeeded?: number;
    perStudent?: number;
    totalProfit?: number;
    profitPercent?: number;
    progress?: number;
    nextTier?: string;
    targetProfit?: number;
}

export default function FundraisingSummary({ packagesNeeded = 209, perStudent = 8, totalProfit = 16929, profitPercent = 45, progress = 72, nextTier = "50%", targetProfit = 15000 }: FundraisingSummaryProps) {
    return (
        <div className="w-full space-y-4">
            {/* TOP BOXES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PACKAGES NEEDED */}
                <div className="rounded-3xl bg-white p-5 sm:p-6 text-black shadow-xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Packages Needed</p>

                    <h2 className="mt-3 sm:mt-4 text-4xl sm:text-5xl font-bold text-[#1C1917]">{packagesNeeded}</h2>

                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-400">To reach your {targetProfit.toLocaleString()} kr goal</p>
                </div>

                {/* PER STUDENT */}
                <div className="rounded-3xl bg-white p-5 sm:p-6 text-black shadow-xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Per Student</p>

                    <h2 className="mt-3 sm:mt-4 text-4xl sm:text-5xl font-bold text-[#1C1917]">{perStudent}</h2>

                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-400">Average packages per person</p>
                </div>
            </div>

            {/* TOTAL PROFIT */}
            <div className="rounded-3xl bg-[#FFDEA8] p-5 sm:p-6 text-[#271900] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em]">Estimated Total Profit</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-1 sm:mt-0">{totalProfit.toLocaleString()} SEK</h2>
                </div>
                <button className="bg-[#271900] rounded-full text-[#FFDEA8] px-4 py-2.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shrink-0">
                    <TrendingUp className="w-4 h-4" /> {profitPercent}% Profit Tier
                </button>
            </div>

            {/* PROGRESS */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 text-black shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-base sm:text-lg font-semibold text-[#271900]">Profit Tier Progress</p>

                    <p className="text-xs sm:text-sm font-semibold text-[#7C5800]">Next Tier: {nextTier}</p>
                </div>

                <div className="mt-5 sm:mt-6 relative h-3 rounded-full bg-[#FCB601]">
                    <div className="absolute left-0 top-0 h-3 rounded-full bg-[#271900] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>

                <div className="mt-5 sm:mt-6 flex justify-between text-xs text-[#837560]">
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-[#271900]">40%</span>
                        <span>150 Pkgs</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-[#271900]">45%</span>
                        <span>225 Pkgs</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-[#271900]">50%</span>
                        <span>300 Pkgs</span>
                    </div>
                </div>

                {/* TIP */}
                <div className="mt-5 sm:mt-6 rounded-2xl bg-[#F3F3F3] p-4 flex items-start gap-3 text-[#7C5800]">
                    <Lightbulb className="shrink-0 w-5 h-5 mt-0.5" />
                    <p className="text-xs sm:text-sm leading-relaxed">
                        <span className="font-semibold">Expert Tip:</span> If each student sells just 2 more packages, your team will unlock the next profit tier and increase total earnings.
                    </p>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-[24px]">
                <Image src="/profit/profitpic.png" alt="Description" width={500} height={300} className="w-full h-48 sm:h-64 lg:h-auto object-cover rounded-[24px]" />

                {/* Black Overlay */}
                <div className="absolute inset-0 rounded-[24px] bg-black/50" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 xl:bottom-8 xl:left-8 z-10 text-white">
                    <h3 className="text-lg sm:text-2xl font-bold mb-1">High-Margin Products</h3>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                        Our collections sell faster because they are useful, sustainable, and <br className="hidden xl:block" /> beautifully designed. Quality that supports your community.
                    </p>
                </div>
            </div>
        </div>
    );
}
