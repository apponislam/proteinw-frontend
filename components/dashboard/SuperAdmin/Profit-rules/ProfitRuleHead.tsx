"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, X, Loader2, TrendingUp } from "lucide-react";
import { useCreateTierMutation } from "@/redux/features/tier/tierApi";

const tierSchema = z.object({
    name: z.string().min(2, "Tier name must be at least 2 characters"),
    percentage: z.number().min(0.1, "Percentage must be > 0").max(100, "Max 100%"),
    minSalesVolume: z.number().min(0, "Min must be ≥ 0"),
    maxSalesVolume: z.number().min(0).optional(),
    isPopular: z.boolean().optional(),
});

type TierFormValues = z.infer<typeof tierSchema>;

const ProfitRuleHead = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createTier, { isLoading: isCreating }] = useCreateTierMutation();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<TierFormValues>({
        resolver: zodResolver(tierSchema),
        defaultValues: {
            name: "",
            percentage: 0,
            minSalesVolume: 0,
            maxSalesVolume: undefined,
            isPopular: false,
        },
    });

    const onSubmit = async (data: TierFormValues) => {
        const toastId = toast.loading("Skapar niv\u00e5...");
        try {
            await createTier({
                name: data.name,
                percentage: data.percentage,
                minSalesVolume: data.minSalesVolume,
                maxSalesVolume: data.maxSalesVolume || undefined,
                isPopular: data.isPopular,
            }).unwrap();
            toast.success("Niv\u00e5n skapades framg\u00e5ngsrikt!", { id: toastId });
            setIsModalOpen(false);
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Misslyckades med att skapa niv\u00e5", { id: toastId });
        }
    };

    return (
        <div className="mb-6 sm:mb-8">
            <div className="bg-[#1C1917] rounded-2xl sm:rounded-[32px] p-5 sm:p-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
                    <div>
                        <h1 className="text-xs sm:text-sm text-[#FBBF24] mb-2 sm:mb-4 uppercase tracking-widest font-semibold">Int\u00e4ktshantering</h1>
                        <h2 className="text-white text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-3">Vinst- och prisstrategi.</h2>
                        <p className="text-[#A8A29E] max-w-2xl text-xs sm:text-sm leading-relaxed">Konfigurera dina prestationsniv\u00e5er och vinstmarginaler f\u00f6r att driva tillv\u00e4xt. Dessa regler definierar automatiska utbetalningsstrukturer f\u00f6r alla aktiva kampanjer.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all cursor-pointer">
                        <Plus size={16} />
                        L\u00e4gg till ny niv\u00e5
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-2xl p-5 sm:p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                                <div className="p-1.5 sm:p-2 bg-amber-50 rounded-xl text-[#D97706]">
                                    <TrendingUp size={18} />
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-[#1A1C1C]">L\u00e4gg till ny niv\u00e5</h2>
                            </div>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    reset();
                                }}
                                className="p-1 text-[#78716C] hover:text-[#1A1C1C] cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-[#1A1C1C] mb-1.5 sm:mb-2">Niv\u00e5namn</label>
                                <input type="text" placeholder="t.ex. TILLV\u00c4XTBONUS" {...register("name")} className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-xs sm:text-sm" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-[#1A1C1C] mb-1.5 sm:mb-2">Vinstprocent (%)</label>
                                <input type="number" step="0.1" placeholder="t.ex. 45" {...register("percentage", { valueAsNumber: true })} className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-xs sm:text-sm" />
                                {errors.percentage && <p className="text-red-500 text-xs mt-1">{errors.percentage.message}</p>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-[#1A1C1C] mb-1.5 sm:mb-2">Min f\u00f6rs\u00e4ljning (artiklar)</label>
                                    <input type="number" placeholder="0" {...register("minSalesVolume", { valueAsNumber: true })} className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-xs sm:text-sm" />
                                    {errors.minSalesVolume && <p className="text-red-500 text-xs mt-1">{errors.minSalesVolume.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-[#1A1C1C] mb-1.5 sm:mb-2">Max f\u00f6rs\u00e4ljning (artiklar)</label>
                                    <input
                                        type="number"
                                        placeholder="L\u00e4mna tomt f\u00f6r obegr\u00e4nsat"
                                        {...register("maxSalesVolume", { valueAsNumber: true })}
                                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-xs sm:text-sm"
                                    />
                                    <p className="text-[#A8A29E] text-[10px] mt-1">Tomt = obegr\u00e4nsat</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                <input type="checkbox" id="isPopular" {...register("isPopular")} className="w-4 h-4 accent-[#D97706] cursor-pointer" />
                                <label htmlFor="isPopular" className="text-xs sm:text-sm font-semibold text-[#1A1C1C] cursor-pointer">
                                    Markera som mest popul\u00e4r
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer mt-2"
                            >
                                {isCreating ? (
                                    <>
                                        <Loader2 className="animate-spin" size={16} />
                                        <span>Skapar...</span>
                                    </>
                                ) : (
                                    "Skapa niv\u00e5"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfitRuleHead;
