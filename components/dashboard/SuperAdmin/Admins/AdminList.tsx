"use client";

import React, { useState } from "react";
import { useGetAdminsWithStatsQuery, useApproveAdminMutation, TAdminStats } from "../../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { CheckCircle, Loader2, Edit3 } from "lucide-react";
import AdminEditModal from "./AdminEditModal";

const AdminList = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const [approvingId, setApprovingId] = useState<string | null>(null);

    // Edit modal states
    const [selectedAdmin, setSelectedAdmin] = useState<TAdminStats | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { data: response, isLoading } = useGetAdminsWithStatsQuery({ page, limit });
    const [approveAdmin] = useApproveAdminMutation();

    const admins = response?.data || [];
    const meta = response?.meta;

    const handleApprove = async (adminId: string, adminName: string) => {
        setApprovingId(adminId);
        const toastId = toast.loading(`Approving admin ${adminName}...`);
        try {
            await approveAdmin(adminId).unwrap();
            toast.success(`Admin ${adminName} approved successfully!`, { id: toastId });
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to approve admin", { id: toastId });
        } finally {
            setApprovingId(null);
        }
    };

    const handleOpenEditModal = (admin: TAdminStats) => {
        setSelectedAdmin(admin);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedAdmin(null);
    };

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
                            admins.map((admin) => {
                                const isApproved = admin.isApproved !== undefined ? admin.isApproved : admin.isActive;
                                const isThisApproving = approvingId === admin._id;

                                return (
                                    <tr key={admin._id} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                        <td className="px-4 py-4">
                                            <div>
                                                <div className="text-[#1A1C1C] font-medium">{admin.name}</div>
                                                <div className="text-[#78716C] text-sm">{admin.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${admin.groupName ? "bg-[#D97706] text-white" : "bg-gray-200 text-gray-700"}`}>{admin.groupName || "UNASSIGNED"}</span>
                                        </td>
                                        <td className="px-4 py-4 text-[#1A1C1C] font-medium">{admin.sellerCount}</td>
                                        <td className="px-4 py-4 text-[#1A1C1C] font-medium">{admin.orderCount.toLocaleString()}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${isApproved ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                                                {isApproved ? "Active" : "Pending Approval"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                {isApproved ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
                                                        <CheckCircle size={14} /> Approved
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleApprove(admin._id, admin.name)}
                                                        disabled={isThisApproving}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D97706] hover:bg-[#C06A06] text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-50"
                                                    >
                                                        {isThisApproving ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={14} />}
                                                        Approve Admin
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleOpenEditModal(admin)}
                                                    className="p-1.5 rounded-lg bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white transition-colors cursor-pointer"
                                                    title="Edit Admin"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
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
                            <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all cursor-pointer ${p === meta.page ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Edit Admin Modal */}
            <AdminEditModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                admin={selectedAdmin}
            />
        </div>
    );
};

export default AdminList;
