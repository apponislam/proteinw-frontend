"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetRunningCampaignByGroupQuery } from "@/redux/features/campaign/campaignApi";
import CampaignCard from "./CampaignCard";

const CampaignLists = () => {
    const params = useParams();
    const id = params?.id as string;

    const { data: campaignResponse, isLoading } = useGetRunningCampaignByGroupQuery(id, {
        skip: !id,
    });

    const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all");

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#78716C] text-sm">Loading campaign details...</p>
            </div>
        );
    }

    const campaign = campaignResponse?.data;

    if (!campaign) {
        return (
            <div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#1A1C1C]">Group Campaigns</h2>
                    <p className="text-[#78716C] text-sm mt-1">No active campaign assigned to this group yet.</p>
                </div>
            </div>
        );
    }

    const isCampaignActive = campaign.isActive;
    const daysLeftNum = campaign.endDate 
        ? Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : 0;

    // Filter by tab
    const showCampaign = 
        activeTab === "all" || 
        (activeTab === "active" && isCampaignActive) || 
        (activeTab === "inactive" && !isCampaignActive);

    // Calculate progress towards campaign target (in SEK)
    const totalRevenue = campaign.totalRevenueSold || 0;
    const target = campaign.target || 1;
    const progress = Math.min(100, Math.round((totalRevenue / target) * 100));

    return (
        <div>
            <div className="mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#1A1C1C]">Group Campaigns</h2>
                        <p className="text-[#78716C] text-sm mt-1">Fundraising campaigns running for your group</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setActiveTab("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "all" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            All
                        </button>
                        <button onClick={() => setActiveTab("active")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "active" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Active
                        </button>
                        <button onClick={() => setActiveTab("inactive")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "inactive" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Inactive
                        </button>
                    </div>
                </div>
            </div>
            
            {showCampaign ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CampaignCard 
                        title={campaign.name} 
                        description={campaign.shortDescription || "No description provided."} 
                        status={isCampaignActive ? "ACTIVE" : "INACTIVE"} 
                        progress={progress} 
                        goal={`${target.toLocaleString()} SEK`} 
                        raised={`${totalRevenue.toLocaleString()} SEK`} 
                        daysLeft={daysLeftNum > 0 ? `Deadline: In ${daysLeftNum} days` : "Campaign has ended"}
                        campaigns={[campaign.name.charAt(0)]}
                    />
                </div>
            ) : (
                <div className="text-center py-12 text-[#78716C]">
                    No campaigns found matching your tab filter.
                </div>
            )}
        </div>
    );
};

export default CampaignLists;
