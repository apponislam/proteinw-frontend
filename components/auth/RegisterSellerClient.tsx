"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSellerMutation } from "@/redux/features/auth/authApi";
import { useJoinGroupByInvitationCodeMutation } from "@/redux/features/sellerGroup/sellerGroupApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser, currentToken } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import AuthHeader from "./AuthHeader";

const sellerRegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Please enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    code: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

type SellerRegisterFormValues = z.infer<typeof sellerRegisterSchema>;

const RegisterSellerForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const token = useSelector(currentToken);

    const emailFromQuery = searchParams.get("email") || "";
    const codeFromQuery = searchParams.get("code") || "";

    const loginUrl = `/auth/member/login?${new URLSearchParams({
        ...(emailFromQuery && { email: emailFromQuery }),
        ...(codeFromQuery && { code: codeFromQuery }),
    }).toString()}`;

    const [registerSeller, { isLoading }] = useRegisterSellerMutation();
    const [joinGroupByInvitationCode] = useJoinGroupByInvitationCodeMutation();

    const codeParam = searchParams.get("code") || codeFromQuery;

    // If user is ALREADY logged in and visits invitation link with code, automatically join group & redirect
    useEffect(() => {
        if (!token) return;

        if (codeParam) {
            const handleAutoJoin = async () => {
                const toastId = toast.loading("Joining group with invitation code...");
                try {
                    await joinGroupByInvitationCode({ code: codeParam }).unwrap();
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
    }, [token, codeParam, joinGroupByInvitationCode, router]);

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SellerRegisterFormValues>({
        resolver: zodResolver(sellerRegisterSchema),
        defaultValues: {
            name: "",
            email: emailFromQuery,
            phone: "",
            password: "",
            code: codeParam || "",
            terms: false,
        },
    });

    useEffect(() => {
        if (emailFromQuery) {
            setValue("email", emailFromQuery);
        }
        if (codeParam) {
            setValue("code", codeParam);
        }
    }, [emailFromQuery, codeParam, setValue]);

    const onSubmit = async (data: SellerRegisterFormValues) => {
        const toastId = toast.loading("Creating seller account...");
        const codeToSend = data.code || codeParam || searchParams.get("code") || "";

        try {
            const formData = new FormData();
            formData.append(
                "body",
                JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    code: codeToSend,
                }),
            );

            const result = await registerSeller(formData).unwrap();
            dispatch(setUser({ user: result.data.user, token: result.data.accessToken }));
            toast.success("Registration successful!", { id: toastId });
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error?.data?.message || "Registration failed. Please try again.", { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <AuthHeader />

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-3 sm:px-4 py-6 sm:py-12">
                <div className="w-full max-w-xl">
                    <div className="bg-white border-dashed rounded-lg p-4 sm:p-12">
                        {/* Title */}
                        <div className="text-center mb-6 sm:mb-10">
                            <h1 className="text-2xl font-extrabold text-[#7C5800]">Kungsbjörnen</h1>
                            <h2 className="text-lg font-bold text-gray-700 mt-1">Join the Fundraising Team</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">Create your seller account to get started.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Hidden Code Input */}
                            <input type="hidden" {...register("code")} />

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">FULL NAME</label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => <input type="text" placeholder="Erik Andersson" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Email and Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">EMAIL ADDRESS</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => <input type="email" disabled={!!emailFromQuery} className="w-full px-4 py-3 bg-gray-100 border border-gray-200 text-gray-500 rounded-lg focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed" {...field} />}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">PHONE NUMBER</label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => <input type="tel" placeholder="+46 00 000 00" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">PASSWORD</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Checkboxes */}
                            <div className="space-y-3 pt-2">
                                <Controller
                                    name="terms"
                                    control={control}
                                    render={({ field }) => (
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <div className="relative shrink-0 mt-0.5">
                                                <input type="checkbox" className="sr-only peer" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-[#7C5800] peer-checked:bg-[#7C5800] flex items-center justify-center transition-all">
                                                    {field.value && (
                                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-700 flex-1">
                                                I agree to the <span className="font-semibold">Terms of Service</span> and acknowledge the <span className="font-semibold">Privacy Policy</span>.
                                            </span>
                                        </label>
                                    )}
                                />
                                {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Join Team</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an invitation code or account?{" "}
                                <Link href={loginUrl} className="font-bold text-[#7C5800] hover:underline">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const RegisterSellerClient = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50 flex items-center justify-center p-4">Loading registration...</div>}>
            <RegisterSellerForm />
        </Suspense>
    );
};

export default RegisterSellerClient;
