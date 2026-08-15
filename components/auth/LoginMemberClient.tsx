"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginWithInvitationCodeMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const memberLoginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Please enter your password"),
    code: z.string().min(1, "Invitation code is required"),
    remember: z.boolean().optional(),
});

type MemberLoginFormValues = z.infer<typeof memberLoginSchema>;

const LoginMemberForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const emailFromQuery = searchParams.get("email") || "";
    const codeFromQuery = searchParams.get("code") || "";

    const [loginWithInvitationCode, { isLoading }] = useLoginWithInvitationCodeMutation();

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<MemberLoginFormValues>({
        resolver: zodResolver(memberLoginSchema),
        defaultValues: {
            email: emailFromQuery,
            password: "",
            code: codeFromQuery,
            remember: false,
        },
    });

    useEffect(() => {
        if (emailFromQuery) setValue("email", emailFromQuery);
        if (codeFromQuery) setValue("code", codeFromQuery);
    }, [emailFromQuery, codeFromQuery, setValue]);

    const onSubmit = async (data: MemberLoginFormValues) => {
        const toastId = toast.loading("Signing in...");
        try {
            const res = await loginWithInvitationCode({
                email: data.email,
                password: data.password,
                code: data.code,
            }).unwrap();

            dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));
            toast.success("Signed in successfully!", { id: toastId });
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to sign in. Please check your credentials.", { id: toastId });
        }
    };

    const registerUrl = `/auth/member/register?${new URLSearchParams({
        ...(emailFromQuery && { email: emailFromQuery }),
        ...(codeFromQuery && { code: codeFromQuery }),
    }).toString()}`;

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition">
                        Kungsbörnen
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href={registerUrl} className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-[#7C5800] border border-amber-200 hover:bg-amber-100 rounded-full font-bold text-sm transition-all shadow-xs">
                            <span>Register</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
                <div className="w-full max-w-xl">
                    <div className="bg-white border-dashed rounded-lg p-8 sm:p-12">
                        {/* Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-black text-xl text-center font-extrabold mb-4">Kungsbjörnen</h1>
                            <h2 className="text-3xl text-gray-900 font-bold">Member Sign In</h2>
                            <p className="text-sm text-gray-600 mt-2">Sign in to your team member account.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Hidden Code Input */}
                            <input type="hidden" {...register("code")} />

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-gray-400 font-medium"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password")}
                                    className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-gray-400 font-medium"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Remember me & Forgot Password */}
                            <div className="flex items-center justify-between pt-2">
                                <Controller
                                    name="remember"
                                    control={control}
                                    render={({ field }) => (
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                            />
                                            <span className="text-sm text-gray-600">Remember me</span>
                                        </label>
                                    )}
                                />
                                <Link href="/auth/forgot-password" className="text-sm font-semibold text-amber-600 hover:text-amber-700">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Signing In...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account yet?{" "}
                                <Link href={registerUrl} className="font-bold text-[#7C5800] hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const LoginMemberClient = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50 flex items-center justify-center p-4">Loading login...</div>}>
            <LoginMemberForm />
        </Suspense>
    );
};

export default LoginMemberClient;
