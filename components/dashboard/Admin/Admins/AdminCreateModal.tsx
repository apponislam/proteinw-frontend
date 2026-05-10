"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";

const adminFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type AdminFormValues = z.infer<typeof adminFormSchema>;

interface AdminCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdminCreateModal: React.FC<AdminCreateModalProps> = ({ isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AdminFormValues>({
        resolver: zodResolver(adminFormSchema),
    });

    const onSubmit = (data: AdminFormValues) => {
        console.log("Form submitted:", data);
        onClose();
        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 p-6">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-[#78716C] hover:text-[#1A1C1C]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#1A1C1C]">Create new admin</h2>
                    <p className="text-[#78716C] mt-1">Add a new administrator to the system.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1A1C1C]">Name</label>
                        <Input placeholder="Enter admin name" {...register("name")} className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1A1C1C]">Email address</label>
                        <Input type="email" placeholder="Enter email" {...register("email")} className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1A1C1C]">Phone</label>
                        <Input placeholder="Enter phone number" {...register("phone")} className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1A1C1C]">Set Password</label>
                        <Input type="password" placeholder="••••••••" {...register("password")} className="h-12 border-[#F5F5F4] focus:border-[#D97706] focus:ring-[#D97706] focus:ring-1" />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminCreateModal;
