"use client";

import React, { useState } from "react";
import { Search, X, Check, Loader2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetGroupSellersQuery } from "@/redux/features/auth/authApi";

interface ManageCampaignSellersModalProps {
    groupId: string;
    selectedSellerIds: string[];
    onSave: (sellerIds: string[]) => void;
    onClose: () => void;
}

export function ManageCampaignSellersModal({ groupId, selectedSellerIds, onSave, onClose }: ManageCampaignSellersModalProps) {
    const { data: sellersData, isLoading } = useGetGroupSellersQuery(groupId);
    const sellers = sellersData?.data || [];

    const [tempSelected, setTempSelected] = useState<string[]>(selectedSellerIds);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSellers = (sellers as any[]).filter((seller) => {
        const userObj = seller?.sellerId && typeof seller.sellerId === "object" ? seller.sellerId : seller;
        const name = (userObj?.name || "").toLowerCase();
        const email = (userObj?.email || "").toLowerCase();
        const query = searchQuery.toLowerCase();
        return name.includes(query) || email.includes(query);
    });

    const toggleSeller = (id: string) => {
        if (!id) return;
        if (tempSelected.includes(id)) {
            setTempSelected(tempSelected.filter((sId) => sId !== id));
        } else {
            setTempSelected([...tempSelected, id]);
        }
    };

    const handleApply = () => {
        onSave(tempSelected);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl border border-[#E7E5E4] shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-[#F5F5F4] p-5">
                    <div>
                        <h3 className="text-lg font-bold text-[#1A1C1C]">Manage Campaign Sellers</h3>
                        <p className="text-xs text-[#78716C]">Select group members to participate in this campaign.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Search & Actions */}
                <div className="p-5 space-y-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search sellers by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-10 text-xs border-[#E7E5E4] focus:border-[#7C5800] focus:ring-[#7C5800]"
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                        <span className="font-semibold text-gray-700">
                            {tempSelected.length} sellers selected
                        </span>
                    </div>

                    {/* Sellers List */}
                    <div className="max-h-64 overflow-y-auto border border-[#F5F5F4] rounded-xl divide-y divide-[#F5F5F4] mt-2">
                        {isLoading ? (
                            <div className="py-8 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin text-[#D97706]" size={16} />
                                <span>Loading sellers...</span>
                            </div>
                        ) : filteredSellers.length === 0 ? (
                            <div className="py-8 text-center text-xs text-gray-500">{searchQuery ? "No sellers match your search." : "No members found in this group."}</div>
                        ) : (
                            filteredSellers.map((seller: any) => {
                                const userObj = seller?.sellerId && typeof seller.sellerId === "object" ? seller.sellerId : seller;
                                const sellerUserId = userObj._id || seller._id || "";
                                const sellerName = userObj.name || "Unnamed Member";
                                const sellerEmail = userObj.email || "";

                                const isChecked = tempSelected.includes(sellerUserId);
                                return (
                                    <div
                                        key={seller._id || sellerUserId}
                                        onClick={() => toggleSeller(sellerUserId)}
                                        className="flex items-center justify-between p-3 hover:bg-gray-50/80 cursor-pointer transition-colors select-none"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 text-[#7C5800] font-bold text-xs flex items-center justify-center shrink-0">
                                                {sellerName ? sellerName.charAt(0).toUpperCase() : <User size={14} />}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-[#1A1C1C] truncate">{sellerName}</p>
                                                <p className="text-[11px] text-[#78716C] truncate">{sellerEmail}</p>
                                            </div>
                                        </div>

                                        {/* Checkbox */}
                                        <div className="relative shrink-0 ml-3">
                                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${isChecked ? "border-[#7C5800] bg-[#7C5800]" : "border-gray-300"}`}>
                                                {isChecked && <Check size={14} className="text-white stroke-3" />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end items-center gap-3 p-4 border-t border-[#F5F5F4] bg-gray-50/50">
                    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-100 rounded-xl text-xs font-semibold cursor-pointer">
                        Cancel
                    </button>
                    <button type="button" onClick={handleApply} className="px-5 py-2 bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white rounded-full text-xs font-bold shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all cursor-pointer">
                        Save Selection ({tempSelected.length})
                    </button>
                </div>
            </div>
        </div>
    );
}
