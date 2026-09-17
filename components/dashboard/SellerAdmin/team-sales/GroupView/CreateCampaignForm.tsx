"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Award, Info, Loader2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCampaignMutation } from "@/redux/features/campaign/campaignApi";
import { ManageCampaignSellersModal } from "./ManageCampaignSellersModal";

export const campaignFormSchema = z.object({
    name: z.string().min(2, "Kampanjnamnet måste vara minst 2 tecken"),
    shortDescription: z.string().min(2, "Kort beskrivning måste vara minst 2 tecken"),
    target: z
        .string()
        .min(1, "Målsättning krävs")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Målsättningen måste vara ett positivt nummer")
        .refine((val) => Number(val) <= 99999, "Målsättningen kan inte överstiga 99 999 SEK"),
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
        { message: "Slutdatum måste vara mellan idag och 21 dagar från idag" },
    ),
    addAllGroupSellers: z.boolean(),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;

interface CreateCampaignFormProps {
    groupId: string;
    onClose: () => void;
}

export function CreateCampaignForm({ groupId, onClose }: CreateCampaignFormProps) {
    const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();

    const [selectedSellerIds, setSelectedSellerIds] = useState<string[]>([]);
    const [isManageSellersOpen, setIsManageSellersOpen] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
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
    const endDateValue = watch("endDate");

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
        const toastId = toast.loading("Startar kampanj...");
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
            toast.success("Kampanj startad!", { id: toastId });
            onClose();
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Misslyckades med att starta kampanj", { id: toastId });
        }
    };

    return (
        <>
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E7E5E4] w-full max-w-xl shadow-sm">
                <div className="border-b border-[#F5F5F4] pb-4 mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1C1C]">Starta insamlingskampanj</h3>
                    <p className="text-xs text-[#78716C]">Definiera kampanjparametrar för att börja ta emot försäljning.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#1A1C1C]">Kampanjnamn</label>
                        <Input placeholder="t.ex. Höstbakat 2026" {...register("name")} className="h-10 text-xs border-[#E7E5E4] focus:border-[#7C5800] focus:ring-[#7C5800]" />
                        {errors.name && <p className="text-red-500 text-[11px]">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#1A1C1C]">Kort beskrivning</label>
                        <Textarea placeholder="Beskriv vad ni samlar in pengar till..." {...register("shortDescription")} className="min-h-20 text-xs border-[#E7E5E4] focus:border-[#7C5800] focus:ring-[#7C5800]" />
                        <p className="text-[11px] text-[#D97706] font-medium flex items-center gap-1 pt-0.5">
                            <Info size={13} className="shrink-0" />
                            <span>Denna text kommer att visas för kunder i säljarens digitala butik.</span>
                        </p>
                        {errors.shortDescription && <p className="text-red-500 text-[11px]">{errors.shortDescription.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#1A1C1C]">Målsättning (SEK)</label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3 h-10">
                                <div className="text-[#D97706] shrink-0">
                                    <Award size={18} />
                                </div>
                                <input
                                    type="number"
                                    max={99999}
                                    placeholder="t.ex. 5000"
                                    {...register("target", {
                                        onChange: (e) => {
                                            const val = parseInt(e.target.value, 10);
                                            if (!isNaN(val) && val > 99999) {
                                                e.target.value = "99999";
                                            }
                                        },
                                    })}
                                    className="w-full bg-transparent text-xs font-bold text-[#1A1C1C] focus:outline-none p-0 border-none h-5"
                                />
                            </div>
                            {errors.target && <p className="text-red-500 text-[11px]">{errors.target.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#1A1C1C]">Slutdatum</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    readOnly
                                    value={
                                        endDateValue
                                            ? (() => {
                                                  const parts = endDateValue.split("-");
                                                  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : endDateValue;
                                              })()
                                            : ""
                                    }
                                    placeholder="dd/mm/yyyy"
                                    className="h-10 text-xs border-[#E7E5E4] focus:border-[#7C5800] focus:ring-[#7C5800] cursor-pointer"
                                />
                                <input
                                    type="date"
                                    min={todayStr}
                                    max={maxDateStr}
                                    value={endDateValue || ""}
                                    onChange={(e) => setValue("endDate", e.target.value, { shouldValidate: true })}
                                    onClick={(e) => {
                                        try {
                                            e.currentTarget.showPicker();
                                        } catch {}
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                />
                            </div>
                            <p className="text-[11px] text-[#7C5800]">Maximal period om 3 veckor/21 dagar</p>
                            {errors.endDate && <p className="text-red-500 text-[11px]">{errors.endDate.message}</p>}
                        </div>
                    </div>

                    {/* Custom Site Checkbox */}
                    <div className="pt-2 space-y-3">
                        <label className="flex items-start sm:items-center gap-3 cursor-pointer select-none">
                            <div className="relative shrink-0 mt-0.5 sm:mt-0">
                                <input type="checkbox" className="sr-only peer" {...register("addAllGroupSellers")} />
                                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-[#7C5800] peer-checked:bg-[#7C5800] flex items-center justify-center transition-all">
                                    {addAllGroupSellersValue && (
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-xs text-gray-700 font-medium">Lägg automatiskt till alla nuvarande gruppmedlemmar/säljare i denna kampanj</span>
                        </label>

                        {/* Select Sellers / Manage Campaign Sellers button */}
                        {!addAllGroupSellersValue && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pl-0 sm:pl-8">
                                <button
                                    type="button"
                                    onClick={() => setIsManageSellersOpen(true)}
                                    className="inline-flex items-center justify-center gap-2 px-3 py-2 sm:py-1.5 border border-[#D97706] text-[#D97706] hover:bg-amber-50 rounded-xl text-xs font-semibold cursor-pointer transition-colors w-full sm:w-auto"
                                >
                                    <Users size={14} />
                                    <span>Välj säljare / Hantera kampanjsäljare</span>
                                </button>

                                {selectedSellerIds.length > 0 && (
                                    <span className="text-xs font-bold text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
                                        {selectedSellerIds.length} säljare valda
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-[#F5F5F4] mt-6 flex justify-end items-center gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold cursor-pointer">
                            Avbryt
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-5 py-2 text-xs font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {isCreating ? (
                                <>
                                    <Loader2 className="animate-spin" size={14} />
                                    <span>Startar...</span>
                                </>
                            ) : (
                                "Starta kampanj"
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
