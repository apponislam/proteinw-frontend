"use client";

import React, { useState } from "react";
import Link from "next/link";
import FundraisingCalculatorLeft from "./FundraisingCalculatorLeft";
import FundraisingSummary from "./FundraisingSummary";

const Fundraisingcalculator = () => {
    const [targetProfit, setTargetProfit] = useState(15000);
    const [students, setStudents] = useState(26);

    // Thresholds & Prices:
    // Package price = 180 SEK
    // 0 - 149 pkgs  => 40% profit (72 SEK/pkg)  => Max 40% profit = 149 * 72 = 10,728 SEK
    // 150 - 224 pkgs => 45% profit (81 SEK/pkg)  => Min 45% profit = 150 * 81 = 12,150 SEK; Max = 224 * 81 = 18,144 SEK
    // 225+ pkgs      => 50% profit (90 SEK/pkg)  => Min 50% profit = 225 * 90 = 20,250 SEK

    const validTarget = Math.max(0, targetProfit);
    let p = 0;
    if (validTarget > 0) {
        if (validTarget <= 149 * 72) {
            p = Math.ceil(validTarget / 72);
        } else if (validTarget <= 224 * 81) {
            p = Math.max(150, Math.ceil(validTarget / 81));
        } else {
            p = Math.max(225, Math.ceil(validTarget / 90));
        }
    }

    const packagesNeeded = p;
    const perStudent = Math.ceil(packagesNeeded / (students || 1));

    let profitPercent = 40;
    let profitPerPkg = 72;
    if (packagesNeeded >= 150 && packagesNeeded <= 224) {
        profitPercent = 45;
        profitPerPkg = 81;
    } else if (packagesNeeded >= 225) {
        profitPercent = 50;
        profitPerPkg = 90;
    }

    const totalProfit = packagesNeeded * profitPerPkg;

    // Progress bar visualization:
    // 0 - 149 pkgs   => 0% to 50% bar
    // 150 - 224 pkgs => 50% to 99% bar
    // 225+ pkgs      => 100% bar (Max 50% profit tier reached)
    let progress = 0;
    if (packagesNeeded < 150) {
        progress = (packagesNeeded / 150) * 50;
    } else if (packagesNeeded < 225) {
        progress = 50 + ((packagesNeeded - 150) / (225 - 150)) * 50;
    } else {
        progress = 100;
    }

    let nextTier = "Maximal nivå uppnådd";
    if (packagesNeeded < 150) {
        nextTier = `${150 - packagesNeeded} st kvar till 45%`;
    } else if (packagesNeeded < 225) {
        nextTier = `${225 - packagesNeeded} st kvar till 50%`;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <FundraisingCalculatorLeft targetProfit={targetProfit} setTargetProfit={setTargetProfit} students={students} setStudents={setStudents} profitPercent={profitPercent} />
            <FundraisingSummary packagesNeeded={packagesNeeded} perStudent={perStudent} totalProfit={totalProfit} profitPercent={profitPercent} progress={progress} nextTier={nextTier} targetProfit={targetProfit} />

            {/* CTA Banner for Mobile (hidden on desktop) */}
            <div className="lg:hidden rounded-3xl bg-[#2F3131] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-bold leading-tight">Redo att köra igång?</h3>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">Det tar mindre än 2 minuter att komma igång.</p>
                </div>

                <Link href="/auth/register" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto rounded-2xl bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3.5 sm:py-4 text-sm sm:text-lg font-semibold text-white transition hover:scale-[1.02] cursor-pointer">Starta er försäljning nu</button>
                </Link>
            </div>
        </div>
    );
};

export default Fundraisingcalculator;
