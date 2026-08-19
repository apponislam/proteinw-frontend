"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Award, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCampaignMutation } from "@/redux/features/campaign/campaignApi";

export const campaignFormSchema = z.object({
    name: z.string().min(2, "Campaign name must be at least 2 characters"),
    shortDescription: z.string().min(2, "Short description must be at least 2 characters"),
    target: z.string().min(1, "Target goal is required"),
    endDate: z.string().refine(
        (val) => {
            if (!val) return false;
            const d = new Date(val);
            if (isNaN(d.getTime())) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const maxDate = new Date(today);
            maxDate.setDate(maxDate.getDate() + 21);
            maxDate.setHours(23, 59, 59, 999);
            return d >= today && d <= maxDate;
        },
        { message: "End date must be between today and 21 days from today" }
    ),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;

interface CreateCampaignFormProps {
    groupId: string;
    onClose: () => void;
    variant?: "inline" | "standalone";
}

export function CreateCampaignForm({ groupId, onClose, variant = "standalone" }: CreateCampaignFormProps) {
    const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CampaignFormValues>({
        resolver: zodResolver(campaignFormSchema),
    });

    // 21-Day Date Constraints
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
            onClose();
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to start campaign", { id: toastId });
        }
    };

    if (variant === "inline") {
        return (
            <div className="bg-white p-5 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] flex flex-col justify-between h-full">
                <div>
                    <div className="flex justify-between items-center border-b border-[#F5F5F4] pb-3 mb-4">
                        <h4 className="text-sm font-bold text-[#1A1C1C]">Start Campaign</h4>
                        <button type="button" onClick={onClose} className="text-xs text-[#78716C] hover:text-[#1A1C1C] transition-colors cursor-pointer">
                            Cancel
                        </button>
                    </div>
                    <form id="create-campaign-form-inline" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                            <Input
                                type="date"
                                min={todayStr}
                                max={maxDateStr}
                                onClick={(e) => {
                                    try {
                                        e.currentTarget.showPicker();
                                    } catch {}
                                }}
                                {...register("endDate")}
                                className="h-9 text-xs border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] cursor-pointer"
                            />
                            <p className="text-[10px] text-[#7C5800]">Maximum 3-week/21-day period</p>
                            {errors.endDate && <p className="text-red-500 text-[10px]">{errors.endDate.message}</p>}
                        </div>
                    </form>
                </div>
                <div className="pt-4 border-t border-[#F5F5F4] mt-4 flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-3 py-1.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-semibold cursor-pointer">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="create-campaign-form-inline"
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
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] max-w-xl">
            <div className="border-b border-[#F5F5F4] pb-4 mb-6">
                <h3 className="text-xl font-bold text-[#1A1C1C]">Start Fundraising Campaign</h3>
                <p className="text-sm text-[#78716C]">Define campaign parameters to start accepting sales.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        <Input
                            type="date"
                            min={todayStr}
                            max={maxDateStr}
                            onClick={(e) => {
                                try {
                                    e.currentTarget.showPicker();
                                } catch {}
                            }}
                            {...register("endDate")}
                            className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1 text-sm cursor-pointer"
                        />
                        <p className="text-xs text-[#7C5800]">Maximum 3-week/21-day period</p>
                        {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
                    </div>
                </div>

                <div className="pt-4 border-t border-[#F5F5F4] mt-6 flex justify-end items-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
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
            </form>
        </div>
    );
}
