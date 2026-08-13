import React, { useState } from "react";
import Link from "next/link";
import { useGetSuperAdminGroupsStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import Pagination from "@/components/dashboard/Pagination";

const getStatusColor = (status: boolean) => {
    return status ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
};

const GroupsTable = () => {
    const [page, setPage] = useState(1);
    const { data: response, isLoading } = useGetSuperAdminGroupsStatsQuery({ page, limit: 10 });

    const groupsData = response?.data || [];
    const meta = response?.meta;

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">All Groups</h2>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#FAFAF9]">
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GROUP NAME</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ASSIGNED ADMIN</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SELLERS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PACKAGES SOLD</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PROFIT TIER</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">DEADLINE</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-[#78716C]">
                                    Loading groups...
                                </td>
                            </tr>
                        ) : groupsData.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-[#78716C]">
                                    No groups found.
                                </td>
                            </tr>
                        ) : (
                            groupsData.map((group, index) => {
                                const formattedDeadline = group.deadlineDate
                                    ? new Date(group.deadlineDate).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                      })
                                    : "N/A";

                                return (
                                    <tr key={index} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-10 h-10 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-sm">{group.groupCode}</span>
                                                <div>
                                                    <div className="text-[#1A1C1C] font-medium">{group.groupName}</div>
                                                    <div className="text-[#78716C] text-sm">{group.campaignCode !== "N/A" ? `#${group.campaignCode}` : "N/A"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-[#1A1C1C] font-medium">{group.assignedAdmin}</td>
                                        <td className="px-4 py-4 text-[#1A1C1C] font-medium">{group.sellers}</td>
                                        <td className="px-4 py-4 text-[#1A1C1C] font-medium">{group.packagesSold.toLocaleString()}</td>
                                        <td className="px-4 py-4">
                                            <div>
                                                <div className="text-[#D97706] font-bold">{group.profitTier}</div>
                                                <div className="text-[#78716C] text-xs">{group.profitTierStatusText}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>{group.status ? "ACTIVE" : "PAUSED"}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div>
                                                <div className="text-[#1A1C1C] font-medium">{formattedDeadline}</div>
                                                <div className="text-[#78716C] text-xs">{group.deadlineStatusText}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Link href={`/dashboard/groups/${group._id}`} className="text-[#D97706] hover:underline text-sm font-medium cursor-pointer">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component */}
            <Pagination meta={meta} onPageChange={setPage} itemName="GROUPS" />
        </div>
    );
};

export default GroupsTable;
