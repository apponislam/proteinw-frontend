"use client";

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
                <div className="rounded-3xl bg-black p-6 text-white">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Packages Needed</p>

                    <h2 className="mt-4 text-5xl font-bold">{packagesNeeded}</h2>

                    <p className="mt-3 text-sm text-zinc-400">To reach your {targetProfit.toLocaleString()} kr goal</p>
                </div>

                {/* PER STUDENT */}
                <div className="rounded-3xl bg-black p-6 text-white">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Per Student</p>

                    <h2 className="mt-4 text-5xl font-bold">{perStudent}</h2>

                    <p className="mt-3 text-sm text-zinc-400">Average packages per person</p>
                </div>
            </div>

            {/* TOTAL PROFIT */}
            <div className="rounded-3xl bg-black p-6 text-white">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Estimated Total Profit</p>

                <h2 className="mt-4 text-5xl font-bold">{totalProfit.toLocaleString()} SEK</h2>

                <p className="mt-3 text-lg text-zinc-300">{profitPercent}% Profit Tier</p>
            </div>

            {/* PROGRESS */}
            <div className="rounded-3xl bg-black p-6 text-white">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Profit Tier Progress</p>

                    <p className="text-sm text-zinc-300">Next Tier: {nextTier}</p>
                </div>

                <div className="mt-6 relative h-3 rounded-full bg-white/10">
                    <div className="absolute left-0 top-0 h-3 rounded-full bg-white transition-all" style={{ width: `${progress}%` }} />
                </div>

                <div className="mt-6 flex justify-between text-xs text-zinc-400">
                    <span>40%</span>
                    <span>45%</span>
                    <span>50%</span>
                    <span>300+</span>
                </div>

                {/* TIP */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-zinc-300">
                        <span className="font-semibold text-white">Expert Tip:</span> If each student sells just 2 more packages, your team will unlock the next profit tier and increase total earnings.
                    </p>
                </div>
            </div>
        </div>
    );
}
