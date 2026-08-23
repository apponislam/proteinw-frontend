"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { TTier, useGetAllTiersQuery, useUpdateTierMutation, useToggleTierStatusMutation, useDeleteTierMutation } from "@/redux/features/tier/tierApi";
import { TrendingUp, Star, Pencil, Trash2, ToggleLeft, ToggleRight, Loader2, ChevronRight, X, Check } from "lucide-react";

const TierCard = ({ tier }: { tier: TTier }) => {
    const [updateTier, { isLoading: isUpdating }] = useUpdateTierMutation();
    // const [toggleStatus, { isLoading: isToggling }] = useToggleTierStatusMutation();
    // const [deleteTier, { isLoading: isDeleting }] = useDeleteTierMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(tier.name);
    const [editPercentage, setEditPercentage] = useState(tier.percentage);
    const [editMin, setEditMin] = useState(tier.minSalesVolume);
    const [editMax, setEditMax] = useState<string | number>(tier.maxSalesVolume ?? "");
    const [editIsPopular, setEditIsPopular] = useState(tier.isPopular || false);

    const handleSave = async () => {
        const toastId = toast.loading("Updating tier...");
        try {
            await updateTier({
                tierId: tier._id!,
                data: {
                    name: editName,
                    percentage: editPercentage,
                    minSalesVolume: editMin,
                    maxSalesVolume: editMax !== "" ? Number(editMax) : undefined,
                    isPopular: editIsPopular,
                },
            }).unwrap();
            toast.success("Tier updated!", { id: toastId });
            setIsEditing(false);
        } catch (err: any) {
            toast.error(err?.data?.message || "Update failed", { id: toastId });
        }
    };

    const handleTogglePopular = async () => {
        const toastId = toast.loading(tier.isPopular ? "Removing Most Popular status..." : "Setting as Most Popular...");
        try {
            await updateTier({
                tierId: tier._id!,
                data: { isPopular: !tier.isPopular },
            }).unwrap();
            toast.success(tier.isPopular ? "Removed Most Popular status!" : "Marked as Most Popular!", { id: toastId });
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update popularity", { id: toastId });
        }
    };

    // const handleToggle = async () => {
    //     const toastId = toast.loading(tier.isActive ? "Deactivating..." : "Activating...");
    //     try {
    //         await toggleStatus(tier._id!).unwrap();
    //         toast.success(`Tier ${tier.isActive ? "deactivated" : "activated"}!`, { id: toastId });
    //     } catch (err: any) {
    //         toast.error(err?.data?.message || "Toggle failed", { id: toastId });
    //     }
    // };

    // const handleDelete = async () => {
    //     if (!confirm(`Delete tier "${tier.name}"? This cannot be undone.`)) return;
    //     const toastId = toast.loading("Deleting tier...");
    //     try {
    //         await deleteTier(tier._id!).unwrap();
    //         toast.success("Tier deleted!", { id: toastId });
    //     } catch (err: any) {
    //         toast.error(err?.data?.message || "Delete failed", { id: toastId });
    //     }
    // };

    return (
        <div className={`relative bg-white rounded-2xl border p-4 sm:p-6 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)] transition-all group ${tier.isPopular ? "border-[#D97706]" : "border-[#E7E5E4]"} ${!tier.isActive ? "opacity-60" : ""}`}>
            {tier.isPopular && (
                <div className="absolute -top-3 left-4 sm:left-6">
                    <button
                        onClick={handleTogglePopular}
                        disabled={isUpdating}
                        className="inline-flex items-center gap-1 bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full cursor-pointer hover:scale-105 transition-transform"
                        title="Click to toggle Most Popular status"
                    >
                        <Star size={10} fill="currentColor" /> Most Popular
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-4 sm:mb-5 gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 ${tier.isActive ? "bg-amber-50 text-[#D97706]" : "bg-gray-100 text-gray-400"}`}>
                        <TrendingUp size={18} />
                    </div>
                    {isEditing ? (
                        <input value={editName} onChange={(e) => setEditName(e.target.value)} className="text-xs sm:text-sm font-bold text-[#1A1C1C] border-b border-[#D97706] focus:outline-none bg-transparent uppercase w-32 sm:w-40" />
                    ) : (
                        <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-bold text-[#1A1C1C] uppercase tracking-wide truncate">{tier.name}</h3>
                            <span className={`text-[10px] font-semibold uppercase ${tier.isActive ? "text-green-600" : "text-gray-400"}`}>{tier.isActive ? "Active" : "Inactive"}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} disabled={isUpdating} className="p-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 cursor-pointer disabled:opacity-50" title="Save">
                                {isUpdating ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                            </button>
                            <button onClick={() => setIsEditing(false)} className="p-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer" title="Cancel">
                                <X size={14} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleTogglePopular}
                                disabled={isUpdating}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${tier.isPopular ? "text-[#D97706] bg-amber-50 hover:bg-amber-100" : "text-gray-400 hover:text-[#D97706] hover:bg-amber-50"}`}
                                title={tier.isPopular ? "Remove Most Popular tag" : "Set as Most Popular"}
                            >
                                <Star size={14} fill={tier.isPopular ? "currentColor" : "none"} />
                            </button>
                            <button onClick={() => setIsEditing(true)} className="p-1.5 text-[#D97706] hover:bg-amber-50 rounded-lg cursor-pointer" title="Edit">
                                <Pencil size={14} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Percentage */}
            <div className="mb-4 sm:mb-5">
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <input type="number" step="0.1" value={editPercentage} onChange={(e) => setEditPercentage(Number(e.target.value))} className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1C] border-b border-[#D97706] focus:outline-none bg-transparent w-20" />
                        <span className="text-xl sm:text-2xl font-bold text-[#D97706]">%</span>
                    </div>
                ) : (
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1C]">
                        {tier.percentage}
                        <span className="text-xl sm:text-2xl text-[#D97706] ml-0.5">%</span>
                    </div>
                )}
                <p className="text-xs text-[#78716C] mt-1">Profit margin</p>
            </div>

            {/* Volume Range & Edit Popular Toggle */}
            <div className="border-t border-[#F5F5F4] pt-3 sm:pt-4 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs text-[#78716C] font-semibold uppercase">Sales Volume Range</span>
                </div>
                {isEditing ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <input type="number" value={editMin} onChange={(e) => setEditMin(Number(e.target.value))} className="w-20 sm:w-24 text-xs px-2 py-1 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706]" placeholder="Min" />
                            <ChevronRight size={14} className="text-[#78716C]" />
                            <input type="number" value={editMax} onChange={(e) => setEditMax(e.target.value)} className="w-20 sm:w-24 text-xs px-2 py-1 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706]" placeholder="Max (∞)" />
                        </div>
                        <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                            <input type="checkbox" checked={editIsPopular} onChange={(e) => setEditIsPopular(e.target.checked)} className="w-4 h-4 accent-[#D97706] cursor-pointer rounded" />
                            <span className="text-xs font-bold text-[#1A1C1C]">Mark as Most Popular</span>
                        </label>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1A1C1C] flex-wrap">
                        <span>{tier.minSalesVolume.toLocaleString()} items</span>
                        <ChevronRight size={14} className="text-[#78716C] shrink-0" />
                        <span>{tier.maxSalesVolume ? `${tier.maxSalesVolume.toLocaleString()} items` : "Unlimited ∞"}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProfitCards = () => {
    const { data: tiers, isLoading, isFetching } = useGetAllTiersQuery();

    if (isLoading) {
        return (
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#E7E5E4] p-6 animate-pulse">
                        <div className="h-4 w-2/3 bg-gray-100 rounded mb-4" />
                        <div className="h-10 w-1/3 bg-gray-100 rounded mb-3" />
                        <div className="h-3 w-full bg-gray-100 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    if (!tiers || !Array.isArray(tiers) || tiers.length === 0) {
        return (
            <div className="mt-6 sm:mt-8 bg-white rounded-2xl border border-[#E7E5E4] p-8 sm:p-12 text-center">
                <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D97706]">
                    <TrendingUp size={24} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1A1C1C] mb-2">No tiers configured</h3>
                <p className="text-xs sm:text-sm text-[#78716C]">Add your first tier using the button above.</p>
            </div>
        );
    }

    return (
        <div className={`mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${isFetching ? "opacity-70 pointer-events-none" : ""}`}>
            {tiers.map((tier) => (
                <TierCard key={tier._id} tier={tier} />
            ))}
        </div>
    );
};

export default ProfitCards;
