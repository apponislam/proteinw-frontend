"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useGetRunningCampaignForSellerQuery } from "@/redux/features/campaign/campaignApi";
import CampaignCard from "./CampaignCard";
import Pagination from "@/components/dashboard/Pagination";

const CampaignLists = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState<"ALL" | "ACTIVE" | "FULFILMENT" | "COMPLETED">("ALL");

    const statusParam = activeTab !== "ALL" ? activeTab : undefined;

    const { data: campaignResponse, isLoading } = useGetRunningCampaignForSellerQuery(
        { groupId: id, page, limit: 9, status: statusParam },
        { skip: !id }
    );

    const campaignsList = campaignResponse?.data || [];
    const pagination = campaignResponse?.meta || { page: 1, limit: 9, total: 0, totalPages: 1 };

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#78716C] text-sm">Loading campaign details...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="p-2 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-all cursor-pointer shadow-xs text-stone-700 hover:text-stone-900 shrink-0"
                            title="Go Back"
                        >
                            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-[#1A1C1C]">Group Campaigns</h2>
                            <p className="text-[#78716C] text-xs sm:text-sm mt-0.5 sm:mt-1">Fundraising campaigns running for your group</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto overflow-x-auto scrollbar-none flex items-center gap-1.5 sm:gap-2 pb-1 sm:pb-0">
                        <button
                            type="button"
                            onClick={() => { setActiveTab("ALL"); setPage(1); }}
                            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeTab === "ALL" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}
                        >
                            All
                        </button>
                        <button
                            type="button"
                            onClick={() => { setActiveTab("ACTIVE"); setPage(1); }}
                            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeTab === "ACTIVE" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}
                        >
                            Active
                        </button>
                        <button
                            type="button"
                            onClick={() => { setActiveTab("FULFILMENT"); setPage(1); }}
                            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeTab === "FULFILMENT" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}
                        >
                            Fulfilment
                        </button>
                        <button
                            type="button"
                            onClick={() => { setActiveTab("COMPLETED"); setPage(1); }}
                            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeTab === "COMPLETED" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}
                        >
                            Completed
                        </button>
                    </div>
                </div>
            </div>

            {campaignsList.length === 0 ? (
                <div className="text-center py-12 text-[#78716C] text-sm">
                    No campaigns found matching your selection.
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                        {campaignsList.map((campaign) => {
                            const isCampaignActive = campaign.status === "ACTIVE";
                            const daysLeftNum = campaign.endDate
                                ? (() => {
                                      const now = new Date();
                                      const end = new Date(campaign.endDate);
                                      const nowStart = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
                                      const endStart = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
                                      return Math.max(0, Math.round((endStart - nowStart) / (1000 * 60 * 60 * 24)));
                                  })()
                                : 0;
                            const totalRevenue = campaign.totalRevenueSold || 0;
                            const target = campaign.target || 1;
                            const progress = Math.min(100, Math.round((totalRevenue / target) * 100));

                            return (
                                <CampaignCard
                                    key={campaign._id}
                                    id={campaign._id}
                                    title={campaign.name}
                                    description={campaign.shortDescription || "No description provided."}
                                    status={isCampaignActive ? "ACTIVE" : "INACTIVE"}
                                    progress={progress}
                                    goal={`${target.toLocaleString()} SEK`}
                                    raised={`${totalRevenue.toLocaleString()} SEK`}
                                    daysLeft={daysLeftNum > 0 ? `Deadline: In ${daysLeftNum} days` : "Campaign has ended"}
                                    campaigns={[campaign.name.charAt(0)]}
                                    onViewDetails={() => {
                                        router.push(`/dashboard/seller/group/${id}/${campaign._id}`);
                                    }}
                                />
                            );
                        })}
                    </div>

                    <Pagination meta={pagination} onPageChange={setPage} itemName="CAMPAIGNS" />
                </>
            )}
        </div>
    );
};

export default CampaignLists;
