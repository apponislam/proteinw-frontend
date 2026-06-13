"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { TTier, useGetAllTiersQuery, useUpdateTierMutation, useToggleTierStatusMutation, useDeleteTierMutation } from "@/redux/features/tier/tierApi";
import { TrendingUp, Star, Pencil, Trash2, ToggleLeft, ToggleRight, Loader2, ChevronRight, X, Check } from "lucide-react";

const TierCard = ({ tier }: { tier: TTier }) => {
    const [updateTier, { isLoading: isUpdating }] = useUpdateTierMutation();
    const [toggleStatus, { isLoading: isToggling }] = useToggleTierStatusMutation();
    const [deleteTier, { isLoading: isDeleting }] = useDeleteTierMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(tier.name);
    const [editPercentage, setEditPercentage] = useState(tier.percentage);
    const [editMin, setEditMin] = useState(tier.minSalesVolume);
    const [editMax, setEditMax] = useState(tier.maxSalesVolume ?? "");

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
                },
            }).unwrap();
            toast.success("Tier updated!", { id: toastId });
            setIsEditing(false);
        } catch (err: any) {
            toast.error(err?.data?.message || "Update failed", { id: toastId });
        }
    };

    const handleToggle = async () => {
        const toastId = toast.loading(tier.isActive ? "Deactivating..." : "Activating...");
        try {
            await toggleStatus(tier._id!).unwrap();
            toast.success(`Tier ${tier.isActive ? "deactivated" : "activated"}!`, { id: toastId });
        } catch (err: any) {
            toast.error(err?.data?.message || "Toggle failed", { id: toastId });
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Delete tier "${tier.name}"? This cannot be undone.`)) return;
        const toastId = toast.loading("Deleting tier...");
        try {
            await deleteTier(tier._id!).unwrap();
            toast.success("Tier deleted!", { id: toastId });
        } catch (err: any) {
            toast.error(err?.data?.message || "Delete failed", { id: toastId });
        }
    };

    return (
        <div className={`relative bg-white rounded-2xl border p-6 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)] transition-all ${tier.isPopular ? "border-[#D97706]" : "border-[#E7E5E4]"} ${!tier.isActive ? "opacity-60" : ""}`}>
            {tier.isPopular && (
                <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1 bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        <Star size={10} fill="currentColor" /> Most Popular
                    </span>
                </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${tier.isActive ? "bg-amber-50 text-[#D97706]" : "bg-gray-100 text-gray-400"}`}>
                        <TrendingUp size={18} />
                    </div>
                    {isEditing ? (
                        <input value={editName} onChange={(e) => setEditName(e.target.value)} className="text-sm font-bold text-[#1A1C1C] border-b border-[#D97706] focus:outline-none bg-transparent uppercase w-40" />
                    ) : (
                        <div>
                            <h3 className="text-sm font-bold text-[#1A1C1C] uppercase tracking-wide">{tier.name}</h3>
                            <span className={`text-[10px] font-semibold uppercase ${tier.isActive ? "text-green-600" : "text-gray-400"}`}>{tier.isActive ? "Active" : "Inactive"}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1.5">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} disabled={isUpdating} className="p-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 cursor-pointer disabled:opacity-50">
                                {isUpdating ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                            </button>
                            <button onClick={() => setIsEditing(false)} className="p-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <X size={14} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)} className="p-1.5 text-[#D97706] hover:bg-amber-50 rounded-lg cursor-pointer" title="Edit">
                                <Pencil size={14} />
                            </button>
                            <button onClick={handleToggle} disabled={isToggling} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg cursor-pointer disabled:opacity-50" title="Toggle">
                                {isToggling ? <Loader2 size={14} className="animate-spin" /> : tier.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                            </button>
                            <button onClick={handleDelete} disabled={isDeleting} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer disabled:opacity-50" title="Delete">
                                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Percentage */}
            <div className="mb-5">
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <input type="number" step="0.1" value={editPercentage} onChange={(e) => setEditPercentage(Number(e.target.value))} className="text-4xl font-extrabold text-[#1A1C1C] border-b border-[#D97706] focus:outline-none bg-transparent w-20" />
                        <span className="text-2xl font-bold text-[#D97706]">%</span>
                    </div>
                ) : (
                    <div className="text-4xl font-extrabold text-[#1A1C1C]">
                        {tier.percentage}
                        <span className="text-2xl text-[#D97706] ml-0.5">%</span>
                    </div>
                )}
                <p className="text-xs text-[#78716C] mt-1">Profit margin</p>
            </div>

            {/* Volume Range */}
            <div className="border-t border-[#F5F5F4] pt-4 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#78716C] font-semibold uppercase">Sales Volume Range</span>
                </div>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <input type="number" value={editMin} onChange={(e) => setEditMin(Number(e.target.value))} className="w-24 text-xs px-2 py-1 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706]" placeholder="Min" />
                        <ChevronRight size={14} className="text-[#78716C]" />
                        <input type="number" value={editMax} onChange={(e) => setEditMax(e.target.value)} className="w-24 text-xs px-2 py-1 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706]" placeholder="Max (∞)" />
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#1A1C1C]">
                        <span>SEK {tier.minSalesVolume.toLocaleString()}</span>
                        <ChevronRight size={14} className="text-[#78716C]" />
                        <span>{tier.maxSalesVolume ? `SEK ${tier.maxSalesVolume.toLocaleString()}` : "Unlimited ∞"}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProfitCards = () => {
    const { data: tiers, isLoading, isFetching } = useGetAllTiersQuery();
    console.log("Tires data", tiers);

    if (isLoading) {
        return (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="mt-8 bg-white rounded-2xl border border-[#E7E5E4] p-12 text-center">
                <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D97706]">
                    <TrendingUp size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#1A1C1C] mb-2">No tiers configured</h3>
                <p className="text-sm text-[#78716C]">Add your first tier using the button above.</p>
            </div>
        );
    }

    return (
        <div className={`mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isFetching ? "opacity-70 pointer-events-none" : ""}`}>
            {tiers.map((tier) => (
                <TierCard key={tier._id} tier={tier} />
            ))}
        </div>
    );
};

export default ProfitCards;
