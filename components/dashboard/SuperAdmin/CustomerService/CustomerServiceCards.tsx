"use client";
import React from "react";
import Image from "next/image";
import { useGetCustomerServiceStatsQuery } from "@/redux/features/customerService/customerServiceApi";

interface CustomerServiceCardsProps {
    totalRequests?: number;
    pendingCount?: number;
    inProgressCount?: number;
    resolvedCount?: number;
}

const CustomerServiceCards: React.FC<CustomerServiceCardsProps> = ({
    totalRequests = 0,
    pendingCount = 0,
    inProgressCount = 0,
    resolvedCount = 0,
}) => {
    const { data: statsData, isLoading } = useGetCustomerServiceStatsQuery();
    const stats = statsData?.data || {
        totalRequests,
        pendingCount,
        inProgressCount,
        resolvedCount,
        rejectedCount: 0,
        reklamationCount: 0,
        byteCount: 0,
    };

    const cardStats = [
        {
            title: "TOTAL REQUESTS",
            value: isLoading ? "..." : stats.totalRequests.toLocaleString(),
            subtitle: "ALL TIME",
            color: "#D97706",
        },
        {
            title: "PENDING CLAIMS",
            value: isLoading ? "..." : stats.pendingCount.toLocaleString(),
            subtitle: "ACTION REQUIRED",
            color: "#D97706",
        },
        {
            title: "IN PROGRESS",
            value: isLoading ? "..." : stats.inProgressCount.toLocaleString(),
            subtitle: "UNDER REVIEW",
            color: "#D97706",
        },
        {
            title: "RESOLVED CLAIMS",
            value: isLoading ? "..." : stats.resolvedCount.toLocaleString(),
            subtitle: "COMPLETED",
            color: "#D97706",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cardStats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer"
                >
                    <div className="relative z-10">
                        {stat.subtitle && (
                            <div className="text-[#D97706] text-xs font-bold mb-2 group-hover:text-[#271900] transition-colors duration-300 tracking-wider">
                                {stat.subtitle}
                            </div>
                        )}
                        <div className="text-3xl font-bold text-[#1A1C1C] mb-2 group-hover:text-[#271900] transition-colors duration-300">
                            {stat.value}
                        </div>
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">
                            {stat.title}
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomerServiceCards;
