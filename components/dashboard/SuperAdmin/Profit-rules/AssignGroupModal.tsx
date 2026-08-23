"use client";

import React, { useState, useEffect } from "react";
import { useGetAllCampaignsSummaryQuery, useAssignTierToCampaignMutation } from "@/redux/features/campaign/campaignApi";
import { useGetAllTiersQuery } from "@/redux/features/tier/tierApi";
import { X, Layers, AlertCircle, CheckCircle2, Search, ChevronDown, Loader2, Check } from "lucide-react";

interface AssignGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AssignGroupModal: React.FC<AssignGroupModalProps> = ({ isOpen, onClose }) => {
    const [selectedCampaign, setSelectedCampaign] = useState<{ id: string; name: string } | null>(null);
    const [selectedTier, setSelectedTier] = useState<{ id: string; name: string } | null>(null);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Custom dropdown states for Campaign select
    const [isCampaignDropdownOpen, setIsCampaignDropdownOpen] = useState(false);
    const [campaignSearchTerm, setCampaignSearchTerm] = useState("");
    const [campaignPage, setCampaignPage] = useState(1);
    const [loadedCampaigns, setLoadedCampaigns] = useState<any[]>([]);

    // Custom dropdown state for Tier select
    const [isTierDropdownOpen, setIsTierDropdownOpen] = useState(false);

    const { data: campaignOptionsResponse, isFetching: isFetchingCampaigns } = useGetAllCampaignsSummaryQuery(
        { page: campaignPage, limit: 8, search: campaignSearchTerm },
        { skip: !isOpen }
    );

    const { data: tiersData } = useGetAllTiersQuery();
    const [assignTier, { isLoading: isAssigning }] = useAssignTierToCampaignMutation();

    const tiers = tiersData || [];

    // Reset fields on modal open/close
    useEffect(() => {
        if (isOpen) {
            setSelectedCampaign(null);
            setSelectedTier(null);
            setSuccessMsg("");
            setErrorMsg("");
            setCampaignSearchTerm("");
            setCampaignPage(1);
            setLoadedCampaigns([]);
            setIsCampaignDropdownOpen(false);
            setIsTierDropdownOpen(false);
        }
    }, [isOpen]);

    // Accumulate campaigns when searching or paginating lazily
    useEffect(() => {
        if (campaignOptionsResponse?.data) {
            if (campaignPage === 1) {
                setLoadedCampaigns(campaignOptionsResponse.data);
            } else {
                setLoadedCampaigns((prev) => [...prev, ...campaignOptionsResponse.data]);
            }
        }
    }, [campaignOptionsResponse, campaignPage]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCampaignSearchTerm(e.target.value);
        setCampaignPage(1);
    };

    const handleScrollCampaigns = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 10 && campaignOptionsResponse?.meta?.hasNext && !isFetchingCampaigns) {
            setCampaignPage((prev) => prev + 1);
        }
    };

    const handleAssignTier = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");

        if (!selectedCampaign?.id || !selectedTier?.id) {
            setErrorMsg("Please select both a campaign and a profit tier.");
            return;
        }

        try {
            await assignTier({ campaignId: selectedCampaign.id, tierId: selectedTier.id }).unwrap();
            setSuccessMsg("Tier assigned successfully!");
            setTimeout(() => {
                onClose();
            }, 1200);
        } catch (err: any) {
            setErrorMsg(err?.data?.message || "Failed to assign tier to campaign.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
            <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-md rounded-2xl p-4 sm:p-6 shadow-2xl relative border border-stone-100 max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2 text-[#1A1C1C]">
                        <Layers className="text-[#D97706]" size={20} />
                        <h3 className="text-base sm:text-lg font-bold">Assign Profit Tier</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {errorMsg && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2 border border-red-100">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                {successMsg && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 text-xs font-semibold rounded-xl flex items-center gap-2 border border-green-100">
                        <CheckCircle2 size={16} className="shrink-0" />
                        <span>{successMsg}</span>
                    </div>
                )}

                <form onSubmit={handleAssignTier} className="space-y-4 overflow-y-auto flex-1 p-0.5">
                    {/* Custom Searchable Campaign Dropdown */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                            Select Campaign / Group
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsCampaignDropdownOpen((prev) => !prev)}
                                className="w-full h-11 px-3.5 bg-[#F9F9F9] border border-stone-200 rounded-xl text-xs sm:text-sm font-medium text-[#1A1C1C] flex items-center justify-between focus:outline-none focus:border-[#D97706] cursor-pointer"
                            >
                                <span className={selectedCampaign ? "text-[#1A1C1C] font-semibold truncate" : "text-stone-400 truncate"}>
                                    {selectedCampaign ? selectedCampaign.name : "-- Choose Campaign --"}
                                </span>
                                <ChevronDown size={16} className={`shrink-0 transition-transform ${isCampaignDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isCampaignDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setIsCampaignDropdownOpen(false)}></div>
                                    <div className="absolute left-0 right-0 mt-1 z-30 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden animate-in fade-in duration-150">
                                        {/* Search Bar */}
                                        <div className="p-2 border-b border-stone-100 flex items-center gap-2 bg-stone-50">
                                            <Search size={16} className="text-stone-400 shrink-0 ml-1" />
                                            <input
                                                type="text"
                                                value={campaignSearchTerm}
                                                onChange={handleSearchChange}
                                                placeholder="Search by name..."
                                                className="w-full text-xs bg-transparent border-none outline-none py-1 text-stone-800 placeholder:text-stone-400"
                                                autoFocus
                                            />
                                        </div>

                                        {/* Options List with Lazy Loading Scroll */}
                                        <div
                                            onScroll={handleScrollCampaigns}
                                            className="max-h-48 overflow-y-auto divide-y divide-stone-50"
                                        >
                                            {loadedCampaigns.length === 0 && !isFetchingCampaigns ? (
                                                <div className="p-3 text-xs text-stone-400 text-center">No campaigns found</div>
                                            ) : (
                                                loadedCampaigns.map((c: any) => {
                                                    const displayName = `${c.groupId?.name || c.name} (${c.name})`;
                                                    const isSelected = selectedCampaign?.id === c._id;
                                                    return (
                                                        <button
                                                            key={c._id}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedCampaign({ id: c._id, name: displayName });
                                                                setIsCampaignDropdownOpen(false);
                                                            }}
                                                            className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors hover:bg-amber-50 ${
                                                                isSelected ? "bg-amber-50 text-[#D97706]" : "text-stone-700"
                                                            }`}
                                                        >
                                                            <span className="truncate">{displayName}</span>
                                                            {isSelected && <Check size={14} className="text-[#D97706] shrink-0" />}
                                                        </button>
                                                    );
                                                })
                                            )}

                                            {isFetchingCampaigns && (
                                                <div className="p-2.5 text-xs text-stone-400 text-center flex items-center justify-center gap-2 bg-stone-50">
                                                    <Loader2 size={14} className="animate-spin text-[#D97706]" />
                                                    <span>Loading more...</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Custom Profit Tier Dropdown */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                            Select Profit Tier
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsTierDropdownOpen((prev) => !prev)}
                                className="w-full h-11 px-3.5 bg-[#F9F9F9] border border-stone-200 rounded-xl text-xs sm:text-sm font-medium text-[#1A1C1C] flex items-center justify-between focus:outline-none focus:border-[#D97706] cursor-pointer"
                            >
                                <span className={selectedTier ? "text-[#1A1C1C] font-semibold truncate" : "text-stone-400 truncate"}>
                                    {selectedTier ? selectedTier.name : "-- Choose Tier --"}
                                </span>
                                <ChevronDown size={16} className={`shrink-0 transition-transform ${isTierDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isTierDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setIsTierDropdownOpen(false)}></div>
                                    <div className="absolute left-0 right-0 mt-1 z-30 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden animate-in fade-in duration-150">
                                        <div className="max-h-48 overflow-y-auto divide-y divide-stone-50">
                                            {tiers.length === 0 ? (
                                                <div className="p-3 text-xs text-stone-400 text-center">No tiers available</div>
                                            ) : (
                                                tiers.map((tier) => {
                                                    const tierLabel = `${tier.name} (${tier.percentage}% Profit Tier)`;
                                                    const isSelected = selectedTier?.id === tier._id;
                                                    return (
                                                        <button
                                                            key={tier._id}
                                                            type="button"
                                                            onClick={() => {
                                                                if (tier._id) {
                                                                    setSelectedTier({ id: tier._id, name: tierLabel });
                                                                    setIsTierDropdownOpen(false);
                                                                }
                                                            }}
                                                            className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors hover:bg-amber-50 ${
                                                                isSelected ? "bg-amber-50 text-[#D97706]" : "text-stone-700"
                                                            }`}
                                                        >
                                                            <span className="truncate">{tierLabel}</span>
                                                            {isSelected && <Check size={14} className="text-[#D97706] shrink-0" />}
                                                        </button>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-stone-600 hover:bg-stone-100 rounded-xl transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isAssigning}
                            className="px-4 sm:px-5 py-2.5 bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white text-xs sm:text-sm font-bold rounded-xl hover:from-[#8B6500] hover:to-[#FFCC00] transition-all cursor-pointer shadow-xs disabled:opacity-50"
                        >
                            {isAssigning ? "Assigning..." : "Confirm Assignment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignGroupModal;
