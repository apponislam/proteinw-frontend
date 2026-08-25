"use client";

import React, { useState } from "react";
import FundraisingCalculatorLeft from "./FundraisingCalculatorLeft";
import FundraisingSummary from "./FundraisingSummary";

const Fundraisingcalculator = () => {
    const [targetProfit, setTargetProfit] = useState(15000);
    const [students, setStudents] = useState(26);

    // Calculation Logic
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

    // Progress bar mapping to visual checkpoints (150 pkgs -> 45%, 225 pkgs -> 50%)
    // Let's cap the visual progress to 300 packages for display purposes
    const progress = Math.min((packagesNeeded / 300) * 100, 100);

    let nextTier = "Max Tier Reached";
    if (packagesNeeded < 150) {
        nextTier = `${150 - packagesNeeded} pkgs to 45%`;
    } else if (packagesNeeded < 225) {
        nextTier = `${225 - packagesNeeded} pkgs to 50%`;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <FundraisingCalculatorLeft targetProfit={targetProfit} setTargetProfit={setTargetProfit} students={students} setStudents={setStudents} profitPercent={profitPercent} />
            <FundraisingSummary packagesNeeded={packagesNeeded} perStudent={perStudent} totalProfit={totalProfit} profitPercent={profitPercent} progress={progress} nextTier={nextTier} targetProfit={targetProfit} />
        </div>
    );
};

export default Fundraisingcalculator;
