"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequestPasswordResetMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import AuthHeader from "./AuthHeader";

const forgotPasswordSchema = z.object({
    email: z.string().email("Ange en giltig e-postadress"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordClient = () => {
    const router = useRouter();
    const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
            await requestPasswordReset(data).unwrap();
            toast.success("Verifieringskod skickad till din e-post!");
            router.push(`/auth/verify-code?email=${encodeURIComponent(data.email)}`);
        } catch (err: any) {
            toast.error(err.data?.message || "Misslyckades att skicka verifieringskod");
            console.error("Request password reset failed:", err);
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
                    <div className="bg-white border-dashed rounded-lg p-4 sm:p-8">
                        {/* Logo and Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-extrabold text-[#7C5800]">Kungsbjörnen</h1>
                            <h2 className="text-lg font-bold text-gray-700 mt-1">Glömt lösenord?</h2>
                            <p className="text-sm text-gray-600 mt-1">Ange din e-postadress så skickar vi en verifieringskod för att återställa ditt lösenord.</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">E-POSTADRESS</label>
                                <div className="relative">
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => <input type="email" placeholder="namn@exempel.se" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Send Code Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-linear-to-r inline-flex items-center justify-center  from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Skickar..." : "Skicka kod"}
                                <span>→</span>
                            </button>
                        </form>

                        {/* Back to Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-700">
                                Kommer du ihåg ditt lösenord?{" "}
                                <Link href="/auth/login" className="text-amber-600 hover:text-amber-700 font-semibold">
                                    Tillbaka till inloggningen
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ForgotPasswordClient;
