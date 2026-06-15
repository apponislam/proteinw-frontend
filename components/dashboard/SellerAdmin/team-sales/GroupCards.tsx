"use client";

import React, { useState } from "react";
import GroupCard from "./GroupCard";
import CreateGroupModal from "./CreateGroupModal";
import { useGetMyGroupQuery } from "@/redux/features/group/groupApi";
import { useGetRunningCampaignStatsQuery } from "@/redux/features/order/orderApi";

const GroupCards = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: myGroupData, isLoading: isGroupLoading } = useGetMyGroupQuery();
    const { data: statsData, isLoading: isStatsLoading } = useGetRunningCampaignStatsQuery(undefined, {
        skip: !myGroupData?.data?._id,
    });

    const isLoading = isGroupLoading || isStatsLoading;
    const group = myGroupData?.data;
    const stats = statsData?.data;

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#78716C] text-sm">Loading your group information...</p>
            </div>
        );
    }

    const totalSalesNum = stats?.totalRevenue || 0;
    const totalPackages = group?.tierInfo?.totalPackagesSold || 0;
    const nextTier = group?.tierInfo?.nextTier;
    const packagesNeeded = group?.tierInfo?.packagesNeededForNextTier || 0;

    const nextTierProfitText = nextTier 
        ? `${nextTier.percentage}%` 
        : "Max Tier";
    
    const untilBonusText = nextTier 
        ? `${packagesNeeded} package${packagesNeeded > 1 ? "s" : ""} until ${nextTier.percentage}% profit bonus`
        : "Highest profit tier reached! 🎉";

    return (
        <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group ? (
                    <GroupCard 
                        className="" 
                        id={group._id || ""}
                        name={group.name} 
                        campaignName={(group.runningCampaignId as any)?.name || "No active campaign"} 
                        activeSellers="Active" 
                        totalSales={`${totalPackages} package${totalPackages !== 1 ? "s" : ""} (${totalSalesNum.toLocaleString()} SEK)`} 
                        nextTierProfit={nextTierProfitText} 
                        untilBonus={untilBonusText} 
                    />
                ) : (
                    <div className="col-span-full bg-white p-8 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] text-center text-[#78716C]">
                        You are not assigned to any group yet. Click below to start a new group!
                    </div>
                )}
                
                {!group && (
                    <button onClick={() => setIsModalOpen(true)} className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group flex flex-col justify-center items-center text-center min-h-[250px]">
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300 mb-2">Start New Group</h3>
                            <p className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">Add your next class or team</p>
                        </div>
                    </button>
                )}
            </div>

            <CreateGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default GroupCards;
