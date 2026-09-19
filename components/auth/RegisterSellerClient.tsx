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

const sellerRegisterSchema = z
    .object({
        name: z.string().min(2, "Namnet måste vara minst 2 tecken"),
        email: z.string().email("Ange en giltig e-postadress"),
        phone: z.string().min(5, "Ange ett giltigt telefonnummer"),
        password: z.string().min(8, "Lösenordet måste vara minst 8 tecken"),
        confirmPassword: z.string().min(1, "Bekräfta ditt lösenord"),
        code: z.string().optional(),
        terms: z.boolean().refine((val) => val === true, "Du måste godkänna villkoren"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Lösenorden matchar inte",
        path: ["confirmPassword"],
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

    // Track if user was already authenticated on mount
    const [wasAlreadyAuthenticated] = React.useState(() => !!token);

    // If user was ALREADY logged in before opening page and visits invitation link with code, automatically join group & redirect
    useEffect(() => {
        if (!token || !wasAlreadyAuthenticated) return;

        if (codeParam) {
            const handleAutoJoin = async () => {
                const toastId = toast.loading("Går med i gruppen med inbjudningskoden...");
                try {
                    await joinGroupByInvitationCode({ code: codeParam }).unwrap();
                    toast.success("Du har gått med i gruppen!", { id: toastId });
                } catch (err: any) {
                    toast.error(err?.data?.message || "Misslyckades att gå med i gruppen.", { id: toastId });
                } finally {
                    router.push("/dashboard");
                }
            };
            handleAutoJoin();
        } else {
            router.push("/dashboard");
        }
    }, [token, wasAlreadyAuthenticated, codeParam, joinGroupByInvitationCode, router]);

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
            confirmPassword: "",
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
        const toastId = toast.loading("Skapar säljarkonto...");
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
            toast.success("Registreringen lyckades!", { id: toastId });
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error?.data?.message || "Registreringen misslyckades. Försök igen.", { id: toastId });
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
                            <h2 className="text-lg font-bold text-gray-700 mt-1">Gå med i försäljningsteamet</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">Skapa ditt säljarkonto för att komma igång.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Hidden Code Input */}
                            <input type="hidden" {...register("code")} />

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">FULLSTÄNDIGT NAMN</label>
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
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-POSTADRESS</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => <input type="email" disabled={!!emailFromQuery} className="w-full px-4 py-3 bg-gray-100 border border-gray-200 text-gray-500 rounded-lg focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed" {...field} />}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">TELEFONNUMMER</label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => <input type="tel" placeholder="+46 70 000 00 00" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">LÖSENORD</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">BEKRÄFTA LÖSENORD</label>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
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
                                                Jag godkänner{" "}
                                                <Link href="/terms-of-service" target="_blank" className="font-semibold text-[#7C5800] hover:underline" onClick={(e) => e.stopPropagation()}>
                                                    användarvillkoren
                                                </Link>{" "}
                                                och har tagit del av{" "}
                                                <Link href="/privacy-policy" target="_blank" className="font-semibold text-[#7C5800] hover:underline" onClick={(e) => e.stopPropagation()}>
                                                    integritetspolicyn
                                                </Link>
                                                .
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
                                        <span>Skapar konto...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Gå med i teamet</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-600">
                                Har du redan en inbjudningskod eller ett konto?{" "}
                                <Link href={loginUrl} className="font-bold text-[#7C5800] hover:underline">
                                    Logga in här
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
        <Suspense fallback={<div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50 flex items-center justify-center p-4">Laddar registrering...</div>}>
            <RegisterSellerForm />
        </Suspense>
    );
};

export default RegisterSellerClient;
