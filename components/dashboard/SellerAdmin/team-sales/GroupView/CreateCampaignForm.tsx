"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Award, Loader2, Users, Search, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCampaignMutation } from "@/redux/features/campaign/campaignApi";
import { useGetGroupSellersQuery } from "@/redux/features/auth/authApi";

export const campaignFormSchema = z.object({
    name: z.string().min(2, "Campaign name must be at least 2 characters"),
    shortDescription: z.string().min(2, "Short description must be at least 2 characters"),
    target: z
        .string()
        .min(1, "Target goal is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Target goal must be a positive number"),
    endDate: z.string().refine(
        (val) => {
            if (!val) return false;
            const parts = val.split("-");
            if (parts.length !== 3) return false;
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const d = new Date(year, month, day);
            if (isNaN(d.getTime())) return false;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const maxDate = new Date(today);
            maxDate.setDate(today.getDate() + 21);
            maxDate.setHours(23, 59, 59, 999);

            return d >= today && d <= maxDate;
        },
        { message: "End date must be between today and 21 days from today" },
    ),
    addAllGroupSellers: z.boolean(),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;

interface CreateCampaignFormProps {
    groupId: string;
    onClose: () => void;
}

// ── Manage Campaign Sellers Modal Component ─────────────────────────────
interface ManageCampaignSellersModalProps {
    groupId: string;
    selectedSellerIds: string[];
    onSave: (sellerIds: string[]) => void;
    onClose: () => void;
}

function ManageCampaignSellersModal({ groupId, selectedSellerIds, onSave, onClose }: ManageCampaignSellersModalProps) {
    const { data: sellersData, isLoading } = useGetGroupSellersQuery(groupId);
    const sellers = sellersData?.data || [];

    const [tempSelected, setTempSelected] = useState<string[]>(selectedSellerIds);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSellers = sellers.filter((seller) => seller.name?.toLowerCase().includes(searchQuery.toLowerCase()) || seller.email?.toLowerCase().includes(searchQuery.toLowerCase()));

    const toggleSeller = (id: string) => {
        if (tempSelected.includes(id)) {
            setTempSelected(tempSelected.filter((sId) => sId !== id));
        } else {
            setTempSelected([...tempSelected, id]);
        }
    };

    const handleSelectAll = () => {
        if (tempSelected.length === sellers.length) {
            setTempSelected([]);
        } else {
            setTempSelected(sellers.map((s) => s._id));
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
                        <Input placeholder="Search sellers by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-10 text-xs border-[#E7E5E4] focus:border-[#7C5800] focus:ring-[#7C5800]" />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                        <span className="font-semibold text-gray-700">
                            {tempSelected.length} of {sellers.length} sellers selected
                        </span>
                        {sellers.length > 0 && (
                            <button type="button" onClick={handleSelectAll} className="text-[#D97706] font-semibold hover:underline cursor-pointer">
                                {tempSelected.length === sellers.length ? "Deselect All" : "Select All"}
                            </button>
                        )}
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
                            filteredSellers.map((seller) => {
                                const isChecked = tempSelected.includes(seller._id);
                                return (
                                    <label key={seller._id} onClick={() => toggleSeller(seller._id)} className="flex items-center justify-between p-3 hover:bg-gray-50/80 cursor-pointer transition-colors select-none">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 text-[#7C5800] font-bold text-xs flex items-center justify-center shrink-0">{seller.name ? seller.name.charAt(0).toUpperCase() : "S"}</div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-[#1A1C1C] truncate">{seller.name || "Unnamed Member"}</p>
                                                <p className="text-[11px] text-[#78716C] truncate">{seller.email}</p>
                                            </div>
                                        </div>

                                        {/* Checkbox */}
                                        <div className="relative shrink-0 ml-3">
                                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${isChecked ? "border-[#7C5800] bg-[#7C5800]" : "border-gray-300"}`}>{isChecked && <Check size={14} className="text-white stroke-3" />}</div>
                                        </div>
                                    </label>
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

// ── Main Create Campaign Form Component ─────────────────────────────────
export function CreateCampaignForm({ groupId, onClose }: CreateCampaignFormProps) {
    const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();

    const [selectedSellerIds, setSelectedSellerIds] = useState<string[]>([]);
    const [isManageSellersOpen, setIsManageSellersOpen] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<CampaignFormValues>({
        resolver: zodResolver(campaignFormSchema),
        defaultValues: {
            name: "",
            shortDescription: "",
            target: "",
            endDate: "",
            addAllGroupSellers: false,
        },
    });

    const addAllGroupSellersValue = watch("addAllGroupSellers");

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

    const onSubmit = async (data: CampaignFormValues) => {
        const toastId = toast.loading("Starting campaign...");
        try {
            const parts = data.endDate.split("-");
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const endDateObj = new Date(year, month, day, 23, 59, 59);

            await createCampaign({
                groupId,
                name: data.name,
                shortDescription: data.shortDescription,
                target: Number(data.target),
                endDate: endDateObj,
                addAllGroupSellers: data.addAllGroupSellers,
                sellerIds: !data.addAllGroupSellers && selectedSellerIds.length > 0 ? selectedSellerIds : undefined,
            }).unwrap();
            toast.success("Campaign started!", { id: toastId });
            onClose();
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to start campaign", { id: toastId });
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] max-w-xl shadow-sm">
                <div className="border-b border-[#F5F5F4] pb-4 mb-6">
                    <h3 className="text-lg font-bold text-[#1A1C1C]">Start Fundraising Campaign</h3>
                    <p className="text-xs text-[#78716C]">Define campaign parameters to start accepting sales.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#1A1C1C]">Campaign Name</label>
                        <Input placeholder="e.g. Autumn Bake Sale 2026" {...register("name")} className="h-10 text-xs border-[#E7E5E4] focus:border-[#7C5800] focus:ring-[#7C5800]" />
                        {errors.name && <p className="text-red-500 text-[11px]">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#1A1C1C]">Short Description</label>
                        <Textarea placeholder="Describe what you are raising money for..." {...register("shortDescription")} className="min-h-20 text-xs border-[#E7E5E4] focus:border-[#7C5800] focus:ring-[#7C5800]" />
                        {errors.shortDescription && <p className="text-red-500 text-[11px]">{errors.shortDescription.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#1A1C1C]">Target Goal (SEK)</label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3 h-10">
                                <div className="text-[#D97706] shrink-0">
                                    <Award size={18} />
                                </div>
                                <input type="number" placeholder="e.g. 5000" {...register("target")} className="w-full bg-transparent text-xs font-bold text-[#1A1C1C] focus:outline-none p-0 border-none h-5" />
                            </div>
                            {errors.target && <p className="text-red-500 text-[11px]">{errors.target.message}</p>}
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
                                className="h-10 text-xs border-[#E7E5E4] focus:border-[#7C5800] focus:ring-[#7C5800] cursor-pointer"
                            />
                            <p className="text-[11px] text-[#7C5800]">Maximum 3-week/21-day period</p>
                            {errors.endDate && <p className="text-red-500 text-[11px]">{errors.endDate.message}</p>}
                        </div>
                    </div>

                    {/* Custom Site Checkbox */}
                    <div className="pt-2 space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <div className="relative shrink-0">
                                <input type="checkbox" className="sr-only peer" {...register("addAllGroupSellers")} />
                                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-[#7C5800] peer-checked:bg-[#7C5800] flex items-center justify-center transition-all">
                                    {addAllGroupSellersValue && (
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-xs text-gray-700 font-medium">Automatically add all current group members/sellers to this campaign</span>
                        </label>

                        {/* Select Sellers / Manage Campaign Sellers button */}
                        {!addAllGroupSellersValue && (
                            <div className="flex items-center gap-3 pl-8">
                                <button type="button" onClick={() => setIsManageSellersOpen(true)} className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#D97706] text-[#D97706] hover:bg-amber-50 rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                                    <Users size={14} />
                                    <span>Select Sellers / Manage Campaign Sellers</span>
                                </button>

                                {selectedSellerIds.length > 0 && (
                                    <span className="text-xs font-bold text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                                        {selectedSellerIds.length} seller{selectedSellerIds.length > 1 ? "s" : ""} selected
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-[#F5F5F4] mt-6 flex justify-end items-center gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold cursor-pointer">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-5 py-2 text-xs font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer"
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

            {/* Manage Campaign Sellers Modal */}
            {isManageSellersOpen && <ManageCampaignSellersModal groupId={groupId} selectedSellerIds={selectedSellerIds} onSave={(sellerIds) => setSelectedSellerIds(sellerIds)} onClose={() => setIsManageSellersOpen(false)} />}
        </>
    );
}
