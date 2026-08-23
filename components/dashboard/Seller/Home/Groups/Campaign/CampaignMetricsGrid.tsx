"use client";

import React from "react";
import Image from "next/image";
import { TCampaign } from "@/redux/features/campaign/campaignApi";

import { User, Mail, Phone } from "lucide-react";

interface CampaignMetricsGridProps {
    campaign: TCampaign;
    stats?: Array<{
        title: string;
        value: string;
        subtitle?: string;
    }>;
}

const CampaignMetricsGrid: React.FC<CampaignMetricsGridProps> = ({ campaign, stats: customStats }) => {
    const profitPercentage = campaign.currentTier?.percentage || 40;
    const estProfit = Math.round(((campaign.totalRevenueSold || 0) * profitPercentage) / 100);
    const targetRevenue = campaign.target || 0;
    const sekProgress = targetRevenue > 0 ? Math.min(100, Math.round(((campaign.totalRevenueSold || 0) / targetRevenue) * 100)) : 0;
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
    const admin = campaign.campaignAdmin;

    const defaultStats = [
        {
            title: targetRevenue > 0 ? `GOAL: SEK ${targetRevenue.toLocaleString()} (${sekProgress}%)` : `GOAL: SEK 0`,
            value: `${campaign.totalPackagesSold || 0} pcs`,
            subtitle: packagesNeeded && packagesNeeded > 0 ? `NEXT TIER: ${packagesNeeded} PCS NEEDED` : "TOTAL SOLD",
        },
        {
            title: `EST. PROFIT (${profitPercentage}%): SEK ${estProfit.toLocaleString()}`,
            value: `SEK ${(campaign.totalRevenueSold || 0).toLocaleString()}`,
            subtitle: "REVENUE RAISED",
        },
        {
            title: `END DATE: ${formattedEndDate}`,
            value: currentStatusStr,
            subtitle: `STATUS (${getDaysLeft()})`,
        },
    ];

    const displayStats = customStats || defaultStats;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStats.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer"
                >
                    <div className="relative z-10">
                        {stat.subtitle && (
                            <div className="text-[#D97706] text-xs font-bold mb-2 group-hover:text-[#271900] transition-colors duration-300 tracking-wider uppercase">
                                {stat.subtitle}
                            </div>
                        )}
                        <div className="text-3xl font-bold text-[#1A1C1C] mb-2 group-hover:text-[#271900] transition-colors duration-300">
                            {stat.value}
                        </div>
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">
                            {stat.title}
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>
            ))}

            {/* 4th Card: Original Leader Contact Card */}
            <div className="bg-white p-6 rounded-lg border border-[#E7E5E4] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4">
                <h3 className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Leader Contact</h3>
                {admin ? (
                    <div className="flex flex-col justify-between grow space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-[#D97706] flex items-center justify-center font-bold text-sm shrink-0">
                                    <User size={18} />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-sm text-[#1A1C1C] truncate">{admin.name || "N/A"}</h4>
                                    <span className="text-xs text-[#78716C] block">Leader</span>
                                </div>
                            </div>
                            <div className="space-y-1 text-right text-xs text-[#78716C] shrink-0">
                                <div className="flex items-center justify-end gap-1.5 min-w-0">
                                    <Mail size={13} className="shrink-0 text-[#D97706]" />
                                    <span className="truncate block font-medium text-[#1A1C1C] max-w-36" title={admin.email}>
                                        {admin.email}
                                    </span>
                                </div>
                                {admin.phone && (
                                    <div className="flex items-center justify-end gap-1.5 min-w-0">
                                        <Phone size={13} className="shrink-0 text-[#D97706]" />
                                        <span className="truncate block font-medium text-[#1A1C1C]">{admin.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-[#78716C] italic text-center py-4">No leader assigned to this campaign.</div>
                )}
            </div>
        </div>
    );
};

export default CampaignMetricsGrid;
