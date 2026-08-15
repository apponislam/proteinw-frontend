"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const verifyCodeSchema = z.object({
    code: z.string().length(6, "Please enter the complete 6-digit code"),
});

type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;

const MemberVerifyCodeForm = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const code = searchParams.get("code") || "";

    const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
    const [countdown, setCountdown] = useState(30);

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<VerifyCodeFormValues>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: {
            code: "",
        },
    });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        const fullCode = newOtp.join("");
        setValue("code", fullCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        const digits = pastedData.replace(/\D/g, "").slice(0, 6);

        if (digits.length > 0) {
            const newOtp = digits.split("").concat(Array(6 - digits.length).fill(""));
            setOtp(newOtp);
            setValue("code", digits);

            if (digits.length === 6) {
                inputRefs.current[5]?.focus();
            } else {
                inputRefs.current[digits.length]?.focus();
            }
        }
    };

    const onSubmit = async (data: VerifyCodeFormValues) => {
        const toastId = toast.loading("Verifying code...");
        try {
            const result = await verifyOtp({ email, otp: data.code }).unwrap();
            toast.success("Code verified successfully!", { id: toastId });
            const nextParams = new URLSearchParams({
                token: result.data.token,
                ...(email && { email }),
                ...(code && { code }),
            }).toString();
            router.push(`/auth/member/create-password?${nextParams}`);
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to verify code", { id: toastId });
        }
    };

    const handleResend = async () => {
        if (!email) return;
        const toastId = toast.loading("Resending code...");
        try {
            await resendOtp({ email }).unwrap();
            toast.success("Code resent successfully!", { id: toastId });
            setCountdown(60);
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to resend code", { id: toastId });
        }
    };

    const loginUrl = `/auth/member/login?${new URLSearchParams({
        ...(email && { email }),
        ...(code && { code }),
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
                        <Link href={loginUrl} className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-[#7C5800] border border-amber-200 hover:bg-amber-100 rounded-full font-bold text-sm transition-all shadow-xs">
                            <span>Sign In</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white border border-gray-100 shadow-[0px_4px_25px_rgba(0,0,0,0.05)] rounded-2xl p-8 sm:p-10">
                        {/* Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-[#1A1C1C] text-xl font-extrabold tracking-tight mb-1">Kungsbjörnen</h1>
                            <h2 className="text-2xl text-gray-900 font-bold">Verify Code</h2>
                            <p className="text-xs text-gray-500 mt-1">
                                We sent a 6-digit verification code to <span className="font-bold text-gray-900">{email || "your email"}</span>.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* OTP Inputs */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 text-center">ENTER 6-DIGIT CODE</label>
                                <div className="flex justify-center items-center gap-2 sm:gap-3">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => {
                                                inputRefs.current[index] = el;
                                            }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={handlePaste}
                                            className="w-11 h-13 text-center text-xl font-bold bg-gray-100/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#D97706] focus:bg-white transition-all"
                                        />
                                    ))}
                                </div>
                                {errors.code && <p className="text-red-500 text-xs mt-2 text-center font-medium">{errors.code.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isVerifying}
                                className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none rounded-[24px] gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {isVerifying ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Verifying...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Verify Code</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                            <button
                                onClick={handleResend}
                                disabled={countdown > 0 || isResending}
                                className="font-bold text-[#7C5800] hover:underline disabled:opacity-50 cursor-pointer text-sm"
                            >
                                {isResending ? "Resending..." : countdown > 0 ? `Resend Code in ${countdown}s` : "Resend Code"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const MemberVerifyCodeClient = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50 flex items-center justify-center p-4">Loading...</div>}>
            <MemberVerifyCodeForm />
        </Suspense>
    );
};

export default MemberVerifyCodeClient;
