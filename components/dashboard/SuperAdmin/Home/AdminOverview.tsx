"use client";

import React from "react";
import Image from "next/image";
import OverviewReport from "./OverviewReport";
import { useGetDashboardStatsQuery } from "../../../../redux/features/dashboard/dashboardApi";

import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

const AdminOverview = () => {
    const user = useAppSelector(currentUser);
    const { data: statsData, isLoading } = useGetDashboardStatsQuery();
    const stats = {
        totalPackagesSold: statsData?.totalPackagesSold ?? 0,
        packageGrowth: statsData?.packageGrowth ?? 0,
        topCategory: statsData?.topCategory ?? "N/A",
        totalAdmins: statsData?.totalAdmins ?? 0,
        totalSellers: statsData?.totalSellers ?? 0,
        totalGroups: statsData?.totalGroups ?? 0,
        activeCampaigns: statsData?.activeCampaigns ?? 0,
        totalOrders: statsData?.totalOrders ?? 0,
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1A1C1C] mb-2 sm:mb-3">Welcome back, {user?.name || "Admin"}.</h1>
                <p className="text-[#78716C] text-sm sm:text-base lg:text-lg">Kungsbjörnen is currently hosting {isLoading ? "..." : stats.activeCampaigns.toLocaleString()} active campaigns across the Nordic region.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Box 1 (takes 2x2 on lg) - Grand Scale Impact */}
                <div className="sm:col-span-2 lg:row-span-2 bg-white p-5 sm:p-6 rounded-xl shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] flex flex-col justify-between relative overflow-hidden cursor-pointer min-h-55 sm:min-h-65">
                    <div className="absolute right-0 bottom-0 h-full w-48 sm:w-72 lg:w-80 pointer-events-none opacity-40 sm:opacity-90">
                        <Image src="/dashboard/superadmin/admindashhome.png" alt="" width={300} height={300} className="w-full h-full object-cover object-bottom-right" priority />
                        <div className="absolute inset-0 bg-linear-to-l from-transparent via-white/50 to-white"></div>
                    </div>
                    <div className="relative z-10 flex flex-col justify-between h-full w-full sm:w-3/5 lg:w-1/2 gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#D97706] text-xs sm:text-sm font-semibold uppercase tracking-wider">GRAND SCALE IMPACT</span>
                            </div>
                            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1C1C] my-1 sm:my-2">{isLoading ? "..." : stats.totalPackagesSold.toLocaleString()}</div>
                            <div className="text-[#78716C] text-sm sm:text-base lg:text-[18px]">Total Packages Sold</div>
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="flex items-center gap-2 bg-[#7C58000D] text-[#7C5800] px-3 sm:px-4 py-1 rounded-[16px] text-xs font-semibold">
                                    <p>{isLoading ? "..." : `${stats.packageGrowth > 0 ? "+" : ""}${stats.packageGrowth}% vs last month`}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-[#00687B0D] text-[#00687B] px-3 sm:px-4 py-1 rounded-[16px] text-xs font-semibold">
                                    <p>Top Category: {isLoading ? "..." : stats.topCategory}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Box 2 - Total Sellers */}
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">TOTAL SELLERS</div>
                        <div className="text-2xl sm:text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-2 sm:mb-3 transition-colors duration-300">{isLoading ? "..." : stats.totalSellers.toLocaleString()}</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm transition-colors duration-300">Active sellers in the Nordic region.</div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>

                {/* Box 3 - Total Orders */}
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">TOTAL ORDERS</div>
                        <div className="text-2xl sm:text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-2 sm:mb-3 transition-colors duration-300">{isLoading ? "..." : stats.totalOrders.toLocaleString()}</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm transition-colors duration-300">Total orders processed in the total archive.</div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>

                {/* Box 4 - Total Admins */}
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">TOTAL ADMINS</div>
                        <div className="text-2xl sm:text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-2 sm:mb-3 transition-colors duration-300">{isLoading ? "..." : stats.totalAdmins.toLocaleString()}</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm transition-colors duration-300">Full system privileges granted to verified operators.</div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>

                {/* Box 5 - Total Groups */}
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">TOTAL GROUPS</div>
                        <div className="text-2xl sm:text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-2 sm:mb-3 transition-colors duration-300">{isLoading ? "..." : stats.totalGroups.toLocaleString()}</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm transition-colors duration-300">Active organizational clusters within the archive.</div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>

                {/* Box 6 - Active Campaigns */}
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">ACTIVE CAMPAIGNS</div>
                        <div className="text-2xl sm:text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-2 sm:mb-3 transition-colors duration-300">{isLoading ? "..." : stats.activeCampaigns.toLocaleString()}</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-xs sm:text-sm transition-colors duration-300">Live now</div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>
            </div>
            <OverviewReport />
        </div>
    );
};

export default AdminOverview;
