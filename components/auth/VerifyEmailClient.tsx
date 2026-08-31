"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useVerifyEmailQuery, useResendVerificationEmailMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import AuthHeader from "./AuthHeader";

const VerifyEmailClient = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { data, error, isLoading, isSuccess, isError } = useVerifyEmailQuery({ email, token }, { skip: !email || !token });

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
            const resData = data as any;
            setSuccessMessage(resData?.message || "Email verified successfully.");
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
            <AuthHeader />

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-3 sm:px-4 py-6 sm:py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white border-dashed rounded-lg p-4 sm:p-8 shadow-sm">
                        {/* Logo */}
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-extrabold text-[#7C5800]">Kungsbjörnen</h1>
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
                                <h2 className="text-2xl text-gray-900 font-bold mb-4">Email Verified!</h2>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <p className="text-green-800 text-sm font-medium">{successMessage}</p>
                                </div>
                                <div className="space-y-3">
                                    {/* <Link href="/dashboard" className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all rounded-[24px] gap-2">
                                        Go to Dashboard
                                        <span>→</span>
                                    </Link> */}
                                    <Link href="/" className="w-full inline-flex items-center justify-center border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all rounded-[24px] cursor-pointer">
                                        Back to Homepage
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
                                <h2 className="text-2xl text-gray-900 font-bold mb-4">Verification Failed</h2>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                    <p className="text-red-700 text-sm">{errorMessage}</p>
                                </div>
                                <div className="space-y-3">
                                    {email && (
                                        <button
                                            onClick={handleResend}
                                            disabled={isResending}
                                            className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all rounded-[24px] gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isResending ? "Resending..." : "Resend Verification Email"}
                                        </button>
                                    )}
                                    <Link href="/dashboard" className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all rounded-[24px] gap-2 cursor-pointer">
                                        Go to Dashboard
                                    </Link>
                                    <Link href="/" className="w-full inline-flex items-center justify-center border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all rounded-[24px] cursor-pointer">
                                        Back to Homepage
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
