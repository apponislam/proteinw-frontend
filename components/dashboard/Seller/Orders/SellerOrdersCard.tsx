"use client";
import React from "react";
import Image from "next/image";
import { useGetMemberOrderStatsQuery } from "@/redux/features/order/orderApi";

interface SellerOrdersCardProps {
    campaignId?: string;
}

const SellerOrdersCard: React.FC<SellerOrdersCardProps> = ({ campaignId }) => {
    const { data: sellerStatsData, isLoading } = useGetMemberOrderStatsQuery({ campaignId });

    const stats = sellerStatsData?.data || { totalRevenue: 0, activeOrders: 0, mtdSales: 0 };

    const orderStats = [
        {
            title: "MY TOTAL REVENUE",
            value: isLoading ? "..." : `${stats.totalRevenue.toLocaleString()} SEK`,
            subtitle: "",
            color: "#D97706",
        },
        {
            title: "MY ACTIVE ORDERS",
            value: isLoading ? "..." : stats.activeOrders.toLocaleString(),
            subtitle: "",
            color: "#D97706",
        },
        {
            title: "MY SALES (MTD)",
            value: isLoading ? "..." : `${stats.mtdSales.toLocaleString()} SEK`,
            subtitle: "",
            color: "#D97706",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
            {orderStats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                    <div className="relative z-10">
                        {stat.subtitle && <div className="text-[#D97706] text-sm font-bold mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.subtitle}</div>}
                        <div className="text-3xl font-bold text-[#1A1C1C] mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.value}</div>
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">{stat.title}</div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SellerOrdersCard;
