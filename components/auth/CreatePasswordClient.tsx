"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import AuthHeader from "./AuthHeader";
import { useState } from "react";

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

const CreatePasswordClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";
    const code = searchParams.get("code") || "";
    const isMember = searchParams.get("isMember") === "true";
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreatePasswordFormValues>({
        resolver: zodResolver(createPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const newPasswordValue = watch("newPassword");
    const confirmPasswordValue = watch("confirmPassword");

    const onSubmit = async (data: CreatePasswordFormValues) => {
        try {
            await resetPassword({ token, newPassword: data.newPassword }).unwrap();
            toast.success("Password reset successfully!");

            if (isMember) {
                const loginParams = new URLSearchParams({
                    ...(email && { email }),
                    ...(code && { code }),
                }).toString();
                router.push(`/auth/member/login?${loginParams}`);
            } else {
                router.push("/auth/reset-successful");
            }
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to reset password");
            console.error("Reset password failed:", err);
        }
    };
    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <AuthHeader />

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Form Card */}
                    <div className="bg-white border-dashed rounded-lg p-8">
                        {/* Logo and Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-extrabold text-[#7C5800]">Kungsbjörnen</h1>
                            <h2 className="text-lg font-bold text-gray-700 mt-1">Create New Password</h2>
                            <p className="text-sm text-gray-600 mt-1">Enter your new password below</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* New Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">NEW PASSWORD</label>
                                <div className="relative">
                                    <Controller
                                        name="newPassword"
                                        control={control}
                                        render={({ field }) => <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-3 pr-10 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                    />
                                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none cursor-pointer">
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}

                                {/* Password Strength Indicator */}
                                {(() => {
                                    const getPasswordStrength = (pass: string) => {
                                        if (!pass) return { score: 0, label: "" };
                                        let score = 0;
                                        if (pass.length >= 8) score += 1;
                                        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
                                        if (/[0-9]/.test(pass)) score += 1;
                                        if (/[^A-Za-z0-9]/.test(pass) || pass.length >= 12) score += 1;

                                        if (score <= 1) return { score: 1, label: "WEAK" };
                                        if (score === 2) return { score: 2, label: "FAIR" };
                                        if (score === 3) return { score: 3, label: "MODERATE" };
                                        return { score: 4, label: "STRONG" };
                                    };

                                    const strength = getPasswordStrength(newPasswordValue || "");

                                    return (
                                        <div className="mt-2 text-xs text-gray-600">
                                            <div className="mb-2">
                                                <span className="font-semibold">STRENGTH:</span> <span className="text-blue-600 font-semibold">{strength.label}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4].map((step) => (
                                                    <div key={step} className={`h-1.5 w-full rounded-2xl transition-all duration-300 ${strength.score > 0 && step <= strength.score ? "bg-[#7C5800]" : "bg-[#7C58004D]"}`} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">CONFIRM PASSWORD</label>
                                <div className="relative">
                                    <Controller
                                        name="confirmPassword"
                                        control={control}
                                        render={({ field }) => (
                                            <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-3 pr-10 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />
                                        )}
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none cursor-pointer">
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword ? <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p> : confirmPasswordValue && newPasswordValue && confirmPasswordValue !== newPasswordValue && <p className="text-red-500 text-xs mt-1">Passwords do not match</p>}
                            </div>

                            {/* Reset Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Resetting..." : "Reset Password"}
                                <span>→</span>
                            </button>
                        </form>

                        {/* Back to Login Link */}
                        <div className="text-center mt-6">
                            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreatePasswordClient;
