"use client";

import React from "react";
import { X, Phone, Mail, MapPin, Briefcase, Group } from "lucide-react";
import { TAdminStats, useGetUserByIdQuery } from "@/redux/features/auth/authApi";

interface AdminViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    admin: TAdminStats | null;
}

const AdminViewModal: React.FC<AdminViewModalProps> = ({ isOpen, onClose, admin }) => {
    const adminId = admin?._id || "";
    const { data: response, isLoading } = useGetUserByIdQuery(adminId, { skip: !isOpen || !adminId });

    if (!isOpen || !admin) return null;

    const userDetails = (response as any)?.data?.data || (response as any)?.data || response;
    const user = userDetails || admin;
    const address = (userDetails as any)?.address;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                    <X size={20} />
                </button>

                {/* Header Profile Badge */}
                <div className="flex items-center gap-4 border-b border-[#F5F5F4] pb-6 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#7C5800] to-[#D97706] text-white font-bold text-xl flex items-center justify-center shadow-md uppercase">{(admin.name || "A").slice(0, 2)}</div>
                    <div>
                        <h2 className="text-xl font-bold text-[#1A1C1C]">{admin.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-[#D97706]">ADMIN</span>
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${admin.isApproved === true ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {admin.isApproved === true ? "Approved" : "Not Approved"}
                            </span>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-12 text-center text-[#78716C]">Loading admin details...</div>
                ) : (
                    <div className="space-y-5">
                        {/* Basic Info */}
                        <div className="bg-[#FAFAF9] p-3.5 sm:p-4 rounded-xl space-y-3 border border-[#E7E5E4]">
                            <h3 className="text-xs font-bold text-[#78716C] uppercase tracking-wider mb-2">Account Overview</h3>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm">
                                <div className="flex items-center gap-2 shrink-0">
                                    <Mail size={16} className="text-[#D97706]" />
                                    <span className="text-[#78716C] w-20 sm:w-24">Email:</span>
                                </div>
                                <span className="font-semibold text-[#1A1C1C] break-all">{user.email || "N/A"}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm">
                                <div className="flex items-center gap-2 shrink-0">
                                    <Phone size={16} className="text-[#D97706]" />
                                    <span className="text-[#78716C] w-20 sm:w-24">Phone:</span>
                                </div>
                                <span className="font-semibold text-[#1A1C1C]">{user.phone || "N/A"}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm">
                                <div className="flex items-center gap-2 shrink-0">
                                    <Briefcase size={16} className="text-[#D97706]" />
                                    <span className="text-[#78716C] w-20 sm:w-24">Profession:</span>
                                </div>
                                <span className="font-semibold text-[#1A1C1C]">{user.profession || "N/A"}</span>
                            </div>
                        </div>

                        {/* Assigned Group & Stats */}
                        <div className="bg-[#FAFAF9] p-4 rounded-xl space-y-3 border border-[#E7E5E4]">
                            <h3 className="text-xs font-bold text-[#78716C] uppercase tracking-wider mb-2">Performance & Assignment</h3>

                            <div className="flex items-center gap-3 text-sm">
                                <Group size={16} className="text-[#D97706]" />
                                <span className="text-[#78716C] w-24">Group(s):</span>
                                {Array.isArray(admin.groupName) ? (
                                    admin.groupName.length > 0 ? (
                                        <div className="relative group/modalpaper inline-block cursor-pointer">
                                            {/* Paper stack card preview */}
                                            <div className="relative pt-1 pb-1 px-3 bg-white border border-[#E7E5E4] rounded-lg shadow-xs transition-all duration-200 group-hover/modalpaper:border-[#D97706] group-hover/modalpaper:shadow-md">
                                                {admin.groupName.length > 1 && (
                                                    <>
                                                        <div className="absolute -top-1 left-2 right-2 h-full bg-stone-100 border border-stone-200 rounded-lg -z-10 transition-transform group-hover/modalpaper:-top-1.5" />
                                                        {admin.groupName.length > 2 && <div className="absolute -top-2 left-4 right-4 h-full bg-amber-50/60 border border-amber-200/50 rounded-lg -z-20 transition-transform group-hover/modalpaper:-top-2.5" />}
                                                    </>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-[#1A1C1C] truncate max-w-40">{admin.groupName[0]}</span>
                                                    {admin.groupName.length > 1 && <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-[#D97706]">+{admin.groupName.length - 1}</span>}
                                                </div>
                                            </div>

                                            {/* Hover Card list popup */}
                                            <div className="absolute left-0 top-full mt-2 hidden group-hover/modalpaper:flex flex-col gap-1.5 z-50 p-3 bg-white rounded-xl shadow-2xl border border-stone-200 min-w-48 max-w-xs animate-in fade-in zoom-in-95 duration-150">
                                                <div className="text-[10px] font-bold text-[#78716C] uppercase tracking-wider mb-1">Assigned Groups ({admin.groupName.length})</div>
                                                <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                                                    {admin.groupName.map((g, idx) => (
                                                        <div key={idx} className="px-2.5 py-1 rounded-md bg-amber-50 text-[#D97706] text-xs font-semibold border border-amber-200/60">
                                                            {g}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="font-semibold px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-700">UNASSIGNED</span>
                                    )
                                ) : (
                                    <span className={`font-semibold px-2.5 py-0.5 rounded-full text-xs ${admin.groupName ? "bg-[#D97706] text-white" : "bg-gray-200 text-gray-700"}`}>{admin.groupName || "UNASSIGNED"}</span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="bg-white p-3 rounded-lg border border-[#E7E5E4] text-center">
                                    <div className="text-xl font-bold text-[#1A1C1C]">{admin.sellerCount}</div>
                                    <div className="text-xs text-[#78716C] uppercase font-medium">Sellers</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-[#E7E5E4] text-center">
                                    <div className="text-xl font-bold text-[#1A1C1C]">{admin.orderCount.toLocaleString()}</div>
                                    <div className="text-xs text-[#78716C] uppercase font-medium">Orders</div>
                                </div>
                            </div>
                        </div>

                        {/* Address Details */}
                        {address && (
                            <div className="bg-[#FAFAF9] p-4 rounded-xl space-y-2 border border-[#E7E5E4]">
                                <h3 className="text-xs font-bold text-[#78716C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <MapPin size={14} className="text-[#D97706]" /> Address Info
                                </h3>
                                <p className="text-sm text-[#1A1C1C] font-medium">{[address.street, address.city, address.state, address.zipCode, address.country].filter(Boolean).join(", ") || "No address provided."}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer Close Button */}
                <div className="mt-6 pt-4 border-t border-[#F5F5F4] flex justify-end">
                    <button onClick={onClose} className="px-5 py-2 bg-[#D97706] hover:bg-[#C06A06] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminViewModal;
