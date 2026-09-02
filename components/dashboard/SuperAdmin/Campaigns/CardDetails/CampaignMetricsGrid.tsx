"use client";

import React from "react";
import Image from "next/image";
import { TCampaign } from "@/redux/features/campaign/campaignApi";

interface CampaignMetricsGridProps {
    campaign: TCampaign;
    stats?: Array<{
        title: string;
        value: string;
        subtitle?: string;
    }>;
}

const CampaignMetricsGrid: React.FC<CampaignMetricsGridProps> = ({ campaign, stats: customStats }) => {
    // Calculate metrics directly inside CampaignMetricsGrid component
    const profitPercentage = campaign.currentTier?.percentage || 40;
    const estProfit = campaign.totalRevenueSold || 0;
    const totalSoldAmount = campaign.totalSoldAmount || 0;
    const targetRevenue = campaign.target || 0;
    const sekProgress = targetRevenue > 0 ? Math.min(100, Math.round((totalSoldAmount / targetRevenue) * 100)) : 0;
    const packagesNeeded = campaign.packagesNeededForNextTier;

    const endDate = new Date(campaign.endDate);
    const today = new Date();
    const formattedEndDate = endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });

    const getDaysLeft = () => {
        const todayStart = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
        const endStart = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());
        const diffDays = Math.round((endStart - todayStart) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return "Expired";
        if (diffDays === 0) return "Ends today";
        return `In ${diffDays} days`;
    };

    const currentStatusStr = campaign.status || "DRAFT";

    const defaultStats = [
        {
            subtitle: packagesNeeded && packagesNeeded > 0 ? `NEXT TIER: ${packagesNeeded} PCS NEEDED` : "TOTAL SOLD",
            value: `${campaign.totalPackagesSold || 0} pcs`,
            title: targetRevenue > 0 ? `GOAL: SEK ${targetRevenue.toLocaleString()} (${sekProgress}%)` : `GOAL: SEK 0`,
        },
        {
            subtitle: `EST. PROFIT (${profitPercentage}%)`,
            value: `SEK ${estProfit.toLocaleString()}`,
            title: `REVENUE RAISED: SEK ${totalSoldAmount.toLocaleString()}`,
        },
        {
            subtitle: `STATUS (${getDaysLeft()})`,
            value: currentStatusStr,
            title: `END DATE: ${formattedEndDate}`,
        },
    ];

    const displayStats = customStats || defaultStats;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayStats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                    <div className="relative z-10">
                        {stat.subtitle && <div className="text-[#D97706] text-xs font-bold mb-2 group-hover:text-[#271900] transition-colors duration-300 tracking-wider uppercase">{stat.subtitle}</div>}
                        <div className="text-3xl font-bold text-[#1A1C1C] mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.value}</div>
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">{stat.title}</div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CampaignMetricsGrid;
