"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CampaignCard from "./CampaignCard";
import { useGetAllCampaignsWithStatsQuery } from "../../../../redux/features/campaign/campaignApi";
import { TrendingUp } from "lucide-react";
import Pagination from "../../Pagination";

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

type TTabFilter = "ALL" | "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED";

const AllCampaignCards = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Read current status from URL search params
    const statusQuery = searchParams.get("status")?.toUpperCase();
    const pageQuery = Number(searchParams.get("page")) || 1;

    const validStatuses: TTabFilter[] = ["DRAFT", "ACTIVE", "FULFILMENT", "COMPLETED"];
    const activeTab: TTabFilter = validStatuses.includes(statusQuery as TTabFilter) ? (statusQuery as TTabFilter) : "ALL";

    const limit = 9;
    const statusParam = activeTab !== "ALL" ? activeTab : undefined;

    const { data: response, isLoading, isFetching } = useGetAllCampaignsWithStatsQuery({
        page: pageQuery,
        limit,
        status: statusParam,
    });

    const campaigns = response?.data || [];
    const meta = response?.meta;

    const handleTabChange = (tab: TTabFilter) => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab === "ALL") {
            params.delete("status");
        } else {
            params.set("status", tab);
        }
        params.set("page", "1");
        router.push(`/dashboard/campaigns?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.push(`/dashboard/campaigns?${params.toString()}`);
    };

    if (isLoading) {
        return (
            <div>
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-[#1A1C1C]">All Campaigns</h2>
                            <p className="text-[#78716C] text-sm mt-1">Explore and manage regional fundraising initiatives</p>
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
            <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#1A1C1C]">All Campaigns</h2>
                        <p className="text-[#78716C] text-xs sm:text-sm mt-0.5 sm:mt-1">Explore and manage regional fundraising initiatives</p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                        <button type="button" onClick={() => handleTabChange("ALL")} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeTab === "ALL" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            All
                        </button>
                        <button type="button" onClick={() => handleTabChange("DRAFT")} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeTab === "DRAFT" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Draft
                        </button>
                        <button type="button" onClick={() => handleTabChange("ACTIVE")} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeTab === "ACTIVE" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Active
                        </button>
                        <button type="button" onClick={() => handleTabChange("FULFILMENT")} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeTab === "FULFILMENT" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Fulfilment
                        </button>
                        <button type="button" onClick={() => handleTabChange("COMPLETED")} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeTab === "COMPLETED" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Completed
                        </button>
                    </div>
                </div>
            </div>

            {campaigns.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-8 sm:p-12 text-center">
                    <div className="h-10 sm:h-12 w-10 sm:w-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-[#D97706]">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1C1C] mb-1 sm:mb-2">No campaigns found</h3>
                    <p className="text-xs sm:text-sm text-[#78716C]">There are no campaigns matching the current filter.</p>
                </div>
            ) : (
                <>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${isFetching ? "opacity-75" : ""}`}>
                        {campaigns.map((campaign) => (
                            <CampaignCard key={campaign._id} campaign={campaign} />
                        ))}
                    </div>

                    {/* Pagination Component */}
                    <div className="mt-6 sm:mt-8">
                        <Pagination meta={meta} onPageChange={handlePageChange} itemName="CAMPAIGNS" />
                    </div>
                </>
            )}
        </div>
    );
};

export default AllCampaignCards;
