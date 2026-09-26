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
    const endDateRaw = campaignInfo?.endDate || campaign?.endDate;

    const todayDate = new Date();
    console.log("Today date & time:", todayDate);

    const diffDays = (() => {
        if (!endDateRaw) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const end = new Date(endDateRaw);
        if (isNaN(end.getTime())) return null;
        end.setHours(0, 0, 0, 0);
        return Math.round((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    })();

    const deadlineText =
        diffDays === null
            ? campaignInfo?.daysRemaining !== undefined && campaignInfo.daysRemaining !== null
                ? campaignInfo.daysRemaining < 0
                    ? "Försäljningen avslutad"
                    : campaignInfo.daysRemaining === 0
                      ? "Slutar idag"
                      : `${campaignInfo.daysRemaining} dagar kvar`
                : "Ej tillgänglig"
            : diffDays < 0
              ? "Försäljningen avslutad"
              : diffDays === 0
                ? "Slutar idag"
                : `${diffDays} dagar kvar`;

    const targetGoal = campaignInfo?.target || campaign?.target || 0;

    const formatDateToDMY = (dateInput?: string | Date) => {
        if (!dateInput) return "Ej tillgänglig";
        const d = new Date(dateInput);
        if (isNaN(d.getTime())) return "Ej tillgänglig";
        const day = String(d.getUTCDate()).padStart(2, "0");
        const month = String(d.getUTCMonth() + 1).padStart(2, "0");
        const year = d.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    const formattedEndDate = formatDateToDMY(endDateRaw);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* SQUARE 1 */}
            <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] hover:bg-[#FFDEA8] transition-all duration-300 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#F5F5F4] group-hover:border-[#271900]/15 pb-2.5 transition-colors">
                        <div className="text-[#D97706] group-hover:text-[#271900] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors">
                            <Package size={15} />
                            <span>PAKET SÅLDA & FÖRTJÄNSTNIVÅ</span>
                        </div>
                        <span className="bg-amber-50 group-hover:bg-[#271900]/10 text-[#D97706] group-hover:text-[#271900] border border-amber-200/80 px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 transition-colors">{profitTierPercentage}% Nivå</span>
                    </div>

                    <div className="space-y-2 pt-0.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Förtjänstnivå</span>
                            <span className="font-bold text-[#D97706] group-hover:text-[#271900] text-right truncate min-w-0 max-w-[70%]" title={`${profitTierPercentage}% ${nextTierNeeded > 0 ? `(${nextTierNeeded} paket till nästa förtjänstnivå)` : "(Högsta nivån)"}`}>
                                {profitTierPercentage}% {nextTierNeeded > 0 ? `(${nextTierNeeded} paket till nästa förtjänstnivå)` : "(Högsta nivån)"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Mina paket sålda</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right" title={`${myPackagesSold} st`}>
                                {myPackagesSold} st
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Totalt antal paket sålda</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right" title={`${totalGroupSales} st`}>
                                {totalGroupSales} st
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={75} height={75} style={{ width: "auto", height: "auto" }} className="block" loading="eager" />
                </div>
            </div>

            {/* SQUARE 2 */}
            <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] hover:bg-[#FFDEA8] transition-all duration-300 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#F5F5F4] group-hover:border-[#271900]/15 pb-2.5 transition-colors">
                        <div className="text-[#D97706] group-hover:text-[#271900] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors">
                            <Coins size={15} />
                            <span>Ekonomisk översikt</span>
                        </div>
                    </div>

                    <div className="space-y-2 pt-0.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Min förtjänst</span>
                            <span className="font-bold text-emerald-700 group-hover:text-[#271900] truncate text-right" title={`${Math.round(myProfit).toLocaleString()} SEK`}>
                                {Math.round(myProfit).toLocaleString()} SEK
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Total omsättning</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right" title={`${Math.round(campaignProfit).toLocaleString()} SEK`}>
                                {Math.round(campaignProfit).toLocaleString()} SEK
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Total förtjänst</span>
                            <span className="font-bold text-[#D97706] group-hover:text-[#271900] truncate text-right" title={`${Math.round(groupRevenue).toLocaleString()} SEK`}>
                                {Math.round(groupRevenue).toLocaleString()} SEK
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={75} height={75} style={{ width: "auto", height: "auto" }} className="block" loading="eager" />
                </div>
            </div>

            {/* SQUARE 3 */}
            <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] hover:bg-[#FFDEA8] transition-all duration-300 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#F5F5F4] group-hover:border-[#271900]/15 pb-2.5 transition-colors">
                        <div className="text-[#D97706] group-hover:text-[#271900] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors">
                            <Calendar size={15} />
                            <span>Statusinformation</span>
                        </div>
                        {(() => {
                            const statusStyle =
                                currentStatusStr === "ACTIVE"
                                    ? { bg: "bg-green-100", text: "text-green-800", border: "border-green-300", dot: "bg-green-500", label: "AKTIV" }
                                    : currentStatusStr === "FULFILMENT"
                                      ? { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300", dot: "bg-blue-500", label: "LEVERANSFAS" }
                                      : currentStatusStr === "COMPLETED"
                                        ? { bg: "bg-amber-100", text: "text-amber-900", border: "border-amber-300", dot: "bg-amber-600", label: "AVSLUTAD" }
                                        : { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300", dot: "bg-gray-500", label: "UTKAST" };

                            return (
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} shrink-0`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
                                    <span>{statusStyle.label}</span>
                                </span>
                            );
                        })()}
                    </div>

                    <div className="space-y-2 pt-0.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Sista dag</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right" title={deadlineText}>
                                {deadlineText}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Mål</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right" title={targetGoal > 0 ? `${targetGoal.toLocaleString()} SEK` : "Inget mål angivet"}>
                                {targetGoal > 0 ? `${targetGoal.toLocaleString()} SEK` : "Inget mål angivet"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm group-hover:text-[#271900] transition-colors gap-2">
                            <span className="text-[#78716C] group-hover:text-[#271900]/80 font-medium shrink-0">Slutdatum</span>
                            <span className="font-bold text-[#1A1C1C] group-hover:text-[#271900] truncate text-right" title={formattedEndDate}>
                                {formattedEndDate}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={75} height={75} style={{ width: "auto", height: "auto" }} className="block" loading="eager" />
                </div>
            </div>
        </div>
    );
};

export default CampaignMetricsGrid;
