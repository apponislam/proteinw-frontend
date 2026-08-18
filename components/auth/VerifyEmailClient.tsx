"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useVerifyEmailQuery, useResendVerificationEmailMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const VerifyEmailClient = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState("");

    const { data, error, isLoading, isSuccess, isError } = useVerifyEmailQuery(
        { email, token },
        { skip: !email || !token }
    );

    const [resendEmail, { isLoading: isResending }] = useResendVerificationEmailMutation();

    useEffect(() => {
        if (!token || !email) {
            setStatus("error");
            setErrorMessage("Invalid or missing verification link parameters.");
            return;
        }

        if (isLoading) {
            setStatus("loading");
        } else if (isSuccess) {
            setStatus("success");
        } else if (isError) {
            setStatus("error");
            const errData = error as any;
            setErrorMessage(errData?.data?.message || "Failed to verify email. The link may be expired or invalid.");
        }
    }, [isLoading, isSuccess, isError, data, error, token, email]);

    const handleResend = async () => {
        if (!email) {
            toast.error("No email address found to resend verification link.");
            return;
        }
        try {
            await resendEmail({ email }).unwrap();
            toast.success("Verification link sent to your email!");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to resend verification email.");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition">
                        Kungsbjörnen
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/auth/login" className="text-gray-700 font-medium hover:text-gray-900">
                            Log In
                        </Link>
                        <Link
                            href="/auth/register"
                            className="inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px]"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white border-dashed rounded-lg p-8 shadow-sm">
                        {/* Logo */}
                        <div className="text-center mb-6">
                            <h1 className="text-black text-xl text-center font-extrabold mb-4">Kungsbjörnen</h1>
                        </div>

                        {/* Loading State */}
                        {status === "loading" && (
                            <div className="text-center py-6">
                                <div className="flex justify-center mb-4">
                                    <Loader2 className="w-16 h-16 text-[#7C5800] animate-spin" />
                                </div>
                                <h2 className="text-2xl text-gray-900 font-bold mb-2">Verifying Email...</h2>
                                <p className="text-gray-600 text-sm">Please wait while we verify your email link.</p>
                            </div>
                        )}

                        {/* Success State */}
                        {status === "success" && (
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl text-gray-900 font-bold">Email Verified!</h2>
                                <p className="text-gray-600 text-sm mt-2 mb-6">
                                    Your email <span className="font-semibold text-gray-800">{email}</span> has been successfully verified. You can now log in to your account.
                                </p>
                                <div className="space-y-3">
                                    <Link
                                        href="/auth/login"
                                        className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all rounded-[24px] gap-2"
                                    >
                                        Proceed to Login
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {status === "error" && (
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <XCircle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl text-gray-900 font-bold">Verification Failed</h2>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
                                    <p className="text-red-700 text-sm">{errorMessage}</p>
                                </div>
                                <div className="space-y-3">
                                    {email && (
                                        <button
                                            onClick={handleResend}
                                            disabled={isResending}
                                            className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all rounded-[24px] gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isResending ? "Resending..." : "Resend Verification Email"}
                                        </button>
                                    )}
                                    <Link
                                        href="/auth/login"
                                        className="w-full inline-flex items-center justify-center border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all rounded-[24px]"
                                    >
                                        Back to Login
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VerifyEmailClient;
