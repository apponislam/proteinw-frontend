"use client";
import Link from "next/link";
import { useState, useRef } from "react";

const Page = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

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

            if (digits.length === 6) {
                inputRefs.current[5]?.focus();
            } else {
                inputRefs.current[digits.length]?.focus();
            }
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
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            {/* OTP Input Boxes */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-4">VERIFICATION CODE</label>
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
                            </div>

                            {/* Verify Button */}
                            <button type="submit" className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2">
                                Verify Code
                                <span>→</span>
                            </button>
                        </form>

                        {/* Resend Code Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-700 text-sm">
                                Didn&apos;t receive the code? <button className="text-amber-600 hover:text-amber-700 font-semibold">Resend</button>
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

export default Page;
