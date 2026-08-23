"use client";

import React from "react";
import Image from "next/image";
import { useGetActiveCampaignsOverviewQuery } from "@/redux/features/dashboard/dashboardApi";

const CampaignsOverviewCards = () => {
    const { data: response, isLoading } = useGetActiveCampaignsOverviewQuery();
    const overview = response?.data || { totalGoal: 0, activeCampaigns: 0, totalSold: 0 };

    const campaignStats = [
        {
            title: "TOTAL GOAL",
            value: isLoading ? "..." : `SEK ${(overview.totalGoal || 0).toLocaleString()}`,
            color: "#D97706",
        },
        {
            title: "ACTIVE CAMPAIGNS",
            value: isLoading ? "..." : (overview.activeCampaigns || 0).toLocaleString(),
            color: "#D97706",
        },
        {
            title: "TOTAL SOLD",
            value: isLoading ? "..." : `SEK ${(overview.totalSold || 0).toLocaleString()}`,
            color: "#D97706",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {campaignStats.map((stat, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                    <div className="relative z-10">
                        <div className="text-2xl sm:text-3xl font-bold text-[#1A1C1C] mb-1 sm:mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.value}</div>
                        <div className="text-[#78716C] text-[10px] sm:text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">{stat.title}</div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CampaignsOverviewCards;
