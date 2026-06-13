// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { toast } from "sonner";
// import { Plus, X, Loader2, TrendingUp } from "lucide-react";
// import { useCreateTierMutation } from "@/redux/features/tier/tierApi";

// const tierSchema = z.object({
//     name: z.string().min(2, "Tier name must be at least 2 characters"),
//     percentage: z.coerce.number().min(0.1, "Percentage must be > 0").max(100, "Max 100%"),
//     minSalesVolume: z.coerce.number().min(0, "Min must be ≥ 0"),
//     maxSalesVolume: z.coerce.number().min(0).optional(),
//     isPopular: z.boolean().optional(),
// });

// type TierFormValues = z.infer<typeof tierSchema>;

// const ProfitRuleHead = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [createTier, { isLoading: isCreating }] = useCreateTierMutation();

//     const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<TierFormValues>({
//         resolver: zodResolver(tierSchema),
//         defaultValues: { name: "", percentage: 0, minSalesVolume: 0, isPopular: false },
//     });

//     const onSubmit = async (data: TierFormValues) => {
//         const toastId = toast.loading("Creating tier...");
//         try {
//             await createTier({
//                 name: data.name,
//                 percentage: data.percentage,
//                 minSalesVolume: data.minSalesVolume,
//                 maxSalesVolume: data.maxSalesVolume || undefined,
//                 isPopular: data.isPopular,
//             }).unwrap();
//             toast.success("Tier created successfully!", { id: toastId });
//             setIsModalOpen(false);
//             reset();
//         } catch (err: any) {
//             toast.error(err?.data?.message || "Failed to create tier", { id: toastId });
//         }
//     };

//     return (
//         <div className="mb-8">
//             <div className="bg-[#1C1917] rounded-[32px] p-10">
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//                     <div>
//                         <h1 className="text-sm text-[#FBBF24] mb-4 uppercase tracking-widest font-semibold">Revenue Management</h1>
//                         <h2 className="text-white text-4xl font-extrabold mb-3">Profit & Pricing Strategy.</h2>
//                         <p className="text-[#A8A29E] max-w-2xl text-sm leading-relaxed">
//                             Configure your performance tiers and profit margins to drive growth. These rules define the automatic payout structures for all active campaigns.
//                         </p>
//                     </div>
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="shrink-0 inline-flex items-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all cursor-pointer"
//                     >
//                         <Plus size={16} />
//                         Add New Tier
//                     </button>
//                 </div>
//             </div>

//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
//                         <div className="flex items-center justify-between mb-6">
//                             <div className="flex items-center gap-3">
//                                 <div className="p-2 bg-amber-50 rounded-xl text-[#D97706]">
//                                     <TrendingUp size={20} />
//                                 </div>
//                                 <h2 className="text-xl font-bold text-[#1A1C1C]">Add New Tier</h2>
//                             </div>
//                             <button onClick={() => { setIsModalOpen(false); reset(); }} className="text-[#78716C] hover:text-[#1A1C1C] cursor-pointer">
//                                 <X size={20} />
//                             </button>
//                         </div>
//                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-semibold text-[#1A1C1C] mb-2">Tier Name</label>
//                                 <input type="text" placeholder="e.g., GROWTH ACCELERATOR" {...register("name")} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm" />
//                                 {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-semibold text-[#1A1C1C] mb-2">Profit Percentage (%)</label>
//                                 <input type="number" step="0.1" placeholder="e.g., 45" {...register("percentage")} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm" />
//                                 {errors.percentage && <p className="text-red-500 text-xs mt-1">{errors.percentage.message}</p>}
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-semibold text-[#1A1C1C] mb-2">Min Sales (SEK)</label>
//                                     <input type="number" placeholder="0" {...register("minSalesVolume")} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm" />
//                                     {errors.minSalesVolume && <p className="text-red-500 text-xs mt-1">{errors.minSalesVolume.message}</p>}
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-semibold text-[#1A1C1C] mb-2">Max Sales (SEK)</label>
//                                     <input type="number" placeholder="Leave blank for unlimited" {...register("maxSalesVolume")} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm" />
//                                     <p className="text-[#A8A29E] text-[10px] mt-1">Blank = unlimited</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 cursor-pointer" onClick={() => {}}>
//                                 <input type="checkbox" id="isPopular" {...register("isPopular")} className="w-4 h-4 accent-[#D97706] cursor-pointer" />
//                                 <label htmlFor="isPopular" className="text-sm font-semibold text-[#1A1C1C] cursor-pointer">Mark as Most Popular</label>
//                             </div>
//                             <button type="submit" disabled={isCreating} className="w-full inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer mt-2">
//                                 {isCreating ? <><Loader2 className="animate-spin" size={16} /><span>Creating...</span></> : "Create Tier"}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfitRuleHead;

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
        const toastId = toast.loading("Creating tier...");
        try {
            await createTier({
                name: data.name,
                percentage: data.percentage,
                minSalesVolume: data.minSalesVolume,
                maxSalesVolume: data.maxSalesVolume || undefined,
                isPopular: data.isPopular,
            }).unwrap();
            toast.success("Tier created successfully!", { id: toastId });
            setIsModalOpen(false);
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to create tier", { id: toastId });
        }
    };

    return (
        <div className="mb-8">
            <div className="bg-[#1C1917] rounded-[32px] p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-sm text-[#FBBF24] mb-4 uppercase tracking-widest font-semibold">Revenue Management</h1>
                        <h2 className="text-white text-4xl font-extrabold mb-3">Profit & Pricing Strategy.</h2>
                        <p className="text-[#A8A29E] max-w-2xl text-sm leading-relaxed">Configure your performance tiers and profit margins to drive growth. These rules define the automatic payout structures for all active campaigns.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="shrink-0 inline-flex items-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all cursor-pointer">
                        <Plus size={16} />
                        Add New Tier
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-50 rounded-xl text-[#D97706]">
                                    <TrendingUp size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-[#1A1C1C]">Add New Tier</h2>
                            </div>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    reset();
                                }}
                                className="text-[#78716C] hover:text-[#1A1C1C] cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1C1C] mb-2">Tier Name</label>
                                <input type="text" placeholder="e.g., GROWTH ACCELERATOR" {...register("name")} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#1A1C1C] mb-2">Profit Percentage (%)</label>
                                <input type="number" step="0.1" placeholder="e.g., 45" {...register("percentage", { valueAsNumber: true })} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm" />
                                {errors.percentage && <p className="text-red-500 text-xs mt-1">{errors.percentage.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1C1C] mb-2">Min Sales (SEK)</label>
                                    <input type="number" placeholder="0" {...register("minSalesVolume", { valueAsNumber: true })} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm" />
                                    {errors.minSalesVolume && <p className="text-red-500 text-xs mt-1">{errors.minSalesVolume.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1C1C] mb-2">Max Sales (SEK)</label>
                                    <input type="number" placeholder="Leave blank for unlimited" {...register("maxSalesVolume", { valueAsNumber: true })} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-xl focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 text-sm" />
                                    <p className="text-[#A8A29E] text-[10px] mt-1">Blank = unlimited</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                <input type="checkbox" id="isPopular" {...register("isPopular")} className="w-4 h-4 accent-[#D97706] cursor-pointer" />
                                <label htmlFor="isPopular" className="text-sm font-semibold text-[#1A1C1C] cursor-pointer">
                                    Mark as Most Popular
                                </label>
                            </div>
                            <button type="submit" disabled={isCreating} className="w-full inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer mt-2">
                                {isCreating ? (
                                    <>
                                        <Loader2 className="animate-spin" size={16} />
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    "Create Tier"
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
