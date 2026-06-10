"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const verifyCodeSchema = z.object({
    code: z.string().length(6, "Please enter the complete 6-digit code"),
});

type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;

const VerifyCodeClient = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
    const [countdown, setCountdown] = useState(30);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<VerifyCodeFormValues>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: {
            code: "",
        },
    });

    // Start countdown on mount
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
        try {
            const result = await verifyOtp({ email, otp: data.code }).unwrap();
            toast.success("Code verified successfully!");
            router.push(`/auth/create-password?token=${encodeURIComponent(result.data.token)}`);
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to verify code");
            console.error("Verify OTP failed:", err);
        }
    };

    const handleResend = async () => {
        if (!email) return;
        try {
            await resendOtp({ email }).unwrap();
            toast.success("Code resent successfully!");
            setCountdown(60); // Reset countdown
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to resend code");
            console.error("Resend OTP failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition">
                        Kungsbörnen
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/auth/register" className="text-gray-700 font-medium hover:text-gray-900">
                            Sign Up
                        </Link>
                        <Link href="/auth/register" className="inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Form Card */}
                    <div className="bg-white border-dashed rounded-lg p-8">
                        {/* Logo and Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-black text-xl text-center font-extrabold">Kungsbjörnen</h1>
                            <h2 className="text-2xl text-gray-900">Verify Your Code</h2>
                            <p className="text-sm text-gray-600 mt-2">Enter the verification code sent to your email</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {/* OTP Input Boxes */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-4">VERIFICATION CODE</label>
                                <Controller
                                    name="code"
                                    control={control}
                                    render={() => (
                                        <div className="flex gap-3 justify-center">
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
                                                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-gray-50 hover:border-gray-400"
                                                />
                                            ))}
                                        </div>
                                    )}
                                />
                                {errors.code && <p className="text-red-500 text-xs mt-2 text-center">{errors.code.message}</p>}
                            </div>

                            {/* Verify Button */}
                            <button
                                type="submit"
                                disabled={isVerifying}
                                className="w-full bg-linear-to-r inline-flex items-center justify-center from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isVerifying ? "Verifying..." : "Verify Code"}
                                <span>→</span>
                            </button>
                        </form>

                        {/* Resend Code Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-700 text-sm">
                                Didn&apos;t receive the code?{" "}
                                {countdown > 0 ? (
                                    <span className="text-gray-500">Resend in {countdown}s</span>
                                ) : (
                                    <button onClick={handleResend} disabled={isResending} className="cursor-pointer text-amber-600 hover:text-amber-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isResending ? "Resending..." : "Resend"}
                                    </button>
                                )}
                            </p>
                        </div>

                        {/* Back to Login Link */}
                        <div className="text-center mt-4">
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

export default VerifyCodeClient;
