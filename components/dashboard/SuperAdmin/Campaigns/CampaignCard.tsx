"use client";

import React, { useState } from "react";
import { TCampaign, useUpdateCampaignStatusMutation } from "../../../../redux/features/campaign/campaignApi";
import Link from "next/link";
import { ChevronDown, Check, Calendar } from "lucide-react";

interface CampaignCardProps {
    campaign: TCampaign;
}

const statusOptions: { value: "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED"; label: string; bg: string; text: string; dot: string }[] = [
    { value: "DRAFT", label: "DRAFT", bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
    { value: "ACTIVE", label: "ACTIVE", bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    { value: "FULFILMENT", label: "FULFILMENT", bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
    { value: "COMPLETED", label: "COMPLETED", bg: "bg-[#FFDEA8]", text: "text-amber-900", dot: "bg-amber-600" },
];

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
    const [updateCampaignStatus, { isLoading: isUpdating }] = useUpdateCampaignStatusMutation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const progress = campaign.target > 0 ? Math.min(100, Math.round(((campaign.totalRevenueSold || 0) / campaign.target) * 100)) : 0;
    const currentStatusStr = campaign.status || "DRAFT";
    const currentOption = statusOptions.find((opt) => opt.value === currentStatusStr) || statusOptions[0];

    const handleStatusSelect = async (status: "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED") => {
        if (!campaign._id || status === currentStatusStr) {
            setIsDropdownOpen(false);
            return;
        }
        try {
            await updateCampaignStatus({ campaignId: campaign._id, status }).unwrap();
        } catch (error) {
            console.error("Failed to update campaign status:", error);
        } finally {
            setIsDropdownOpen(false);
        }
    };

    const renderCampaignStatus = (endDateStr: Date | string, status?: string) => {
        const endDate = new Date(endDateStr);
        const today = new Date();

        const formattedEndDate = endDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            timeZone: "UTC",
        });

        const isEnded = status === "FULFILMENT" || status === "COMPLETED";

        if (isEnded) {
            return (
                <div className="w-full flex items-center justify-between text-xs font-semibold">
                    <div className="text-red-500 font-bold flex items-center gap-1.5">
                        <Calendar size={15} className="shrink-0" />
                        <span>Campaign Ended</span>
                    </div>
                </div>
            );
        }

        const todayStart = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
        const endStart = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());
        const diffDays = Math.max(0, Math.round((endStart - todayStart) / (1000 * 60 * 60 * 24)));
        const daysText = diffDays === 0 ? "Ends today" : `Deadline: In ${diffDays} days`;

        return (
            <div className="w-full flex items-center justify-between text-xs text-[#78716C] font-semibold">
                <span className="group-hover:text-[#271900] transition-colors duration-300 flex items-center gap-1.5">
                    <Calendar size={15} className="text-[#D97706] shrink-0" />
                    <span>{daysText}</span>
                </span>
                <span className="text-[#1A1C1C] group-hover:text-[#271900] transition-colors font-bold">{formattedEndDate}</span>
            </div>
        );
    };

    // const isEndedOrInactive = campaign.status === "FULFILMENT" || campaign.status === "COMPLETED" || new Date(campaign.endDate).getTime() < new Date().getTime();

    return (
        <div className="flex flex-col justify-between h-full bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col">
                {/* Header Status Badge */}
                <div className="mb-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${currentOption.bg} ${currentOption.text}`}>
                        <span className={`w-2 h-2 rounded-full ${currentOption.dot}`}></span>
                        {currentOption.label}
                    </span>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{campaign.name}</h3>
                    <p className="text-[#78716C] text-sm mt-1 group-hover:text-[#271900] transition-colors duration-300">{campaign.shortDescription}</p>
                </div>

                {/* Commented out original progress target box */}
                {/* 
                <div className="bg-[#F3F3F3] py-4 px-6 rounded-[24px] mb-4">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">Progress</span>
                            <span className="text-[#D97706] font-bold">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
                            <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">SOLD</div>
                            <div className="text-[#D97706] font-bold text-lg">SEK {(campaign.totalRevenueSold || 0).toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300 text-right">TARGET</div>
                            <div className="text-[#1A1C1C] font-bold text-lg group-hover:text-[#271900] transition-colors duration-300 text-right">SEK {(campaign.target || 0).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
                */}

                {/* Tier Progress Details Box */}
                <div className="bg-[#F3F3F3] py-4 px-6 rounded-[24px] mb-4">
                    {(() => {
                        const totalSold = campaign.totalPackagesSold || 0;
                        const nextMin = campaign.nextTier?.minSalesVolume || (campaign.currentTier?.maxSalesVolume ? campaign.currentTier.maxSalesVolume + 1 : 150);
                        const currentMin = campaign.currentTier?.minSalesVolume || 0;
                        const range = Math.max(1, nextMin - currentMin);
                        const progressPct = campaign.nextTier ? Math.min(100, Math.max(0, Math.round(((totalSold - currentMin) / range) * 100))) : 100;

                        return (
                            <>
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">Tier Progress</span>
                                        <span className="text-[#D97706] font-bold">{progressPct}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
                                        <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300 uppercase">CURRENT TIER</div>
                                        <div className="text-[#D97706] font-bold text-base truncate" title={campaign.currentTier?.name || "No Tier"}>
                                            {campaign.currentTier ? `${campaign.currentTier.percentage}%` : "0%"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300 text-right uppercase">NEXT TIER NEEDED</div>
                                        <div className="text-[#1A1C1C] font-bold text-base group-hover:text-[#271900] transition-colors duration-300 text-right">
                                            {campaign.nextTier ? (
                                                <>
                                                    {campaign.packagesNeededForNextTier || 0} PKGS <span className="text-[#D97706] font-bold">({campaign.nextTier.percentage}%)</span>
                                                </>
                                            ) : (
                                                "MAX TIER"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </div>

                <div className="mb-2 min-h-10 flex items-center">{renderCampaignStatus(campaign.endDate, campaign.status)}</div>
            </div>

            {/* Bottom Actions Row */}
            <div className="relative z-10 mt-auto flex items-center gap-3">
                <Link
                    href={`/dashboard/campaigns/${campaign._id}`}
                    className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-4 py-2.5 text-sm font-bold text-white shadow-xs hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none"
                >
                    Manage Campaign
                </Link>

                {/* Status Dropdown Picker for SuperAdmin */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen((prev) => !prev);
                        }}
                        disabled={isUpdating}
                        className={`h-10 px-3 rounded-full text-xs font-semibold cursor-pointer transition-all border border-stone-200 hover:border-amber-400 flex items-center gap-1.5 ${currentOption.bg} ${currentOption.text}`}
                        title="Update Campaign Status"
                    >
                        <span className={`w-2 h-2 rounded-full ${currentOption.dot} ${isUpdating ? "animate-ping" : ""}`}></span>
                        <span>{isUpdating ? "..." : currentOption.label}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)}></div>
                            <div className="absolute right-0 bottom-12 z-30 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                {statusOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStatusSelect(opt.value);
                                        }}
                                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors text-left cursor-pointer hover:bg-amber-50 ${currentStatusStr === opt.value ? "bg-amber-50 text-[#D97706] font-bold" : "text-stone-700"}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${opt.dot}`}></span>
                                            <span>{opt.label}</span>
                                        </div>
                                        {currentStatusStr === opt.value && <Check size={14} className="text-[#D97706]" />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
