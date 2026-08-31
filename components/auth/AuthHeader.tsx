"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface AuthHeaderProps {
    activePage?: "login" | "register";
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ activePage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition">
                    Kungsbörnen
                </Link>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-4 items-center">
                    {activePage === "login" ? (
                        <Link href="/auth/register" className="text-gray-700 font-medium hover:text-gray-900">
                            Sign Up
                        </Link>
                    ) : (
                        <Link href="/auth/login" className="text-gray-700 font-medium hover:text-gray-900">
                            Sign In
                        </Link>
                    )}
                    <Link
                        href="/auth/register"
                        className="inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] cursor-pointer"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Hamburger Button */}
                <div className="md:hidden flex items-center">
                    <button type="button" onClick={() => setIsMenuOpen((prev) => !prev)} className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer" aria-label="Toggle Navigation Menu">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu (Absolute Overlay) */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 space-y-2 shadow-lg rounded-b-xl animate-in fade-in duration-150">
                    {activePage === "login" ? (
                        <Link href="/auth/register" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                            Sign Up
                        </Link>
                    ) : (
                        <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                            Sign In
                        </Link>
                    )}
                    <Link href="/auth/register" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-5 py-2.5 text-sm font-medium text-white shadow-xs hover:from-[#8B6500] hover:to-[#FFCC00] transition-all rounded-[24px] cursor-pointer">
                        Get Started
                    </Link>
                </div>
            )}
        </header>
    );
};

export default AuthHeader;
