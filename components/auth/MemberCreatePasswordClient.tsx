"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import MemberAuthHeader from "./MemberAuthHeader";

const createPasswordSchema = z
    .object({
        newPassword: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type CreatePasswordFormValues = z.infer<typeof createPasswordSchema>;

const MemberCreatePasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";
    const code = searchParams.get("code") || "";

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePasswordFormValues>({
        resolver: zodResolver(createPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: CreatePasswordFormValues) => {
        const toastId = toast.loading("Resetting password...");
        try {
            await resetPassword({ token, newPassword: data.newPassword }).unwrap();
            toast.success("Password reset successfully!", { id: toastId });

            const loginParams = new URLSearchParams({
                ...(email && { email }),
                ...(code && { code }),
            }).toString();

            router.push(`/auth/member/login?${loginParams}`);
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to reset password", { id: toastId });
        }
    };

    const loginUrl = `/auth/member/login?${new URLSearchParams({
        ...(email && { email }),
        ...(code && { code }),
    }).toString()}`;

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <MemberAuthHeader signInUrl={loginUrl} />

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-3 sm:px-4 py-6 sm:py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white border border-gray-100 shadow-[0px_4px_25px_rgba(0,0,0,0.05)] rounded-2xl p-4 sm:p-10">
                        {/* Title */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-2xl font-extrabold text-[#7C5800]">Kungsbjörnen</h1>
                            <h2 className="text-xl sm:text-2xl text-gray-900 font-bold mt-1">Create New Password</h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Enter your new password for your team member account.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* New Password */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">NEW PASSWORD</label>
                                <input
                                    type="password"
                                    placeholder="Enter at least 8 characters"
                                    {...register("newPassword")}
                                    className="w-full px-4 py-3 bg-gray-100/80 border border-gray-200 focus:border-[#D97706] focus:bg-white rounded-xl text-sm text-gray-900 focus:outline-none transition-all font-medium"
                                />
                                {errors.newPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.newPassword.message}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">CONFIRM NEW PASSWORD</label>
                                <input
                                    type="password"
                                    placeholder="Re-enter your new password"
                                    {...register("confirmPassword")}
                                    className="w-full px-4 py-3 bg-gray-100/80 border border-gray-200 focus:border-[#D97706] focus:bg-white rounded-xl text-sm text-gray-900 focus:outline-none transition-all font-medium"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none rounded-[24px] gap-2 cursor-pointer disabled:opacity-50 mt-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Saving Password...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Reset Password & Sign In</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

const MemberCreatePasswordClient = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50 flex items-center justify-center p-4">Loading...</div>}>
            <MemberCreatePasswordForm />
        </Suspense>
    );
};

export default MemberCreatePasswordClient;
