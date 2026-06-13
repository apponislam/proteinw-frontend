"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateGroupMutation } from "@/redux/features/group/groupApi";

const groupFormSchema = z.object({
    name: z.string().min(2, "Group name must be at least 2 characters"),
    shortDescription: z.string().min(2, "Short description must be at least 2 characters"),
    goal: z.string().min(1, "Goal is required"),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end date",
    }),
});

type GroupFormValues = z.infer<typeof groupFormSchema>;

export default function CreateGroupForm() {
    const [createGroup, { isLoading: isCreating }] = useCreateGroupMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<GroupFormValues>({
        resolver: zodResolver(groupFormSchema),
    });

    const onSubmit = async (data: GroupFormValues) => {
        const toastId = toast.loading("Creating group...");
        try {
            await createGroup({
                name: data.name,
                shortDescription: data.shortDescription,
                goal: Number(data.goal),
                endDate: new Date(data.endDate),
            }).unwrap();
            toast.success("Group created successfully!", { id: toastId });
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to create group", { id: toastId });
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.06)] border border-[#E7E5E4]">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#1A1C1C] mb-2">Create Your Group</h1>
                <p className="text-[#78716C] text-sm">
                    You don't have a group set up yet. Please fill out the form below to create your fundraising group.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1A1C1C]">Group Name</label>
                    <Input 
                        placeholder="Enter group or class name" 
                        {...register("name")} 
                        className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" 
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1A1C1C]">Short Description</label>
                    <Textarea 
                        placeholder="Enter description of your fundraising group" 
                        {...register("shortDescription")} 
                        className="min-h-[100px] border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" 
                    />
                    {errors.shortDescription && <p className="text-red-500 text-xs">{errors.shortDescription.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#1A1C1C]">Goal Amount (SEK)</label>
                        <Input 
                            type="number"
                            placeholder="e.g. 5000" 
                            {...register("goal")} 
                            className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" 
                        />
                        {errors.goal && <p className="text-red-500 text-xs">{errors.goal.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#1A1C1C]">End Date</label>
                        <Input 
                            type="date"
                            {...register("endDate")} 
                            className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" 
                        />
                        {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isCreating}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer"
                >
                    {isCreating ? "Creating Group..." : "Create Group"}
                </button>
            </form>
        </div>
    );
}
