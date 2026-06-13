"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Store, Calendar, Award, Pencil, ShieldAlert, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetGroupByIdQuery } from "@/redux/features/group/groupApi";
import {
    useGetCampaignsByGroupQuery,
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
} from "@/redux/features/campaign/campaignApi";

interface CampaignProps {
    groupId: string;
}

const campaignFormSchema = z.object({
    name: z.string().min(2, "Campaign name must be at least 2 characters"),
    shortDescription: z.string().min(2, "Short description must be at least 2 characters"),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end date",
    }),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

export default function Campaign({ groupId }: CampaignProps) {
    const { data: groupResponse } = useGetGroupByIdQuery(groupId);
    const { data: campaignResponse, isLoading } = useGetCampaignsByGroupQuery({ groupId });
    const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
    const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isEditingActiveCampaign, setIsEditingActiveCampaign] = useState(false);
    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CampaignFormValues>({
        resolver: zodResolver(campaignFormSchema),
    });

    const groupGoal = groupResponse?.data?.goal;
    const campaigns = campaignResponse?.data || [];
    const activeCampaign = campaigns.find(
        (c) => c.isActive && !c.isDeleted && new Date(c.endDate) > new Date()
    );

    const handleSaveEdit = async () => {
        if (!activeCampaign?._id) {
            toast.error("No active campaign found to update");
            return;
        }
        if (!editName.trim() || !editDesc.trim()) {
            toast.error("Name and description cannot be empty");
            return;
        }
        const toastId = toast.loading("Updating campaign...");
        try {
            await updateCampaign({
                campaignId: activeCampaign._id,
                data: {
                    name: editName,
                    shortDescription: editDesc,
                },
            }).unwrap();
            toast.success("Campaign updated successfully!", { id: toastId });
            setIsEditingActiveCampaign(false);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update campaign", { id: toastId });
        }
    };

    const onSubmit = async (data: CampaignFormValues) => {
        const toastId = toast.loading("Starting campaign...");
        try {
            await createCampaign({
                groupId,
                name: data.name,
                shortDescription: data.shortDescription,
                target: groupGoal || 0,
                endDate: new Date(data.endDate),
            }).unwrap();
            toast.success("Campaign started successfully!", { id: toastId });
            setShowCreateForm(false);
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to start campaign", { id: toastId });
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] flex items-center justify-center min-h-[200px]">
                <Loader2 className="animate-spin text-[#D97706]" size={28} />
            </div>
        );
    }

    if (activeCampaign) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#F5F5F4] pb-6 mb-6 gap-4">
                    <div className="flex items-center gap-3 flex-1 w-full">
                        <div className="p-2.5 bg-green-50 rounded-xl text-green-700 shrink-0">
                            <Store size={20} />
                        </div>
                        {isEditingActiveCampaign ? (
                            <div className="space-y-3 w-full max-w-xl">
                                <Input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="Campaign name"
                                    className="h-10 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1 font-bold text-lg"
                                />
                                <Textarea
                                    value={editDesc}
                                    onChange={(e) => setEditDesc(e.target.value)}
                                    placeholder="Campaign short description"
                                    className="min-h-[60px] border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1 text-sm"
                                />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-[#1A1C1C]">Active Campaign: {activeCampaign.name}</h3>
                                <p className="text-sm text-[#78716C]">{activeCampaign.shortDescription}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        {isEditingActiveCampaign ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSaveEdit}
                                    disabled={isUpdating}
                                    className="px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50 flex items-center gap-1"
                                >
                                    {isUpdating && <Loader2 className="animate-spin" size={12} />}
                                    <span>Save</span>
                                </button>
                                <button
                                    onClick={() => setIsEditingActiveCampaign(false)}
                                    className="px-3 py-1.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-semibold cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide bg-green-50 text-green-700 border border-green-200">
                                    Live / Active
                                </span>
                                <button
                                    onClick={() => {
                                        setEditName(activeCampaign.name);
                                        setEditDesc(activeCampaign.shortDescription);
                                        setIsEditingActiveCampaign(true);
                                    }}
                                    className="p-2 text-[#D97706] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                    title="Edit Campaign Details"
                                >
                                    <Pencil size={18} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Target */}
                    <div className="p-4 bg-[#FDFDFD] border border-[#F5F5F4] rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg text-[#D97706]">
                            <Award size={18} />
                        </div>
                        <div>
                            <span className="block text-[10px] text-[#78716C] font-semibold uppercase">Campaign Target</span>
                            <span className="text-sm font-bold text-[#1A1C1C]">SEK {activeCampaign.target.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="p-4 bg-[#FDFDFD] border border-[#F5F5F4] rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg text-[#D97706]">
                            <Calendar size={18} />
                        </div>
                        <div>
                            <span className="block text-[10px] text-[#78716C] font-semibold uppercase">End Date</span>
                            <span className="text-sm font-bold text-[#1A1C1C]">
                                {new Date(activeCampaign.endDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Campaign Code */}
                    <div className="p-4 bg-[#FDFDFD] border border-[#F5F5F4] rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg text-[#D97706]">
                            <Store size={18} />
                        </div>
                        <div>
                            <span className="block text-[10px] text-[#78716C] font-semibold uppercase">Campaign Code</span>
                            <span className="text-sm font-bold text-[#1A1C1C]">{activeCampaign.code}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] mb-6">
            {!showCreateForm ? (
                <div className="text-center py-8 max-w-lg mx-auto">
                    <div className="h-12 w-12 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center mx-auto mb-4">
                        <ShieldAlert size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1C1C] mb-2">No Active Fundraising Campaign</h3>
                    <p className="text-sm text-[#78716C] mb-6">
                        Start a new campaign so team members can share the storefront link to collect orders and raise money.
                    </p>
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all cursor-pointer"
                    >
                        Start New Campaign
                    </button>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center border-b border-[#F5F5F4] pb-4 mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-[#1A1C1C]">Start Fundraising Campaign</h3>
                            <p className="text-sm text-[#78716C]">Define campaign parameters to start accepting sales.</p>
                        </div>
                        <button
                            onClick={() => setShowCreateForm(false)}
                            className="text-sm text-[#78716C] hover:text-[#1A1C1C] transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#1A1C1C]">Campaign Name</label>
                            <Input
                                placeholder="e.g. Autumn Bake Sale 2026"
                                {...register("name")}
                                className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#1A1C1C]">Short Description</label>
                            <Textarea
                                placeholder="Describe what you are raising money for..."
                                {...register("shortDescription")}
                                className="min-h-[100px] border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1"
                            />
                            {errors.shortDescription && (
                                <p className="text-red-500 text-xs">{errors.shortDescription.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#1A1C1C]">End Date</label>
                                <Input
                                    type="date"
                                    {...register("endDate")}
                                    className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1"
                                />
                                {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
                            </div>

                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3 h-12">
                                <div className="text-[#D97706]">
                                    <Award size={18} />
                                </div>
                                <div>
                                    <span className="block text-[9px] text-[#78716C] font-semibold uppercase leading-none mb-1">
                                        Campaign Target Goal
                                    </span>
                                    <span className="text-xs font-bold text-[#1A1C1C] leading-none">
                                        SEK {(groupGoal || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isCreating}
                            className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {isCreating ? (
                                <>
                                    <Loader2 className="animate-spin" size={16} />
                                    <span>Starting Campaign...</span>
                                </>
                            ) : (
                                "Start Campaign"
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
