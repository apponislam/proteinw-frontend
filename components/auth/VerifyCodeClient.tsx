"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import AuthHeader from "./AuthHeader";

const verifyCodeSchema = z.object({
    code: z.string().length(6, "Ange hela den 6-siffriga koden"),
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
            toast.success("Koden verifierades!");
            router.push(`/auth/create-password?token=${encodeURIComponent(result.data.token)}`);
        } catch (err: any) {
            toast.error(err.data?.message || "Misslyckades att verifiera koden");
            console.error("Verify OTP failed:", err);
        }
    };

    const handleResend = async () => {
        if (!email) return;
        try {
            await resendOtp({ email }).unwrap();
            toast.success("Koden har skickats igen!");
            setCountdown(60); // Reset countdown
        } catch (err: any) {
            toast.error(err.data?.message || "Misslyckades att skicka koden igen");
            console.error("Resend OTP failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <AuthHeader />

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-2 sm:px-4 py-8 sm:py-12">
                <div className="w-full max-w-md">
                    {/* Form Card */}
                    <div className="bg-white border-dashed rounded-lg p-3 sm:p-8">
                        {/* Logo and Title */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-2xl font-extrabold text-[#7C5800]">Kungsbjörnen</h1>
                            <h2 className="text-lg font-bold text-gray-700 mt-1">Verifiera din e-post</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Ange verifieringskoden som skickats till din e-post</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {/* OTP Input Boxes */}
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-4 text-center">VERIFIERINGSKOD</label>
                                <Controller
                                    name="code"
                                    control={control}
                                    render={() => (
                                        <div className="grid grid-cols-6 gap-1.5 sm:gap-3 max-w-[320px] sm:max-w-none mx-auto">
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
                                                    className="w-full aspect-square text-center text-lg sm:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-gray-50 hover:border-gray-400 p-0"
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
                                className="w-full bg-linear-to-r inline-flex items-center justify-center from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isVerifying ? "Verifierar..." : "Verifiera kod"}
                                <span>→</span>
                            </button>
                        </form>

                        {/* Resend Code Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-700 text-sm">
                                Fick du ingen kod?{" "}
                                {countdown > 0 ? (
                                    <span className="text-gray-500">Skicka igen om {countdown}s</span>
                                ) : (
                                    <button onClick={handleResend} disabled={isResending} className="cursor-pointer text-amber-600 hover:text-amber-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isResending ? "Skickar igen..." : "Skicka igen"}
                                    </button>
                                )}
                            </p>
                        </div>

                        {/* Back to Login Link */}
                        <div className="text-center mt-4">
                            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
                                Tillbaka till inloggningen
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VerifyCodeClient;
