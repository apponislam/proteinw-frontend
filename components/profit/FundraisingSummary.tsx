"use client";

import { Lightbulb, TrendingUp } from "lucide-react";

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
        <div className="w-full  space-y-4">
            {/* TOP BOXES */}
            <div className="grid grid-cols-2 gap-4">
                {/* PACKAGES NEEDED */}
                <div className="rounded-3xl bg-white p-6 text-black shadow-xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Packages Needed</p>

                    <h2 className="mt-4 text-5xl font-bold">{packagesNeeded}</h2>

                    <p className="mt-3 text-sm text-zinc-400">To reach your {targetProfit.toLocaleString()} kr goal</p>
                </div>

                {/* PER STUDENT */}
                <div className="rounded-3xl bg-white p-6 text-black shadow-xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Per Student</p>

                    <h2 className="mt-4 text-5xl font-bold">{perStudent}</h2>

                    <p className="mt-3 text-sm text-zinc-400">Average packages per person</p>
                </div>
            </div>

            {/* TOTAL PROFIT */}
            <div className="rounded-3xl bg-[#FFDEA8] p-6 text-[#271900] flex items-center justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] ">Estimated Total Profit</p>
                    <h2 className=" text-5xl font-bold">{totalProfit.toLocaleString()} SEK</h2>
                </div>
                <button className="bg-[#271900] rounded-4xl text-[#FFDEA8] px-4 py-2 flex items-center gap-2">
                    <TrendingUp /> {profitPercent}% Profit Tier
                </button>
                {/* <p className="mt-3 text-lg text-zinc-300">{profitPercent}% Profit Tier</p> */}
            </div>

            {/* PROGRESS */}
            <div className="rounded-3xl bg-white p-6 text-black shadow-xl">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-[#271900]">Profit Tier Progress</p>

                    <p className="text-[#7C5800]">Next Tier: {nextTier}</p>
                </div>

                <div className="mt-6 relative h-3 rounded-full bg-[#FCB601]">
                    <div className="absolute left-0 top-0 h-3 rounded-full bg-[#271900] transition-all" style={{ width: `${progress}%` }} />
                </div>

                <div className="mt-6 flex justify-between text-xs text-[#837560]">
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-center">40%</span>
                        <span className="text-center">150 Pkgs</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-center">45%</span>
                        <span className="text-center">225 Pkgs</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-center">40%</span>
                        <span className="text-center">225+ Pkgs</span>
                    </div>
                </div>

                {/* TIP */}
                <div className="mt-6 rounded-2xl bg-[#F3F3F3] p-4 flex items-start gap-3 text-[#7C5800]">
                    <Lightbulb />
                    <p className="text-sm ">
                        <span className="font-semibold">Expert Tip:</span> If each student sells just 2 more packages, your team will unlock the next profit tier and increase total earnings.
                    </p>
                </div>
            </div>
        </div>
    );
}
