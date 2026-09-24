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
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Antal paket</p>

                    <h2 className="mt-3 sm:mt-4 text-4xl sm:text-5xl font-bold text-[#1C1917]">{packagesNeeded}</h2>

                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-400">För att nå ert mål på {targetProfit.toLocaleString()} kr</p>
                </div>

                {/* PER STUDENT */}
                <div className="rounded-3xl bg-white p-5 sm:p-6 text-black shadow-xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Per deltagare</p>

                    <h2 className="mt-3 sm:mt-4 text-4xl sm:text-5xl font-bold text-[#1C1917]">{perStudent}</h2>

                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-400">Genomsnittligt antal paket per säljare</p>
                </div>
            </div>

            {/* TOTAL PROFIT */}
            <div className="rounded-3xl bg-[#FFDEA8] p-5 sm:p-6 text-[#271900] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em]">Beräknad total förtjänst</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-1 sm:mt-0">{totalProfit.toLocaleString()} SEK</h2>
                </div>
                <button className="bg-[#271900] rounded-full text-[#FFDEA8] px-4 py-2.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shrink-0">
                    <TrendingUp className="w-4 h-4" /> {profitPercent}% Förtjänstnivå
                </button>
            </div>

            {/* PROGRESS */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 text-black shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-base sm:text-lg font-semibold text-[#271900]">Framsteg förtjänstnivå</p>

                    <p className="text-xs sm:text-sm font-semibold text-[#7C5800]">Nästa nivå: {nextTier}</p>
                </div>

                <div className="mt-5 sm:mt-6 relative h-3 rounded-full bg-[#E5E7EB]">
                    <div className="absolute left-0 top-0 h-3 rounded-full bg-linear-to-r from-[#7C5800] to-[#FFB800] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>

                <div className="mt-5 sm:mt-6 flex justify-between text-xs text-[#837560]">
                    <div className="flex flex-col items-start justify-center">
                        <span className="font-bold text-[#271900]">40%</span>
                        <span>0 - 149 st</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-[#271900]">45%</span>
                        <span>150 - 224 st</span>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                        <span className="font-bold text-[#271900]">50%</span>
                        <span>225+ st</span>
                    </div>
                </div>

                {/* TIP */}
                {/* {(() => {
                    let tipMessage = "";
                    const activeStudents = Math.max(1, perStudent > 0 ? Math.ceil(packagesNeeded / perStudent) : 1);

                    if (packagesNeeded < 150) {
                        const pkgsToNext = 150 - packagesNeeded;
                        const additionalPerStudent = Math.ceil(pkgsToNext / activeStudents);
                        tipMessage = `Om varje säljare säljer bara ${additionalPerStudent} paket till, låser ni upp 45% förtjänstnivå!`;
                    } else if (packagesNeeded < 225) {
                        const pkgsToNext = 225 - packagesNeeded;
                        const additionalPerStudent = Math.ceil(pkgsToNext / activeStudents);
                        tipMessage = `Om varje säljare säljer bara ${additionalPerStudent} paket till, låser ni upp maximala 50% förtjänstnivå!`;
                    } else {
                        tipMessage = `Grymt jobbat! Er grupp har nått den maximala förtjänstnivån på 50%!`;
                    }

                    return (
                        <div className="mt-5 sm:mt-6 rounded-2xl bg-[#F3F3F3] p-4 flex items-start gap-3 text-[#7C5800]">
                            <Lightbulb className="shrink-0 w-5 h-5 mt-0.5" />
                            <p className="text-xs sm:text-sm leading-relaxed">
                                <span className="font-semibold uppercase tracking-wide">TIPS:</span> {tipMessage}
                            </p>
                        </div>
                    );
                })()} */}
            </div>
            <div className="relative overflow-hidden rounded-[24px]">
                <Image src="/profit/profitpic.png" alt="High margin products" width={500} height={300} className="w-full h-48 sm:h-64 lg:h-auto object-cover rounded-[24px]" />

                {/* Black Overlay */}
                <div className="absolute inset-0 rounded-[24px] bg-black/50" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 xl:bottom-8 xl:left-8 z-10 text-white">
                    <h3 className="text-lg sm:text-2xl font-bold mb-1">Lättsålda kvalitetsprodukter</h3>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                        Våra produkter säljer snabbt eftersom de är användbara, hållbara och <br className="hidden xl:block" /> uppskattas av alla. Kvalitet som gör det enkelt att nå era mål.
                    </p>
                </div>
            </div>
        </div>
    );
}
