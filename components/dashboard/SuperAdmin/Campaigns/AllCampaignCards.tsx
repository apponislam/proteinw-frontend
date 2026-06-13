"use client";
import React, { useState } from "react";
import CampaignCard from "./CampaignCard";
import { useGetAllCampaignsWithStatsQuery } from "../../../../redux/features/campaign/campaignApi";
import { TrendingUp } from "lucide-react";

const CampaignCardSkeleton = () => (
    <div className="bg-white p-6 rounded-lg border border-[#E7E5E4] animate-pulse">
        <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-7 w-20 bg-gray-200 rounded-lg" />
        </div>
        <div className="mb-4 space-y-2">
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
        </div>
        <div className="bg-[#F3F3F3] py-4 px-6 rounded-[24px] mb-4 space-y-3">
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-2 w-full bg-gray-200 rounded" />
            <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
            </div>
        </div>
        <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-8 w-16 bg-gray-200 rounded-full" />
        </div>
        <div className="h-10 w-full bg-gray-200 rounded-[24px]" />
    </div>
);

const AllCampaignCards = () => {
    const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all");
    const { data: response, isLoading, isFetching } = useGetAllCampaignsWithStatsQuery({ limit: 100 });

    const campaigns = response?.data || [];

    const filteredCampaigns = campaigns.filter((campaign) => {
        const isExpired = !campaign.isActive || new Date(campaign.endDate).getTime() < new Date().getTime();
        if (activeTab === "all") return true;
        if (activeTab === "active") return !isExpired;
        return isExpired;
    });

    if (isLoading) {
        return (
            <div>
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Active Campaigns</h2>
                            <p className="text-[#78716C] text-sm mt-1">Managing ongoing regional fundraising initiatives</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <CampaignCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#1A1C1C]">Active Campaigns</h2>
                        <p className="text-[#78716C] text-sm mt-1">Managing ongoing regional fundraising initiatives</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setActiveTab("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeTab === "all" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            All
                        </button>
                        <button onClick={() => setActiveTab("active")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeTab === "active" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Active
                        </button>
                        <button onClick={() => setActiveTab("inactive")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeTab === "inactive" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Inactive
                        </button>
                    </div>
                </div>
            </div>

            {filteredCampaigns.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-12 text-center">
                    <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D97706]">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1C1C] mb-2">No campaigns found</h3>
                    <p className="text-sm text-[#78716C]">There are no campaigns matching the current filter.</p>
                </div>
            ) : (
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isFetching ? "opacity-75 pointer-events-none" : ""}`}>
                    {filteredCampaigns.map((campaign) => (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllCampaignCards;
