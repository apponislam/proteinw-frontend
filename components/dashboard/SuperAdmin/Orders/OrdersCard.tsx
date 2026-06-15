"use client";
import React from "react";
import Image from "next/image";
import { 
    useGetOrderStatsQuery, 
    useGetRunningCampaignStatsQuery,
    useGetMemberOrderStatsQuery
} from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

const OrdersCard = () => {
    const user = useAppSelector(currentUser);
    const role = user?.role;

    const { data: superAdminStatsData, isLoading: isSuperAdminLoading } = useGetOrderStatsQuery(undefined, {
        skip: role !== "SUPER_ADMIN",
    });
    const { data: adminStatsData, isLoading: isAdminLoading } = useGetRunningCampaignStatsQuery(undefined, {
        skip: role !== "ADMIN",
    });
    const { data: sellerStatsData, isLoading: isSellerLoading } = useGetMemberOrderStatsQuery(undefined, {
        skip: role !== "SELLER",
    });

    const getStatsData = () => {
        if (role === "SUPER_ADMIN") return { data: superAdminStatsData?.data, loading: isSuperAdminLoading };
        if (role === "ADMIN") return { data: adminStatsData?.data, loading: isAdminLoading };
        return { data: sellerStatsData?.data, loading: isSellerLoading };
    };

    const { data, loading } = getStatsData();
    const stats = data || { totalRevenue: 0, activeOrders: 0, mtdSales: 0 };

    const orderStats = [
        {
            title: "TOTAL REVENUE",
            value: loading ? "..." : `${stats.totalRevenue.toLocaleString()} SEK`,
            subtitle: "",
            color: "#D97706",
        },
        {
            title: "ACTIVE ORDERS",
            value: loading ? "..." : stats.activeOrders.toLocaleString(),
            subtitle: "",
            color: "#D97706",
        },
        {
            title: "Total Sales (MTD)",
            value: loading ? "..." : `${stats.mtdSales.toLocaleString()} SEK`,
            subtitle: "",
            color: "#D97706",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {orderStats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                    <div className="relative z-10">
                        {stat.subtitle && <div className="text-[#D97706] text-sm font-bold mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.subtitle}</div>}
                        <div className="text-3xl font-bold text-[#1A1C1C] mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.value}</div>
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">{stat.title}</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrdersCard;
