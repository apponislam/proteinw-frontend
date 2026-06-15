import React, { useState } from "react";
import { useGetSuperAdminGroupsStatsQuery } from "@/redux/features/dashboard/dashboardApi";

const getStatusColor = (status: boolean) => {
    return status ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
};

const GroupsTable = () => {
    const [page, setPage] = useState(1);
    const { data: response, isLoading } = useGetSuperAdminGroupsStatsQuery({ page, limit: 10 });

    const groupsData = response?.data || [];
    const meta = response?.meta || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
    };

    const handlePrevPage = () => {
        if (meta.hasPrev) {
            setPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (meta.hasNext) {
            setPage((prev) => prev + 1);
        }
    };

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
                                                <span className="w-10 h-10 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-sm">
                                                    {group.groupCode}
                                                </span>
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
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                                                {group.status ? "ACTIVE" : "PAUSED"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div>
                                                <div className="text-[#1A1C1C] font-medium">{formattedDeadline}</div>
                                                <div className="text-[#78716C] text-xs">{group.deadlineStatusText}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="text-[#D97706] hover:underline text-sm font-medium">View</button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="text-[#78716C] text-sm uppercase">
                    Showing {groupsData.length > 0 ? (page - 1) * meta.limit + 1 : 0} to{" "}
                    {Math.min(page * meta.limit, meta.total)} of {meta.total} groups
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevPage}
                        disabled={!meta.hasPrev || isLoading}
                        className="px-4 py-2 border border-[#E7E5E4] rounded-lg text-sm font-medium text-[#78716C] hover:bg-[#F5F5F4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-[#78716C] font-medium px-2">
                        Page {page} of {meta.totalPages || 1}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={!meta.hasNext || isLoading}
                        className="px-4 py-2 border border-[#E7E5E4] rounded-lg text-sm font-medium text-[#78716C] hover:bg-[#F5F5F4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupsTable;
