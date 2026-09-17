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
    name: z.string().min(2, "Gruppnamnet måste vara minst 2 tecken"),
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
        const toastId = toast.loading("Skapar grupp...");
        try {
            await createGroup({
                name: data.name,
            }).unwrap();
            toast.success("Gruppen har skapats!", { id: toastId });
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Misslyckades med att skapa grupp", { id: toastId });
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.06)] border border-[#E7E5E4]">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#1A1C1C] mb-2">Skapa din grupp</h1>
                <p className="text-[#78716C] text-sm">Du har inte skapat någon grupp än. Fyll i formuläret nedan för att skapa din försäljningsgrupp.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1A1C1C]">Gruppnamn</label>
                    <Input placeholder="Ange grupp- eller klassnamn" {...register("name")} className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isCreating}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer"
                >
                    {isCreating ? "Skapar grupp..." : "Skapa grupp"}
                </button>
            </form>
        </div>
    );
}
