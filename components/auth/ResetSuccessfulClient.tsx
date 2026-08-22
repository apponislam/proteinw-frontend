"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

import AuthHeader from "./AuthHeader";

const ResetSuccessfulClient = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <AuthHeader />

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-3 sm:px-4 py-6 sm:py-12">
                <div className="w-full max-w-md">
                    {/* Success Card */}
                    <div className="bg-white border-dashed rounded-lg p-4 sm:p-8">
                        {/* Logo and Success Icon */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-2xl font-extrabold text-[#7C5800]">Kungsbjörnen</h1>
                            <div className="flex justify-center my-4">
                                <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-green-500" strokeWidth={1.5} />
                            </div>
                            <h2 className="text-xl sm:text-2xl text-gray-900 font-bold">Password Reset Successful</h2>
                        </div>

                        {/* Success Message */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                            <p className="text-gray-700 text-center">Your password has been successfully updated. You can now log in with your new credentials.</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Link
                                href="/auth/login"
                                className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2"
                            >
                                Go to Login
                                <span>→</span>
                            </Link>
                            <Link
                                href="/"
                                className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2"
                            >
                                Back to Homepage
                                <span>←</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResetSuccessfulClient;
