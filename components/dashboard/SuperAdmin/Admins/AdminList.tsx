"use client";

import React, { useState } from "react";
import { useGetAdminsWithStatsQuery } from "../../../../redux/features/auth/authApi";

const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
};

const AdminList = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: response, isLoading } = useGetAdminsWithStatsQuery({ page, limit });
    
    const admins = response?.data || [];
    const meta = response?.meta;

    if (isLoading) {
        return <div className="mt-8 text-center text-[#78716C] py-10">Loading admins...</div>;
    }

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1A1C1C]">System Controllers</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#FAFAF9]">
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ADMIN NAME</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ASSIGNED GROUPS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SELLERS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ORDERS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-[#78716C]">
                                    No admins found.
                                </td>
                            </tr>
                        ) : (
                            admins.map((admin) => (
                                <tr key={admin._id} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                    <td className="px-4 py-4">
                                        <div>
                                            <div className="text-[#1A1C1C] font-medium">{admin.name}</div>
                                            <div className="text-[#78716C] text-sm">{admin.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${admin.groupName ? "bg-[#D97706] text-white" : "bg-gray-200 text-gray-700"}`}>
                                            {admin.groupName || "UNASSIGNED"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-[#1A1C1C] font-medium">{admin.sellerCount}</td>
                                    <td className="px-4 py-4 text-[#1A1C1C] font-medium">{admin.orderCount.toLocaleString()}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(admin.isActive)}`}>
                                            {admin.isActive ? "Active" : "Disabled"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <button className="text-[#D97706] hover:underline text-sm cursor-pointer">Edit</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {meta && meta.total > 0 && (
                <div className="flex items-center justify-between mt-6">
                    <div className="text-[#78716C] text-sm">
                        SHOWING {(meta.page - 1) * meta.limit + 1} TO {Math.min(meta.page * meta.limit, meta.total)} OF {meta.total} ADMINS
                    </div>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all cursor-pointer ${
                                    p === meta.page ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminList;
