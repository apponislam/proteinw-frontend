"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Loader2, Megaphone } from "lucide-react";
import { useGetMyJoinedCampaignsQuery } from "@/redux/features/campaignSeller/campaignSellerApi";
import { TCampaign } from "@/redux/features/campaign/campaignApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

interface CampaignListOrderPageProps {
    onSelectCampaign?: (campaign: TCampaign | null) => void;
    selectedCampaignId?: string;
    placeholder?: string;
}

const CampaignListOrderPage: React.FC<CampaignListOrderPageProps> = ({
    onSelectCampaign,
    selectedCampaignId,
    placeholder = "All Campaigns",
}) => {
    const user = useAppSelector(currentUser);
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [accumulatedCampaigns, setAccumulatedCampaigns] = useState<TCampaign[]>([]);
    const [internalSelectedId, setInternalSelectedId] = useState<string>("");

    const {
        data: response,
        isFetching,
        isLoading,
        isError,
    } = useGetMyJoinedCampaignsQuery(
        {
            page,
            limit: 6,
            status: "ACTIVE",
        },
        {
            skip: !user || user.role !== "SELLER",
        }
    );

    const responseData = response as any;
    const meta = responseData?.meta;
    const hasNextPage = meta?.hasNext || false;

    useEffect(() => {
        const rawList = Array.isArray(responseData)
            ? responseData
            : responseData?.data || [];

        if (rawList.length > 0) {
            const fetchedCampaigns: TCampaign[] = rawList.map((item: any) =>
                item?.campaignId && typeof item.campaignId === "object"
                    ? item.campaignId
                    : item?.campaign && typeof item.campaign === "object"
                    ? item.campaign
                    : item
            );

            if (page === 1) {
                setAccumulatedCampaigns(fetchedCampaigns);
            } else {
                setAccumulatedCampaigns((prev) => {
                    const existingIds = new Set(prev.map((c) => c._id));
                    const filtered = fetchedCampaigns.filter((c) => c._id && !existingIds.has(c._id));
                    return filtered.length > 0 ? [...prev, ...filtered] : prev;
                });
            }
        }
    }, [responseData, page]);

    const activeId = selectedCampaignId !== undefined ? selectedCampaignId : internalSelectedId;
    const currentCampaign = accumulatedCampaigns.find((c) => c._id === activeId);

    const handleSelectAll = () => {
        setInternalSelectedId("");
        if (onSelectCampaign) {
            onSelectCampaign(null);
        }
        setIsOpen(false);
    };

    const handleSelect = (campaign: TCampaign) => {
        if (campaign._id) {
            setInternalSelectedId(campaign._id);
        }
        if (onSelectCampaign) {
            onSelectCampaign(campaign);
        }
        setIsOpen(false);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 30) {
            if (hasNextPage && !isFetching) {
                setPage((prev) => prev + 1);
            }
        }
    };

    if (isLoading && accumulatedCampaigns.length === 0) {
        return (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E7E5E4] rounded-xl text-sm text-[#78716C]">
                <Loader2 className="w-4 h-4 animate-spin text-[#D97706]" />
                <span>Loading campaigns...</span>
            </div>
        );
    }

    if (isError || (accumulatedCampaigns.length === 0 && !isFetching)) {
        return (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E7E5E4] rounded-xl text-sm text-[#78716C]">
                <Megaphone className="w-4 h-4 text-[#A8A29E]" />
                <span>No active campaigns</span>
            </div>
        );
    }

    // Don't render the dropdown if seller has only 1 single campaign
    if (!isFetching && !hasNextPage && accumulatedCampaigns.length === 1) {
        return null;
    }

    return (
        <div className="relative inline-block text-left w-full sm:w-64">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#E7E5E4] hover:border-[#D97706] rounded-xl text-sm font-semibold text-[#1A1C1C] transition-all cursor-pointer shadow-xs"
            >
                <div className="flex items-center gap-2.5 truncate">
                    <Megaphone className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span className="truncate">{currentCampaign?.name || placeholder}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#78716C] transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
                    <div
                        onScroll={handleScroll}
                        className="absolute left-0 mt-2 z-30 w-full bg-white rounded-xl shadow-xl border border-[#E7E5E4] py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-y-auto"
                    >
                        {/* Option 1: All Campaigns */}
                        <button
                            type="button"
                            onClick={handleSelectAll}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[#FCFBFA] transition-colors cursor-pointer ${
                                !activeId ? "font-bold text-[#D97706] bg-[#FFFBEB]" : "text-[#1A1C1C]"
                            }`}
                        >
                            <span className="truncate">All Campaigns</span>
                        </button>

                        {accumulatedCampaigns.map((campaign) => {
                            const isSelected = currentCampaign?._id === campaign._id;
                            return (
                                <button
                                    key={campaign._id}
                                    type="button"
                                    onClick={() => handleSelect(campaign)}
                                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[#FCFBFA] transition-colors cursor-pointer ${
                                        isSelected ? "font-bold text-[#D97706] bg-[#FFFBEB]" : "text-[#1A1C1C]"
                                    }`}
                                >
                                    <span className="truncate">{campaign.name}</span>
                                    {campaign.status && (
                                        <span
                                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ml-2 shrink-0 ${
                                                campaign.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {campaign.status}
                                        </span>
                                    )}
                                </button>
                            );
                        })}

                        {isFetching && (
                            <div className="flex items-center justify-center py-2 gap-2 text-xs text-[#78716C]">
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D97706]" />
                                <span>Loading more...</span>
                            </div>
                        )}

                        {hasNextPage && !isFetching && (
                            <button
                                type="button"
                                onClick={() => setPage((prev) => prev + 1)}
                                className="w-full py-2 text-center text-xs font-semibold text-[#D97706] hover:bg-[#FFFBEB] transition-colors border-t border-[#E7E5E4] cursor-pointer"
                            >
                                Load More Campaigns
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CampaignListOrderPage;
