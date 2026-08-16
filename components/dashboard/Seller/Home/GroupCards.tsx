"use client";

import React from "react";
import GroupCard from "./GroupCard";
import { useGetMyJoinedGroupsQuery } from "@/redux/features/sellerGroup/sellerGroupApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

const GroupCards = () => {
    const user = useAppSelector(currentUser);
    const isSuperAdmin = user?.role === "SUPER_ADMIN";

    const { data: myJoinedGroupsData, isLoading } = useGetMyJoinedGroupsQuery(undefined, {
        skip: isSuperAdmin,
    });

    console.log(myJoinedGroupsData);

    const groups = myJoinedGroupsData?.data || [];

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#78716C] text-sm">Loading group info...</p>
            </div>
        );
    }

    if (!groups || groups.length === 0) {
        return <div className="mt-8 bg-white p-8 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] text-center text-[#78716C]">You are not currently assigned to any fundraising group.</div>;
    }

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group: any) => {
                const totalPackages = group?.tierInfo?.totalPackagesSold || 0;
                const totalSalesNum = group?.tierInfo?.totalRevenue || 0;
                const nextTier = group?.tierInfo?.nextTier;
                const packagesNeeded = group?.tierInfo?.packagesNeededForNextTier || 0;

                const nextTierProfitText = nextTier ? `${nextTier.percentage}%` : "Max Tier";
                const untilBonusText = nextTier ? `${packagesNeeded} package${packagesNeeded > 1 ? "s" : ""} until ${nextTier.percentage}% profit bonus` : "Highest profit tier reached! 🎉";
                const progress = nextTier && nextTier.minSalesVolume ? Math.min(100, Math.round((totalPackages / nextTier.minSalesVolume) * 100)) : 100;

                const campaignName = group?.runningCampaign?.name || (group?.runningCampaignId as any)?.name || "No running campaign";

                const formattedGroupObj = {
                    _id: group._id,
                    name: group.name,
                    campaignName,
                    activeSellers: "Active",
                    totalSales: `${totalPackages} package${totalPackages !== 1 ? "s" : ""} (${totalSalesNum.toLocaleString()} SEK)`,
                    nextTierProfit: nextTierProfitText,
                    untilBonus: untilBonusText,
                    progress,
                };

                return <GroupCard key={group._id} group={formattedGroupObj} />;
            })}
        </div>
    );
};

export default GroupCards;
