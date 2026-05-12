"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const tierSchema = z.object({
    tierName: z.string().min(2, "Tier name must be at least 2 characters"),
    percentage: z.string().min(1, "Percentage is required"),
    min: z.number().min(0, "Min must be at least 0"),
    max: z.number().min(0, "Max must be at least 0").optional(),
    tierTag: z.string().optional(),
});

const ProfitRuleHead = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(tierSchema as any),
        defaultValues: {
            tierName: "",
            percentage: "",
            min: 0,
            max: undefined,
            tierTag: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log("Tier data:", data);
        setIsModalOpen(false);
        reset();
    };

    return (
        <div className="mb-8">
            <div className="bg-[#1C1917] rounded-[32px] p-10">
                <div>
                    <h1 className="text-sm text-[#FBBF24] mb-4">REVENUE MANAGEMENT</h1>
                    <h1 className="text-white text-5xl mb-4">Profit &amp; Pricing Strategy.</h1>
                    <p className="text-[#A8A29E] mt-2 max-w-2xl mb-8">Configure your performance tiers and profit margins to drive growth. These rules define the automatic payout structures for all active campaigns.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all">
                    Add New Tier
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-8 w-full max-w-md">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Add tier</h2>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    reset();
                                }}
                                className="text-[#78716C] hover:text-[#1A1C1C]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#1A1C1C] mb-2">Tier name</label>
                                <input type="text" placeholder="e.g., GROWTH ACCELERATOR" {...register("tierName")} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20" />
                                {errors.tierName && <p className="text-red-500 text-sm mt-1">{errors.tierName.message as string}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1A1C1C] mb-2">Make percentage</label>
                                <input type="text" placeholder="e.g., 45%" {...register("percentage")} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20" />
                                {errors.percentage && <p className="text-red-500 text-sm mt-1">{errors.percentage.message as string}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#1A1C1C] mb-2">min</label>
                                    <input type="number" placeholder="0" {...register("min", { valueAsNumber: true })} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20" />
                                    {errors.min && <p className="text-red-500 text-sm mt-1">{errors.min.message as string}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#1A1C1C] mb-2">max</label>
                                    <input type="number" placeholder="200" {...register("max", { valueAsNumber: true })} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20" />
                                    {errors.max && <p className="text-red-500 text-sm mt-1">{errors.max.message as string}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1A1C1C] mb-2">Tier tag</label>
                                <input type="text" placeholder="e.g., Most popular" {...register("tierTag")} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20" />
                            </div>
                            <button type="submit" className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all">
                                Add tier
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfitRuleHead;
