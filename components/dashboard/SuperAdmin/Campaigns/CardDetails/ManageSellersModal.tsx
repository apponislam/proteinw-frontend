"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Check, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { useGetCampaignSellersQuery, useAddSellersToCampaignMutation, useRemoveSellersFromCampaignMutation } from "@/redux/features/campaignSeller/campaignSellerApi";
import { useGetGroupSellersQuery } from "@/redux/features/sellerGroup/sellerGroupApi";

interface ManageSellersModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string;
    groupId: string;
    initialSellers?: any[];
}

const ManageSellersModal: React.FC<ManageSellersModalProps> = ({ isOpen, onClose, campaignId, groupId, initialSellers = [] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSellerIds, setSelectedSellerIds] = useState<string[]>([]);

    const { data: groupSellersResponse, isLoading: isFetchingGroupSellers } = useGetGroupSellersQuery(groupId, {
        skip: !groupId || !isOpen,
    });
    const { data: campaignSellersResponse } = useGetCampaignSellersQuery(campaignId, {
        skip: !campaignId || !isOpen,
    });

    const [addSellersToCampaign, { isLoading: isAdding }] = useAddSellersToCampaignMutation();
    const [removeSellersFromCampaign, { isLoading: isRemoving }] = useRemoveSellersFromCampaignMutation();

    const currentCampaignSellers = campaignSellersResponse?.data || initialSellers;
    const groupSellers = groupSellersResponse?.data || [];

    const getUserId = (s: any) => {
        if (!s) return "";
        if (s.sellerId && typeof s.sellerId === "object") return s.sellerId._id || "";
        if (s.sellerId && typeof s.sellerId === "string") return s.sellerId;
        return s._id || "";
    };

    useEffect(() => {
        if (isOpen) {
            const currentIds = currentCampaignSellers.map(getUserId).filter(Boolean);
            setSelectedSellerIds(currentIds);
            setSearchTerm("");
        }
    }, [isOpen, currentCampaignSellers]);

    if (!isOpen) return null;

    const handleToggleSeller = (sellerId: string) => {
        if (!sellerId) return;
        setSelectedSellerIds((prev) => (prev.includes(sellerId) ? prev.filter((id) => id !== sellerId) : [...prev, sellerId]));
    };

    const handleSave = async () => {
        const initialIds = currentCampaignSellers.map(getUserId).filter(Boolean);
        const additions = selectedSellerIds.filter((id) => !initialIds.includes(id));
        const deletions = initialIds.filter((id) => !selectedSellerIds.includes(id));

        try {
            let resMsg = "";
            if (additions.length > 0) {
                const addRes = await addSellersToCampaign({ campaignId, sellerIds: additions }).unwrap();
                resMsg = addRes?.message || resMsg;
            }
            if (deletions.length > 0) {
                const delRes = await removeSellersFromCampaign({ campaignId, sellerIds: deletions }).unwrap();
                resMsg = delRes?.message || resMsg;
            }
            toast.success(resMsg || "Campaign sellers updated successfully!");
            onClose();
        } catch (err: any) {
            const errorMsg = err?.data?.message || err?.message || "Failed to update sellers. Please try again.";
            toast.error(errorMsg);
        }
    };

    const filteredSellers = groupSellers.filter((seller: any) => {
        const userObj = seller?.sellerId && typeof seller.sellerId === "object" ? seller.sellerId : seller;
        const name = (userObj?.name || "").toLowerCase();
        const email = (userObj?.email || "").toLowerCase();
        const query = searchTerm.toLowerCase();
        return name.includes(query) || email.includes(query);
    });

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-[#E7E5E4] flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[#E7E5E4] flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-[#1A1C1C]">Manage Campaign Sellers</h3>
                        <p className="text-xs text-[#78716C]">Add or remove group sellers from this campaign</p>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-[#F3F3F3] rounded-lg transition-colors text-[#78716C] cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="px-6 pt-4">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" size={16} />
                        <input
                            type="text"
                            placeholder="Search group sellers by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#F3F3F3] border border-[#E7E5E4] rounded-xl text-sm focus:outline-none focus:border-[#D97706] transition-all"
                        />
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-3 grow min-h-0">
                    {isFetchingGroupSellers ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="animate-spin text-[#D97706]" size={24} />
                            <span className="text-sm text-[#78716C] ml-2">Loading sellers...</span>
                        </div>
                    ) : filteredSellers.length === 0 ? (
                        <div className="text-center text-sm text-[#78716C] py-8">No sellers found matching your search.</div>
                    ) : (
                        filteredSellers.map((seller: any) => {
                            const userObj = seller?.sellerId && typeof seller.sellerId === "object" ? seller.sellerId : seller;
                            const sellerUserId = userObj._id || seller._id || "";
                            const sellerName = userObj.name || "Unnamed Member";
                            const sellerEmail = userObj.email || "";

                            const isSelected = selectedSellerIds.includes(sellerUserId);

                            return (
                                <div
                                    key={seller._id || sellerUserId}
                                    onClick={() => handleToggleSeller(sellerUserId)}
                                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isSelected ? "border-[#D97706] bg-[#FCFBFA]" : "border-[#E7E5E4] bg-white hover:bg-[#F3F3F3]"}`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-[#D97706] flex items-center justify-center shrink-0 font-bold text-sm">
                                            {sellerName ? sellerName.charAt(0).toUpperCase() : <User size={18} />}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-sm text-[#1A1C1C] truncate">{sellerName}</h4>
                                            <p className="text-xs text-[#78716C] mt-0.5 truncate">{sellerEmail}</p>
                                        </div>
                                    </div>

                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isSelected ? "bg-[#D97706] border-[#D97706] text-white" : "border-[#A8A29E] bg-white"}`}>
                                        {isSelected && <Check size={14} strokeWidth={3} />}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#E7E5E4] flex items-center justify-between bg-[#F8F6F4]">
                    <span className="text-xs font-semibold text-[#78716C]">{selectedSellerIds.length} sellers selected</span>
                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="px-4 py-2 border border-[#E7E5E4] hover:bg-[#F3F3F3] text-sm font-semibold rounded-xl transition-all cursor-pointer text-[#1A1C1C]" disabled={isAdding || isRemoving}>
                            Cancel
                        </button>
                        <button onClick={handleSave} className="px-5 py-2 bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50" disabled={isAdding || isRemoving}>
                            {isAdding || isRemoving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageSellersModal;
