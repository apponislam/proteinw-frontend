"use client";

import Link from "next/link";
import { useState } from "react";
import { Trophy, GraduationCap, Users, Target } from "lucide-react";

const page = () => {
    const [selectedProfession, setSelectedProfession] = useState<string | null>(null);

    const professions = [
        { name: "LEADER", icon: Trophy },
        { name: "TEACHER", icon: GraduationCap },
        { name: "PARENT", icon: Users },
        { name: "COACH", icon: Target },
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition">
                        Kungsbörnen
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/auth/login" className="text-gray-700 font-medium hover:text-gray-900">
                            Sign In
                        </Link>
                        <Link href="/auth/register" className="inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
                <div className="w-full max-w-2xl">
                    {/* Form Card */}
                    <div className="bg-white border-dashed rounded-lg p-8 sm:p-12">
                        {/* Logo and Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-black text-xl text-center font-extrabold mb-4">Kungsbjörnen</h1>
                            <h2 className="text-3xl text-gray-900 font-bold">Create your account</h2>
                        </div>

                        {/* Form */}
                        <form className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">FULL NAME</label>
                                <input type="text" placeholder="Erik Andersson" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>

                            {/* Two Column Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">EMAIL ADDRESS</label>
                                    <input type="email" placeholder="erik@archive.com" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">PHONE NUMBER</label>
                                    <input type="tel" placeholder="+46 00 000 00" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </div>
                            </div>

                            {/* Organization Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">ORGANIZATION CATEGORY</label>
                                <input type="text" placeholder="School Name" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>

                            {/* Group/Team Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">GROUP / TEAM NAME</label>
                                <input type="text" placeholder="Class 2024 / Team Blue" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>

                            {/* Your Profession */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">YOUR PROFESSION</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                    {professions.map((profession) => {
                                        const Icon = profession.icon;
                                        return (
                                            <button
                                                key={profession.name}
                                                type="button"
                                                onClick={() => setSelectedProfession(profession.name)}
                                                className={`px-3 py-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${selectedProfession === profession.name ? "border-[#7C5800] bg-[#FFDEA8] text-[#271900] font-semibold" : "border-white bg-[#E8E8E8] text-[#78716C] hover:border-[#EFAC02] hover:bg-white"}`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                {profession.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">PASSWORD</label>
                                <div className="relative">
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </div>
                                <div className="mt-2 text-xs text-gray-600">
                                    <span className="font-semibold">STRENGTH:</span> <span className="text-blue-600">MODERATE</span>
                                </div>
                            </div>

                            {/* Terms & Conditions */}
                            <div className="space-y-3 pt-2">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300" />
                                    <span className="text-sm text-gray-700">
                                        I agree to the <span className="font-semibold">Terms of Service</span> and acknowledge the <span className="font-semibold">Privacy Policy</span> regarding how my data is managed.
                                    </span>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300" />
                                    <span className="text-sm text-gray-700">I am 18+</span>
                                </label>
                            </div>

                            {/* Create Account Button */}
                            <button type="submit" className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 mt-6">
                                Create Account
                                <span>→</span>
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="text-center mt-8">
                            <p className="text-gray-700">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="text-amber-600 hover:text-amber-700 font-semibold">
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

export default page;
