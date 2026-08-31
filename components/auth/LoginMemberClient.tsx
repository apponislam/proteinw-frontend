"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginWithInvitationCodeMutation } from "@/redux/features/auth/authApi";
import { useJoinGroupByInvitationCodeMutation } from "@/redux/features/sellerGroup/sellerGroupApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser, currentToken } from "@/redux/features/auth/authSlice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import MemberAuthHeader from "./MemberAuthHeader";

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
    const token = useSelector(currentToken);

    const emailFromQuery = searchParams.get("email") || "";
    const codeFromQuery = searchParams.get("code") || "";

    const [loginWithInvitationCode, { isLoading }] = useLoginWithInvitationCodeMutation();
    const [joinGroupByInvitationCode] = useJoinGroupByInvitationCodeMutation();

    // If user is ALREADY logged in and visits invitation link with code, automatically join group & redirect
    useEffect(() => {
        if (!token) return;

        if (codeFromQuery) {
            const handleAutoJoin = async () => {
                const toastId = toast.loading("Joining group with invitation code...");
                try {
                    await joinGroupByInvitationCode({ code: codeFromQuery }).unwrap();
                    toast.success("Successfully joined the group!", { id: toastId });
                } catch (err: any) {
                    toast.error(err?.data?.message || "Failed to join group with code.", { id: toastId });
                } finally {
                    router.push("/dashboard");
                }
            };
            handleAutoJoin();
        } else {
            router.push("/dashboard");
        }
    }, [token, codeFromQuery, joinGroupByInvitationCode, router]);

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

    const forgotPasswordUrl = `/auth/member/forgot-password?${new URLSearchParams({
        ...(emailFromQuery && { email: emailFromQuery }),
        ...(codeFromQuery && { code: codeFromQuery }),
    }).toString()}`;

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <MemberAuthHeader signInUrl={registerUrl} />

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-3 sm:px-4 py-6 sm:py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white border border-gray-100 shadow-[0px_4px_25px_rgba(0,0,0,0.05)] rounded-2xl p-4 sm:p-10">
                        {/* Title */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-2xl font-extrabold text-[#7C5800]">Kungsbjörnen</h1>
                            <h2 className="text-xl sm:text-2xl text-gray-900 font-bold mt-1">Member Sign In</h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Sign in to your team member account.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Hidden Code Input */}
                            <input type="hidden" {...register("code")} />

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

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className="w-full px-4 py-3 bg-gray-100/80 border border-gray-200 focus:border-[#D97706] focus:bg-white rounded-xl text-sm text-gray-900 focus:outline-none transition-all font-medium"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
                            </div>

                            {/* Remember me & Forgot Password */}
                            <div className="flex items-center justify-between pt-1">
                                <Controller
                                    name="remember"
                                    control={control}
                                    render={({ field }) => (
                                        <label htmlFor="member-remember" className="flex items-center gap-2.5 cursor-pointer select-none">
                                            <div className="relative shrink-0">
                                                <input
                                                    type="checkbox"
                                                    id="member-remember"
                                                    className="sr-only peer"
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                />
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#7C5800] peer-checked:bg-[#7C5800] flex items-center justify-center transition-all bg-white shadow-xs">
                                                    {field.value && (
                                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">Remember me</span>
                                        </label>
                                    )}
                                />
                                <Link href={forgotPasswordUrl} className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
                                    Forgot Password?
                                </Link>
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
                            <p className="text-xs text-gray-600">
                                Don't have an account yet?{" "}
                                <Link href={registerUrl} className="font-bold text-[#7C5800] hover:underline ml-1">
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
