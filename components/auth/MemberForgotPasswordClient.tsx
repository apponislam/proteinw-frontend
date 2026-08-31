"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequestPasswordResetMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import MemberAuthHeader from "./MemberAuthHeader";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const MemberForgotPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get("email") || "";
    const codeFromQuery = searchParams.get("code") || "";

    const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: emailFromQuery,
        },
    });

    useEffect(() => {
        if (emailFromQuery) {
            setValue("email", emailFromQuery);
        }
    }, [emailFromQuery, setValue]);

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        const toastId = toast.loading("Sending verification code...");
        try {
            await requestPasswordReset({ email: data.email }).unwrap();
            toast.success("Verification code sent to your email!", { id: toastId });

            const nextParams = new URLSearchParams({
                email: data.email,
                isMember: "true",
                ...(codeFromQuery && { code: codeFromQuery }),
            }).toString();

            router.push(`/auth/member/verify-code?${nextParams}`);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to send verification code", { id: toastId });
        }
    };

    const loginUrl = `/auth/member/login?${new URLSearchParams({
        ...(emailFromQuery && { email: emailFromQuery }),
        ...(codeFromQuery && { code: codeFromQuery }),
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
                            <h2 className="text-xl sm:text-2xl text-gray-900 font-bold mt-1">Forgot Password</h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Enter your email to receive a 6-digit verification code.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    {...register("email")}
                                    className="w-full px-4 py-3 bg-gray-100/80 border border-gray-200 focus:border-[#D97706] focus:bg-white rounded-xl text-sm text-gray-900 focus:outline-none transition-all font-medium"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none rounded-[24px] gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Sending Code...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Verification Code</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-600">
                                Remember your password?{" "}
                                <Link href={loginUrl} className="font-bold text-[#7C5800] hover:underline ml-1">
                                    Back to Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const MemberForgotPasswordClient = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50 flex items-center justify-center p-4">Loading...</div>}>
            <MemberForgotPasswordForm />
        </Suspense>
    );
};

export default MemberForgotPasswordClient;
