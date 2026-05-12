"use client";

import React from "react";
import ProfitCard from "./ProfitCard";

interface Tier {
    tierName: string;
    percentage: string;
    min: number;
    max?: number;
    tierTag?: string;
    groupsCount?: number;
    isMostPopular?: boolean;
}

const ProfitCards: React.FC = () => {
    const tiers: Tier[] = [
        {
            tierName: "STANDARD ENTRY",
            percentage: "40%",
            min: 0,
            max: 149,
            groupsCount: 12,
        },
        {
            tierName: "GROWTH ACCELERATOR",
            percentage: "45%",
            min: 150,
            max: 224,
            groupsCount: 48,
            isMostPopular: true,
        },
        {
            tierName: "ELITE PERFORMANCE",
            percentage: "50%",
            min: 225,
            groupsCount: 24,
        },
    ];

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
                <ProfitCard key={index} tierName={tier.tierName} percentage={tier.percentage} min={tier.min} max={tier.max} tierTag={tier.tierTag} groupsCount={tier.groupsCount} isMostPopular={tier.isMostPopular} />
            ))}
        </div>
    );
};

export default ProfitCards;
