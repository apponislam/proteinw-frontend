"use client";

import React from "react";

interface ProfitCardProps {
    tierName: string;
    percentage: string;
    min: number;
    max?: number;
    tierTag?: string;
    groupsCount?: number;
    isMostPopular?: boolean;
}

const ProfitCard: React.FC<ProfitCardProps> = ({ tierName, percentage, min, max, tierTag, groupsCount = 0, isMostPopular = false }) => {
    const salesRange = max ? `${min} – ${max} Items` : `${min}+ Items`;

    return (
        <div className={`bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 relative overflow-hidden group ${isMostPopular ? "ring-2 ring-[#F59E0B33]" : ""}`}>
            {isMostPopular && <div className="absolute top-0 right-0 bg-[#D97706] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MOST POPULAR</div>}
            <div className="relative z-10">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{tierName}</h3>
                    {tierTag && <p className="text-[#78716C] text-sm mt-1 group-hover:text-[#271900] transition-colors duration-300">{tierTag}</p>}
                </div>

                <div className="mb-4">
                    <div className="text-4xl font-bold text-[#D97706]">{percentage}</div>
                </div>

                <div className="mb-4">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">Sales Volume</div>
                    <div className="text-[#1A1C1C] font-bold group-hover:text-[#271900] transition-colors duration-300">{salesRange}</div>
                </div>

                <div className="flex items-center justify-between mb-4">{groupsCount > 0 && <div className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">Groups ({groupsCount})</div>}</div>

                <button className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2">Edit Tier</button>
            </div>
        </div>
    );
};

export default ProfitCard;
