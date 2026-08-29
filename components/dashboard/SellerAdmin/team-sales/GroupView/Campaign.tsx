"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Store, Calendar, Pencil, Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { useGetGroupByIdQuery } from "@/redux/features/group/groupApi";
import { TCampaign, useGetCampaignsByGroupQuery, useUpdateCampaignMutation } from "@/redux/features/campaign/campaignApi";
import { CreateCampaignForm } from "./CreateCampaignForm";

interface CampaignProps {
    groupId: string;
}

export default function Campaign({ groupId }: CampaignProps) {
    // const { data: groupResponse } = useGetGroupByIdQuery(groupId);
    const { data: campaignResponse, isLoading } = useGetCampaignsByGroupQuery({ groupId });
    const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [editTarget, setEditTarget] = useState("");
    const [editEndDate, setEditEndDate] = useState("");

    const campaigns: TCampaign[] = campaignResponse?.data || [];

    // 21-Day Date Constraints for HTML native date picker min/max
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 21);

    const formatDateStr = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const todayStr = formatDateStr(today);
    const maxDateStr = formatDateStr(maxDate);

    const handleSaveEdit = async (campaign: TCampaign) => {
        if (!campaign._id) return;
        if (!editName.trim() || !editDesc.trim()) {
            toast.error("Name and description cannot be empty");
            return;
        }
        if (editTarget) {
            const targetNum = Number(editTarget);
            if (isNaN(targetNum) || targetNum <= 0) {
                toast.error("Target goal must be a positive number");
                return;
            }
            if (targetNum > 99999) {
                toast.error("Target goal cannot exceed 99,999 SEK");
                return;
            }
        }
        if (editEndDate) {
            const parts = editEndDate.split("-");
            if (parts.length === 3) {
                const year = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1;
                const day = parseInt(parts[2], 10);
                const d = new Date(year, month, day);
                const checkToday = new Date();
                checkToday.setHours(0, 0, 0, 0);
                const checkMax = new Date(checkToday);
                checkMax.setDate(checkToday.getDate() + 21);
                checkMax.setHours(23, 59, 59, 999);

                if (d < checkToday || d > checkMax) {
                    toast.error("End date must be between today and 21 days from today");
                    return;
                }
            }
        }

        const toastId = toast.loading("Updating campaign...");
        try {
            const updatePayload: Record<string, any> = {
                name: editName,
                shortDescription: editDesc,
            };
            if (editTarget) updatePayload.target = Math.min(Number(editTarget), 99999);
            if (editEndDate) {
                const parts = editEndDate.split("-");
                const year = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1;
                const day = parseInt(parts[2], 10);
                updatePayload.endDate = new Date(year, month, day, 23, 59, 59);
            }

            await updateCampaign({
                campaignId: campaign._id,
                data: updatePayload,
            }).unwrap();
            toast.success("Campaign updated!", { id: toastId });
            setEditingId(null);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update", { id: toastId });
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] flex items-center justify-center min-h-50">
                <Loader2 className="animate-spin text-[#D97706]" size={28} />
            </div>
        );
    }

    return (
        <div className="space-y-6 mb-6">
            {/* ── All campaigns Grid (3 in a row on large screens) ──────────────────── */}
            {campaigns.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => {
                        const isEditing = editingId === campaign._id;
                        const isCampaignActive = campaign.status === "ACTIVE";
                        const statusUpper = (campaign.status || "").toUpperCase();
                        const canEdit = statusUpper !== "FULFILMENT" && statusUpper !== "COMPLETED";

                        return (
                            <div key={campaign._id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex justify-between items-start border-b border-[#F5F5F4] pb-4 mb-4 gap-3">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <div className={`p-2.5 rounded-xl shrink-0 ${isCampaignActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500"}`}>
                                                <Store size={20} />
                                            </div>
                                            {isEditing ? (
                                                <div className="space-y-3 w-full">
                                                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Campaign name" className="h-9 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1 font-bold text-sm" />
                                                    <Textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Short description" className="min-h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1 text-xs" />
                                                    <div className="grid grid-cols-1 gap-2 pt-1">
                                                        <div>
                                                            <label className="block text-[10px] font-semibold text-[#78716C] uppercase mb-1">Target Goal (SEK)</label>
                                                            <Input
                                                                type="number"
                                                                max={99999}
                                                                value={editTarget}
                                                                onChange={(e) => {
                                                                    const val = parseInt(e.target.value, 10);
                                                                    if (!isNaN(val) && val > 99999) {
                                                                        setEditTarget("99999");
                                                                    } else {
                                                                        setEditTarget(e.target.value);
                                                                    }
                                                                }}
                                                                placeholder="Target Goal"
                                                                className="h-8 border-[#F5F5F4] focus:border-[#D97706] text-xs font-bold"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-semibold text-[#78716C] uppercase mb-1">End Date</label>
                                                            <Input
                                                                type="date"
                                                                min={todayStr}
                                                                max={maxDateStr}
                                                                onClick={(e) => {
                                                                    try {
                                                                        e.currentTarget.showPicker();
                                                                    } catch {}
                                                                }}
                                                                value={editEndDate}
                                                                onChange={(e) => setEditEndDate(e.target.value)}
                                                                className="h-8 border-[#F5F5F4] focus:border-[#D97706] text-xs font-bold cursor-pointer"
                                                            />
                                                            <p className="text-[10px] text-[#7C5800] mt-0.5">Maximum 3-week/21-day period</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-base font-bold text-[#1A1C1C] truncate">{campaign.name}</h3>
                                                    <p className="text-xs text-[#78716C] line-clamp-2 mt-0.5">{campaign.shortDescription}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {isEditing ? (
                                                <div className="flex flex-col gap-1">
                                                    <button onClick={() => handleSaveEdit(campaign)} disabled={isUpdating} className="px-2.5 py-1 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1">
                                                        {isUpdating && <Loader2 className="animate-spin" size={12} />}
                                                        Save
                                                    </button>
                                                    <button onClick={() => setEditingId(null)} className="px-2.5 py-1 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-semibold cursor-pointer">
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {isCampaignActive ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide bg-green-50 text-green-700 border border-green-200">Active</span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide bg-red-50 text-red-600 border border-red-200">{campaign.status || "Expired"}</span>
                                                    )}
                                                    {canEdit && (
                                                        <button
                                                            onClick={() => {
                                                                setEditingId(campaign._id!);
                                                                setEditName(campaign.name);
                                                                setEditDesc(campaign.shortDescription);
                                                                setEditTarget(String(campaign.target || ""));
                                                                setEditEndDate(campaign.endDate ? new Date(campaign.endDate).toISOString().split("T")[0] : "");
                                                            }}
                                                            className="p-1.5 text-[#D97706] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={15} />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* SELLERS, SOLD and TARGET metrics box */}
                                    <div className="bg-[#F3F3F3] p-3 sm:py-4 sm:px-5 rounded-[20px] sm:rounded-[24px] mb-4">
                                        {(() => {
                                            const totalSellers = campaign.sellersCount ?? (campaign as any).totalSellers ?? (campaign as any).sellerCount ?? 0;
                                            return (
                                                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                                    <div className="min-w-0">
                                                        <div className="text-[#78716C] text-[10px] sm:text-xs uppercase font-semibold truncate">SELLERS</div>
                                                        <div className="text-[#D97706] font-bold text-sm sm:text-base lg:text-lg truncate">{totalSellers}</div>
                                                    </div>
                                                    <div className="text-center min-w-0">
                                                        <div className="text-[#78716C] text-[10px] sm:text-xs uppercase font-semibold truncate">SOLD</div>
                                                        <div className="text-[#D97706] font-bold text-sm sm:text-base lg:text-lg truncate">{campaign.totalPackagesSold || 0} pcs</div>
                                                    </div>
                                                    <div className="text-right min-w-0">
                                                        <div className="text-[#78716C] text-[10px] sm:text-xs uppercase font-semibold truncate">TARGET</div>
                                                        <div className="text-[#1A1C1C] font-bold text-sm sm:text-base lg:text-lg truncate">SEK {(campaign.target || 0).toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    {/* Tier Progress Details Box */}
                                    <div className="bg-[#F3F3F3] p-3 sm:py-4 sm:px-5 rounded-[20px] sm:rounded-[24px] mb-4">
                                        {(() => {
                                            const totalSold = campaign.totalPackagesSold || 0;
                                            const nextMin = campaign.nextTier?.minSalesVolume || (campaign.currentTier?.maxSalesVolume ? campaign.currentTier.maxSalesVolume + 1 : 150);
                                            const currentMin = campaign.currentTier?.minSalesVolume || 0;
                                            const range = Math.max(1, nextMin - currentMin);
                                            const progressPct = campaign.nextTier ? Math.min(100, Math.max(0, Math.round(((totalSold - currentMin) / range) * 100))) : 100;

                                            return (
                                                <>
                                                    <div className="mb-3 sm:mb-4">
                                                        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                                                            <span className="text-[#78716C] text-xs sm:text-sm font-semibold">Tier Progress</span>
                                                            <span className="text-[#D97706] font-bold text-xs sm:text-sm">{progressPct}%</span>
                                                        </div>
                                                        <div className="w-full h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
                                                            <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                                        <div className="min-w-0">
                                                            <div className="text-[#78716C] text-[10px] sm:text-xs uppercase font-semibold truncate">CURRENT TIER</div>
                                                            <div className="text-[#D97706] font-bold text-xs sm:text-sm md:text-base truncate" title={campaign.currentTier?.name || "No Tier"}>
                                                                {campaign.currentTier ? `${campaign.currentTier.percentage}%` : "0%"}
                                                            </div>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-[#78716C] text-[10px] sm:text-xs text-right uppercase font-semibold truncate">NEXT TIER NEEDED</div>
                                                            <div className="text-[#1A1C1C] font-bold text-xs sm:text-sm md:text-base text-right truncate">
                                                                {campaign.nextTier ? (
                                                                    <>
                                                                        {campaign.packagesNeededForNextTier || 0} PKGS <span className="text-[#D97706] font-bold">({campaign.nextTier.percentage}%)</span>
                                                                    </>
                                                                ) : (
                                                                    "MAX TIER"
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>

                                    {/* Deadline / Status row */}
                                    <div className="mb-2 min-h-8 flex items-center w-full">
                                        {(() => {
                                            const endDate = new Date(campaign.endDate);
                                            const today = new Date();
                                            const formattedEndDate = endDate.toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric", timeZone: "UTC" });
                                            const isEnded = campaign.status === "FULFILMENT" || campaign.status === "COMPLETED";

                                            if (isEnded) {
                                                return (
                                                    <div className="w-full flex items-center justify-between text-xs font-semibold">
                                                        <div className="text-red-500 font-bold flex items-center gap-1.5">
                                                            <Calendar size={15} className="shrink-0" />
                                                            <span>Campaign Ended</span>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            const todayStart = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                                            const endStart = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());
                                            const diffDays = Math.max(0, Math.round((endStart - todayStart) / (1000 * 60 * 60 * 24)));
                                            const daysText = diffDays === 0 ? "Ends today" : `Deadline: In ${diffDays} days`;

                                            return (
                                                <div className="w-full flex items-center justify-between text-xs text-[#78716C] font-semibold flex-wrap gap-1">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={15} className="text-[#D97706] shrink-0" />
                                                        <span>{daysText}</span>
                                                    </span>
                                                    <span className="text-[#1A1C1C] font-bold">{formattedEndDate}</span>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    <div className="pt-3 border-t border-[#F5F5F4]">
                                        <Link
                                            href={`/dashboard/team-sales/${groupId}/${campaign._id}`}
                                            className="w-full h-9 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-4 text-xs font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all cursor-pointer"
                                        >
                                            Manage Campaign
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Start New Campaign Grid Card / Form */}
                    {!showCreateForm ? (
                        <div
                            onClick={() => setShowCreateForm(true)}
                            className="bg-amber-50/50 hover:bg-amber-50 border-2 border-dashed border-[#FFB800]/60 hover:border-[#D97706] rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-70 cursor-pointer transition-all duration-300 group shadow-[0px_0px_20px_0px_rgba(0,0,0,0.02)]"
                        >
                            <div className="w-14 h-14 rounded-full bg-white text-[#D97706] shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Plus size={28} />
                            </div>
                            <h4 className="text-base font-bold text-[#1A1C1C] group-hover:text-[#D97706] transition-colors">Start New Campaign</h4>
                            <p className="text-xs text-[#78716C] mt-1 max-w-50">Define parameters to start accepting sales for your group.</p>
                        </div>
                    ) : (
                        <CreateCampaignForm groupId={groupId} onClose={() => setShowCreateForm(false)} />
                    )}
                </div>
            )}

            {/* ── If no campaigns exist and form is not open ─────────────── */}
            {campaigns.length === 0 && !showCreateForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div
                        onClick={() => setShowCreateForm(true)}
                        className="bg-amber-50/50 hover:bg-amber-50 border-2 border-dashed border-[#FFB800]/60 hover:border-[#D97706] rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group min-h-70"
                    >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#D97706] shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus size={32} />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#1A1C1C] group-hover:text-[#D97706] transition-colors">Start New Campaign</h3>
                        <p className="text-xs text-[#78716C] mt-1">Start a campaign so team members can raise money.</p>
                    </div>
                </div>
            )}

            {/* ── If no campaigns exist and form IS open ──────────────────── */}
            {campaigns.length === 0 && showCreateForm && <CreateCampaignForm groupId={groupId} onClose={() => setShowCreateForm(false)} />}
        </div>
    );
}
