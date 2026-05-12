"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const groupFormSchema = z.object({
    className: z.string().min(2, "Class name must be at least 2 characters"),
    shortDescription: z.string().min(2, "Short description must be at least 2 characters"),
});

type GroupFormValues = z.infer<typeof groupFormSchema>;

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<GroupFormValues>({
        resolver: zodResolver(groupFormSchema),
    });

    const onSubmit = (data: GroupFormValues) => {
        console.log("Form submitted:", data);
        onClose();
        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 p-6">
                <button onClick={onClose} className="absolute top-4 right-4 text-[#78716C] hover:text-[#1A1C1C]">
                    <X size={24} />
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#1A1C1C]">Start New Group</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1A1C1C]">Class Name</label>
                        <Input placeholder="Enter class name" {...register("className")} className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                        {errors.className && <p className="text-red-500 text-xs">{errors.className.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1A1C1C]">Short description</label>
                        <Input placeholder="Enter short description" {...register("shortDescription")} className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                        {errors.shortDescription && <p className="text-red-500 text-xs">{errors.shortDescription.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1A1C1C]">Active seller</label>
                        <Input value="26" disabled className="h-12 border-[#F5F5F4] bg-[#F5F5F4] text-[#78716C]" />
                    </div>
                    <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2">
                        Create Group
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupModal;
