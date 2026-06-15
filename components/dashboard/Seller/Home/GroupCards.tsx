"use client";

import React from "react";
import GroupCard from "./GroupCard";
import { useGetMyGroupQuery, useGetMyCampaignStatsQuery } from "@/redux/features/group/groupApi";

const GroupCards = () => {
    const { data: myGroupData, isLoading: isGroupLoading } = useGetMyGroupQuery();
    const { data: statsData, isLoading: isStatsLoading } = useGetMyCampaignStatsQuery();

    const isLoading = isGroupLoading || isStatsLoading;
    const group = myGroupData?.data;
    const stats = statsData?.data;

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#78716C] text-sm">Loading group info...</p>
            </div>
        );
    }

    if (!group) {
        return <div className="mt-8 bg-white p-8 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] text-center text-[#78716C]">You are not currently assigned to any fundraising group.</div>;
    }

    const totalPackages = stats?.totalPackagesSold || 0;
    const totalSalesNum = stats?.totalRevenue || 0;

    const nextTier = stats?.nextTier;
    const packagesNeeded = stats?.packagesNeededForNextTier || 0;

    const nextTierProfitText = nextTier ? `${nextTier.percentage}%` : "Max Tier";

    const untilBonusText = nextTier ? `${packagesNeeded} package${packagesNeeded > 1 ? "s" : ""} until ${nextTier.percentage}% profit bonus` : "Highest profit tier reached! 🎉";

    const progress = nextTier && nextTier.minSalesVolume ? Math.min(100, Math.round((totalPackages / nextTier.minSalesVolume) * 100)) : 100;

    const formattedGroupObj = {
        _id: group._id,
        name: group.name,
        campaignName: (group.runningCampaignId as any)?.name || "No running campaign",
        activeSellers: "Active",
        totalSales: `${totalPackages} package${totalPackages !== 1 ? "s" : ""} (${totalSalesNum.toLocaleString()} SEK)`,
        nextTierProfit: nextTierProfitText,
        untilBonus: untilBonusText,
        progress: progress,
    };

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GroupCard group={formattedGroupObj} />
        </div>
    );
};

export default GroupCards;
