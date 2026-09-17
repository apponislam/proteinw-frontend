import Link from "next/link";
import React from "react";
import { useGetSuperAdminGroupsStatsQuery } from "@/redux/features/dashboard/dashboardApi";

const OverviewReport = () => {
    const { data: response, isLoading } = useGetSuperAdminGroupsStatsQuery({ limit: 3, sortBy: "packagesSold" });
    const groupData = response?.data || [];

    return (
        <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
                <div>
                    <h2 className="text-[#1A1C1C] text-lg sm:text-xl font-bold">Total vinst per grupp</h2>
                    <p className="text-[#78716C] text-xs sm:text-sm mt-0.5 sm:mt-1">Intäktsfördelning för de bäst presterande grupperna detta kvartal.</p>
                </div>
                <Link href="/dashboard/groups" className="shrink-0">
                    <button className="text-[#D97706] font-semibold text-xs sm:text-sm hover:underline cursor-pointer">Visa alla rapporter</button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-137.5">
                    <thead>
                        <tr className="bg-[#FAFAF9]">
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GRUPPNAMN</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">FÖRSÄLJNINGSANSVARIG</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SÅLDA ENHETER</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">INTÄKTER</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GRUPPVINST</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-[#78716C]">
                                    Laddar toppgrupper...
                                </td>
                            </tr>
                        ) : groupData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-[#78716C]">
                                    Ingen gruppdata tillgänglig.
                                </td>
                            </tr>
                        ) : (
                            groupData.map((group, index) => {
                                return (
                                    <tr key={index} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-md bg-[#F5F5F4] bg-opacity-10 flex items-center justify-center text-[#D97706] font-bold text-sm">{group.groupCode || "GP"}</div>
                                                <span className="text-[#1A1C1C] font-medium">{group.groupName}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-[#78716C]">{typeof group.assignedAdmin === "object" ? group.assignedAdmin?.name || "EJ TILLDELAD" : group.assignedAdmin || "EJ TILLDELAD"}</td>
                                        <td className="px-4 py-4 text-[#1A1C1C] font-medium">{(group.packagesSold ?? 0).toLocaleString()}</td>
                                        <td className="px-4 py-4 text-[#1A1C1C] font-medium">{(group.revenue ?? 0).toLocaleString()} SEK</td>
                                        <td className="px-4 py-4 text-[#D97706] font-bold">{(group.groupProfit ?? 0).toLocaleString()} SEK</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OverviewReport;
