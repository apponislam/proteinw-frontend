import React from "react";
import Image from "next/image";
import { useGetSellerDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";

const SellerHomeCards = () => {
    const { data: response, isLoading } = useGetSellerDashboardStatsQuery();

    const statsData = response?.data || {
        totalSales: 0,
        packagesSold: 0,
        daysRemaining: 0,
    };

    const stats = [
        { label: "Total Sales", value: isLoading ? "..." : `${statsData.totalSales.toLocaleString()} SEK` },
        { label: "Packages Sold", value: isLoading ? "..." : `${statsData.packagesSold.toLocaleString()} Units` },
        { label: "Days Remaining", value: isLoading ? "..." : `${statsData.daysRemaining} Days` },
    ];

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">{stat.label}</div>
                        <div className="text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{stat.value}</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SellerHomeCards;
