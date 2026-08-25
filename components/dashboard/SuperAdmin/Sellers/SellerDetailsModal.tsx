import React from "react";
import { X, Users, PackageCheck, ShoppingBag, Target } from "lucide-react";
import { TSellerListItem } from "@/redux/features/dashboard/dashboardApi";
import { SellerCampaignOrders } from "./SellerCampaignOrders";

interface SellerDetailsModalProps {
    seller: TSellerListItem;
    onClose: () => void;
}

export const SellerDetailsModal: React.FC<SellerDetailsModalProps> = ({ seller, onClose }) => {
    const groupsList = seller.groups && seller.groups.length > 0 ? seller.groups : seller.group ? [seller.group] : [];
    const totalGroupsCount = seller.totalGroups ?? groupsList.length;
    const totalCampaignsCount = seller.totalCampaigns ?? 0;
    const activeCampaignsCount = seller.totalActiveCampaigns ?? 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm transition-all duration-300">
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto flex flex-col p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center font-extrabold text-lg shadow-xs">{seller.code}</span>
                        <div>
                            <h3 className="text-xl font-bold text-[#1A1C1C]">{seller.name}</h3>
                            <p className="text-sm text-[#78716C]">{seller.email}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#78716C] hover:text-[#1C191C] transition-colors cursor-pointer" title="Close">
                        <X size={18} />
                    </button>
                </div>

                {/* Fully Responsive Top Stat Cards Row */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6">
                    {/* Packages Sold (Highlight Card) */}
                    <div className="bg-amber-50/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#D97706] text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
                            <PackageCheck size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-lg sm:text-2xl font-extrabold text-[#1A1C1C] block leading-tight">{seller.packages}</span>
                            <span className="text-[11px] sm:text-xs font-bold text-[#7C5800] truncate block">Packages Sold</span>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className="bg-[#FAFAF9] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100/80 text-[#7C5800] flex items-center justify-center font-bold shrink-0">
                            <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-lg sm:text-2xl font-extrabold text-[#1A1C1C] block leading-tight">{seller.orders}</span>
                            <span className="text-[11px] sm:text-xs font-semibold text-[#78716C] truncate block">Total Orders</span>
                        </div>
                    </div>

                    {/* Total Groups */}
                    <div className="bg-[#FAFAF9] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100/80 text-[#7C5800] flex items-center justify-center font-bold shrink-0">
                            <Users size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-lg sm:text-2xl font-extrabold text-[#1A1C1C] block leading-tight">{totalGroupsCount}</span>
                            <span className="text-[11px] sm:text-xs font-semibold text-[#78716C] truncate block">Assigned Groups</span>
                        </div>
                    </div>

                    {/* Campaigns (Total & Active) */}
                    <div className="bg-[#FAFAF9] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                            <Target size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-lg sm:text-2xl font-extrabold text-[#1A1C1C] leading-tight">{totalCampaignsCount}</span>
                                {activeCampaignsCount > 0 && (
                                    <span className="text-[9px] sm:text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md truncate">
                                        {activeCampaignsCount} Active
                                    </span>
                                )}
                            </div>
                            <span className="text-[11px] sm:text-xs font-semibold text-[#78716C] truncate block">Total Campaigns</span>
                        </div>
                    </div>
                </div>

                {/* Assigned Groups Section */}
                <div className="bg-[#FAFAF9] p-4 sm:p-5 rounded-2xl border border-[#E7E5E4] space-y-3 mb-6">
                    <div className="flex items-center gap-2 border-b border-stone-200/60 pb-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#7C5800] flex items-center justify-center font-bold shrink-0">
                            <Users size={18} />
                        </div>
                        <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Assigned Groups</span>
                    </div>

                    {groupsList.length === 0 ? (
                        <p className="text-sm text-stone-400 font-medium">No groups assigned</p>
                    ) : (
                        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                            {groupsList.map((groupName, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white text-[#1A1C1C] px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs hover:border-amber-300 transition-colors">
                                    <span className="w-2 h-2 rounded-full bg-[#D97706] shrink-0"></span>
                                    {groupName}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom: Seller Orders */}
                <div className="mb-6 border-t border-[#F5F5F4] pt-6">
                    <h4 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-3">Seller Orders</h4>
                    <SellerCampaignOrders memberId={seller._id} />
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t border-[#F5F5F4] mt-auto">
                    <button onClick={onClose} className="px-5 py-2.5 bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#1A1C1C] font-semibold rounded-xl border border-[#E7E5E4] transition-colors duration-200 cursor-pointer">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
