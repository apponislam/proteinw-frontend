"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Store, Calendar, Award, Pencil, ShieldAlert, Loader2, AlertTriangle, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetGroupByIdQuery } from "@/redux/features/group/groupApi";
import { TCampaign, useGetCampaignsByGroupQuery, useCreateCampaignMutation, useUpdateCampaignMutation } from "@/redux/features/campaign/campaignApi";

interface CampaignProps {
    groupId: string;
}

const campaignFormSchema = z.object({
    name: z.string().min(2, "Campaign name must be at least 2 characters"),
    shortDescription: z.string().min(2, "Short description must be at least 2 characters"),
    target: z.string().min(1, "Target goal is required"),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid end date" }),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

export default function Campaign({ groupId }: CampaignProps) {
    const { data: groupResponse } = useGetGroupByIdQuery(groupId);
    const { data: campaignResponse, isLoading } = useGetCampaignsByGroupQuery({ groupId });
    const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
    const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [editTarget, setEditTarget] = useState("");
    const [editEndDate, setEditEndDate] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CampaignFormValues>({
        resolver: zodResolver(campaignFormSchema),
    });
    const campaigns: TCampaign[] = campaignResponse?.data || [];
    // console.log("campaigns", campaigns);

    const handleSaveEdit = async (campaign: TCampaign) => {
        if (!campaign._id) return;
        if (!editName.trim() || !editDesc.trim()) {
            toast.error("Name and description cannot be empty");
            return;
        }
        const toastId = toast.loading("Updating campaign...");
        try {
            const updatePayload: Record<string, any> = {
                name: editName,
                shortDescription: editDesc,
            };
            if (editTarget) updatePayload.target = Number(editTarget);
            if (editEndDate) updatePayload.endDate = new Date(editEndDate);

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

    const onSubmit = async (data: CampaignFormValues) => {
        const toastId = toast.loading("Starting campaign...");
        try {
            await createCampaign({
                groupId,
                name: data.name,
                shortDescription: data.shortDescription,
                target: Number(data.target),
                endDate: new Date(data.endDate),
            }).unwrap();
            toast.success("Campaign started!", { id: toastId });
            setShowCreateForm(false);
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to start campaign", { id: toastId });
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
            {/* ── All campaigns Grid (3 in a row) ──────────────────── */}
            {campaigns.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => {
                        const isEditing = editingId === campaign._id;

                        // Same card design for active and expired
                        const safeDate = (d: Date | string | null | undefined) => {
                            if (!d) return "N/A";
                            const parsed = new Date(d);
                            return isNaN(parsed.getTime()) ? "N/A" : parsed.toLocaleDateString();
                        };

                        const deletedDate = new Date(campaign.endDate);
                        deletedDate.setMonth(deletedDate.getMonth() + 2);
                        const deletesIn = Math.max(0, Math.ceil((deletedDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

                        const isCampaignActive = campaign.status === "ACTIVE";

                        return (
                            <div key={campaign._id} className="bg-white p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] flex flex-col justify-between h-full">
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
                                                            <Input type="number" value={editTarget} onChange={(e) => setEditTarget(e.target.value)} placeholder="Target Goal" className="h-8 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] text-xs font-bold" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-semibold text-[#78716C] uppercase mb-1">End Date</label>
                                                            <Input type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} className="h-8 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] text-xs font-bold" />
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
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Metrics breakdown */}
                                    <div className="space-y-2.5">
                                        <div className="p-3 bg-[#FDFDFD] border border-[#F5F5F4] rounded-xl flex items-center gap-3">
                                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706] shrink-0">
                                                <Award size={16} />
                                            </div>
                                            <div>
                                                <span className="block text-[10px] text-[#78716C] font-semibold uppercase">Campaign Target</span>
                                                <span className="text-xs font-bold text-[#1A1C1C]">SEK {campaign.target.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className={`p-3 border rounded-xl flex items-center gap-3 ${!isCampaignActive ? "bg-red-50 border-red-100" : "bg-[#FDFDFD] border-[#F5F5F4]"}`}>
                                            <div className={`p-2 rounded-lg shrink-0 ${!isCampaignActive ? "bg-red-100 text-red-500" : "bg-amber-50 text-[#D97706]"}`}>
                                                <Calendar size={16} />
                                            </div>
                                            <div>
                                                <span className="block text-[10px] text-[#78716C] font-semibold uppercase">End Date</span>
                                                <span className="text-xs font-bold text-[#1A1C1C]">{safeDate(campaign.endDate)}</span>
                                                {!isCampaignActive && <span className="block text-[9px] text-red-500 font-semibold mt-0.5">{deletesIn > 0 ? `Auto-deleted in ${deletesIn} days` : "Scheduled for deletion"}</span>}
                                            </div>
                                        </div>

                                        <div className="p-3 bg-[#FDFDFD] border border-[#F5F5F4] rounded-xl flex items-center gap-3">
                                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706] shrink-0">
                                                <Store size={16} />
                                            </div>
                                            <div>
                                                <span className="block text-[10px] text-[#78716C] font-semibold uppercase">Campaign Code</span>
                                                <span className="text-xs font-bold text-[#1A1C1C]">{campaign.code}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-[#F5F5F4]">
                                    <Link
                                        href={`/dashboard/team-sales/${groupId}/${campaign._id}`}
                                        className="w-full h-9 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-4 text-xs font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all cursor-pointer"
                                    >
                                        Manage Campaign
                                    </Link>
                                </div>
                            </div>
                        );
                    })}

                    {/* Start New Campaign Grid Card / Inline Form */}
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
                        <div className="bg-white p-5 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] flex flex-col justify-between h-full">
                            <div>
                                <div className="flex justify-between items-center border-b border-[#F5F5F4] pb-3 mb-4">
                                    <h4 className="text-sm font-bold text-[#1A1C1C]">Start Campaign</h4>
                                    <button onClick={() => setShowCreateForm(false)} className="text-xs text-[#78716C] hover:text-[#1A1C1C] transition-colors cursor-pointer">
                                        Cancel
                                    </button>
                                </div>
                                <form id="create-campaign-form" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-[#1A1C1C]">Campaign Name</label>
                                        <Input placeholder="e.g. Autumn Bake Sale" {...register("name")} className="h-9 text-xs border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706]" />
                                        {errors.name && <p className="text-red-500 text-[10px]">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-[#1A1C1C]">Short Description</label>
                                        <Textarea placeholder="Describe your goal..." {...register("shortDescription")} className="min-h-16 text-xs border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706]" />
                                        {errors.shortDescription && <p className="text-red-500 text-[10px]">{errors.shortDescription.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-[#1A1C1C]">Target Goal (SEK)</label>
                                        <Input type="number" placeholder="5000" {...register("target")} className="h-9 text-xs border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706]" />
                                        {errors.target && <p className="text-red-500 text-[10px]">{errors.target.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-[#1A1C1C]">End Date</label>
                                        <Input type="date" {...register("endDate")} className="h-9 text-xs border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706]" />
                                        {errors.endDate && <p className="text-red-500 text-[10px]">{errors.endDate.message}</p>}
                                    </div>
                                </form>
                            </div>
                            <div className="pt-4 border-t border-[#F5F5F4] mt-4 flex justify-end gap-2">
                                <button onClick={() => setShowCreateForm(false)} className="px-3 py-1.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-semibold cursor-pointer">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form="create-campaign-form"
                                    disabled={isCreating}
                                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-linear-to-r from-[#7C5800] to-[#FFB800] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {isCreating ? (
                                        <>
                                            <Loader2 className="animate-spin" size={12} />
                                            <span>Starting...</span>
                                        </>
                                    ) : (
                                        "Start Campaign"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── If no campaigns exist and form is not open ─────────────── */}
            {campaigns.length === 0 && !showCreateForm && (
                <div
                    onClick={() => setShowCreateForm(true)}
                    className="bg-amber-50/50 hover:bg-amber-50 border-2 border-dashed border-[#FFB800]/60 hover:border-[#D97706] rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group max-w-md mx-auto"
                >
                    <div className="w-16 h-16 rounded-full bg-white text-[#D97706] shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#D97706] transition-colors">Start New Campaign</h3>
                    <p className="text-xs text-[#78716C] mt-1">Start a campaign so team members can raise money.</p>
                </div>
            )}

            {/* ── If no campaigns exist and form IS open ──────────────────── */}
            {campaigns.length === 0 && showCreateForm && (
                <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] max-w-xl mx-auto">
                    <div className="flex justify-between items-center border-b border-[#F5F5F4] pb-4 mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-[#1A1C1C]">Start Fundraising Campaign</h3>
                            <p className="text-sm text-[#78716C]">Define campaign parameters to start accepting sales.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setShowCreateForm(false)} className="text-sm text-[#78716C] hover:text-[#1A1C1C] transition-colors cursor-pointer">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="create-campaign-form"
                                disabled={isCreating}
                                className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {isCreating ? (
                                    <>
                                        <Loader2 className="animate-spin" size={14} />
                                        <span>Starting...</span>
                                    </>
                                ) : (
                                    "Start Campaign"
                                )}
                            </button>
                        </div>
                    </div>
                    <form id="create-campaign-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#1A1C1C]">Campaign Name</label>
                            <Input placeholder="e.g. Autumn Bake Sale 2026" {...register("name")} className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#1A1C1C]">Short Description</label>
                            <Textarea placeholder="Describe what you are raising money for..." {...register("shortDescription")} className="min-h-25 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                            {errors.shortDescription && <p className="text-red-500 text-xs">{errors.shortDescription.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#1A1C1C]">Target Goal (SEK)</label>
                                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3 h-12">
                                    <div className="text-[#D97706] shrink-0">
                                        <Award size={18} />
                                    </div>
                                    <input type="number" placeholder="e.g. 5000" {...register("target")} className="w-full bg-transparent text-xs font-bold text-[#1A1C1C] focus:outline-none p-0 border-none h-5" />
                                </div>
                                {errors.target && <p className="text-red-500 text-xs">{errors.target.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#1A1C1C]">End Date</label>
                                <Input type="date" {...register("endDate")} className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                                {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
