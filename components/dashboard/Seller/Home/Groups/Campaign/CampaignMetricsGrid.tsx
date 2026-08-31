"use client";

import React from "react";
import Image from "next/image";
import { TCampaign } from "@/redux/features/campaign/campaignApi";
import { TSellerCampaignInfo } from "@/redux/features/dashboard/dashboardApi";
import { Package, Coins, Calendar } from "lucide-react";

interface CampaignMetricsGridProps {
    campaign?: TCampaign;
    campaignInfo?: TSellerCampaignInfo;
}

const CampaignMetricsGrid: React.FC<CampaignMetricsGridProps> = ({ campaign, campaignInfo }) => {
    const myPackagesSold = campaignInfo?.myPackagesSold ?? 0;
    const totalGroupSales = campaignInfo?.totalPackagesSold ?? campaign?.totalPackagesSold ?? 0;
    const profitTierPercentage = campaignInfo?.profitTierPercentage ?? campaign?.currentTier?.percentage ?? 0;
    const nextTierNeeded = campaignInfo?.nextTierPackagesNeeded ?? campaign?.packagesNeededForNextTier ?? 0;

    const myProfit = campaignInfo?.myProfit ?? 0;
    const campaignProfit = campaignInfo?.campaignProfit ?? 0;
    const groupRevenue = campaignInfo?.campaignRevenue ?? campaign?.totalRevenueSold ?? 0;

    const currentStatusStr = campaignInfo?.status || campaign?.status || "DRAFT";
    const daysRemaining = campaignInfo?.daysRemaining ?? (() => {
        if (!campaign?.endDate) return 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const end = new Date(campaign.endDate);
        end.setHours(0, 0, 0, 0);
        return Math.max(0, Math.round((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    })();

    const targetGoal = campaignInfo?.target || campaign?.target || 0;

    const endDateRaw = campaignInfo?.endDate || campaign?.endDate;
    const formattedEndDate = endDateRaw
        ? new Date(endDateRaw).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
          })
        : "N/A";

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* SQUARE 1 */}
            <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] hover:bg-[#FFDEA8] transition-all duration-300 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#F5F5F4] group-hover:border-[#271900]/15 pb-2.5 transition-colors">
                        <div className="text-[#D97706] group-hover:text-[#271900] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors">
                            <Package size={15} />
                            <span>Sales & Profit Tier</span>
                        </div>
                        <span className="bg-amber-50 group-hover:bg-[#271900]/10 text-[#D97706] group-hover:text-[#271900] border border-amber-200/80 px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 transition-colors">
                            {profitTierPercentage}% Tier
                        </span>
                    </div>

                    <div className="space-y-2 pt-0.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Profit Tier</span>
                            <span className="font-bold text-[#D97706] group-hover:text-[#271900] truncate text-right">
                                {profitTierPercentage}% {nextTierNeeded > 0 ? `(${nextTierNeeded} PCS needed)` : "(Top Tier)"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">My Sales</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right">{myPackagesSold} packages</span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Total Campaign Sales</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right">{totalGroupSales} packages</span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={75} height={75} style={{ width: "auto", height: "auto" }} className="block" />
                </div>
            </div>

            {/* SQUARE 2 */}
            <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] hover:bg-[#FFDEA8] transition-all duration-300 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#F5F5F4] group-hover:border-[#271900]/15 pb-2.5 transition-colors">
                        <div className="text-[#D97706] group-hover:text-[#271900] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors">
                            <Coins size={15} />
                            <span>Financial Summary</span>
                        </div>
                    </div>

                    <div className="space-y-2 pt-0.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">My Profit</span>
                            <span className="font-bold text-emerald-700 group-hover:text-[#271900] truncate text-right">
                                {Math.round(myProfit).toLocaleString()} SEK
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Campaign Profit</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right">
                                {Math.round(campaignProfit).toLocaleString()} SEK
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Campaign Revenue</span>
                            <span className="font-bold text-[#D97706] group-hover:text-[#271900] truncate text-right">
                                {Math.round(groupRevenue).toLocaleString()} SEK
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={75} height={75} style={{ width: "auto", height: "auto" }} className="block" />
                </div>
            </div>

            {/* SQUARE 3 */}
            <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] hover:bg-[#FFDEA8] transition-all duration-300 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#F5F5F4] group-hover:border-[#271900]/15 pb-2.5 transition-colors">
                        <div className="text-[#D97706] group-hover:text-[#271900] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors">
                            <Calendar size={15} />
                            <span>Status Information</span>
                        </div>
                        <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border transition-colors ${
                                currentStatusStr === "ACTIVE"
                                    ? "bg-green-50 text-green-700 border-green-200 group-hover:bg-[#271900]/10 group-hover:text-[#271900]"
                                    : currentStatusStr === "COMPLETED"
                                    ? "bg-amber-50 text-amber-900 border-amber-200 group-hover:bg-[#271900]/10 group-hover:text-[#271900]"
                                    : "bg-gray-100 text-gray-700 border-gray-200 group-hover:bg-[#271900]/10 group-hover:text-[#271900]"
                            }`}
                        >
                            {currentStatusStr}
                        </span>
                    </div>

                    <div className="space-y-2 pt-0.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Deadline</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right">
                                {daysRemaining === 0 ? "Ends today" : `${daysRemaining} days left`}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Target Goal</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right">
                                {targetGoal > 0 ? `${targetGoal.toLocaleString()} SEK` : "No goal set"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">End Date</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right">{formattedEndDate}</span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={75} height={75} style={{ width: "auto", height: "auto" }} className="block" />
                </div>
            </div>
        </div>
    );
};

export default CampaignMetricsGrid;
