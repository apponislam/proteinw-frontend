"use client";

import React from "react";
import Image from "next/image";
import { useGetSellerDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";

interface SellerAdminStatsSectionProps {
    campaignId?: string;
}

const SellerAdminStatsSection: React.FC<SellerAdminStatsSectionProps> = ({ campaignId }) => {
    // SINGLE API CALL FOR BOTH HOME CARDS AND FUNDRAISING TARGET
    const { data: response, isLoading } = useGetSellerDashboardStatsQuery(campaignId);

    const statsData = response?.data || {
        totalSales: 0,
        totalProfit: 0,
        packagesSold: 0,
        daysRemaining: 0,
        goal: 0,
        current: 0,
        remaining: 0,
        shortDescription: "",
    };

    const totalSales = statsData.current ?? statsData.totalSales ?? 0;
    const goal = statsData.goal ?? 0;
    const remaining = statsData.remaining ?? Math.max(0, goal - totalSales);
    const progressPercent = goal > 0 ? Math.min(Math.round((totalSales / goal) * 100), 100) : 0;

    const cards = [
        { label: "Total Sales", value: isLoading ? "..." : `${(statsData.totalSales ?? 0).toLocaleString()} SEK`, icon: "/dashboard/selleradmindashicon1.svg" },
        { label: "Total Profit", value: isLoading ? "..." : `${(statsData.totalProfit ?? 0).toLocaleString()} SEK`, icon: "/dashboard/selleradmindashicon2.svg" },
        { label: "Packages Sold", value: isLoading ? "..." : `${(statsData.packagesSold ?? 0).toLocaleString()} Units`, icon: "/dashboard/selleradmindashicon3.svg" },
        { label: "Days Remaining", value: isLoading ? "..." : `${statsData.daysRemaining ?? 0} Days`, icon: "/dashboard/selleradmindashicon4.svg" },
    ];

    return (
        <div className="space-y-8">
            {/* Top Stat Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                        <div className="relative z-10">
                            <div className="mb-4">
                                <Image src={stat.icon} alt={stat.label} width={40} height={40} style={{ width: "auto", height: "auto" }} />
                            </div>
                            <div className="text-[#78716C] group-hover:text-[#271900] text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">{stat.label}</div>
                            <div className="text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{stat.value}</div>
                        </div>
                        <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Fundraising Progress Card */}
            <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-[#78716C] text-sm font-medium uppercase tracking-wider mb-2 group-hover:text-[#271900] transition-colors duration-300">Fundraising Progress</h3>
                            <p className="text-[#78716C] text-lg group-hover:text-[#271900] transition-colors duration-300">
                                {isLoading ? "Loading progress details..." : `Targeting ${statsData.shortDescription || "the fundraising goal"} of ${goal.toLocaleString()} SEK`}
                            </p>
                        </div>
                        <div className="text-6xl font-bold text-[#D97706] mb-2 group-hover:text-[#7C5800] transition-colors duration-300">
                            {isLoading ? "..." : `${progressPercent}%`}
                        </div>
                    </div>

                    <div className="w-full h-4 bg-[#E7E5E4] rounded-full overflow-hidden mb-6">
                        <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <div className="text-[#78716C] text-xs uppercase tracking-wider mb-1 group-hover:text-[#271900] transition-colors duration-300">CURRENT</div>
                            <div className="text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">
                                {isLoading ? "..." : `${totalSales.toLocaleString()} SEK`}
                            </div>
                        </div>
                        <div>
                            <div className="text-[#78716C] text-xs uppercase tracking-wider mb-1 group-hover:text-[#271900] transition-colors duration-300">GOAL</div>
                            <div className="text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">
                                {isLoading ? "..." : `${goal.toLocaleString()} SEK`}
                            </div>
                        </div>
                        <div>
                            <div className="text-[#78716C] text-xs uppercase tracking-wider mb-1 group-hover:text-[#271900] transition-colors duration-300">REMAINING</div>
                            <div className="text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">
                                {isLoading ? "..." : `${remaining.toLocaleString()} SEK`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAdminStatsSection;
