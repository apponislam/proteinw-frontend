"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MemberAuthHeaderProps {
    signInUrl?: string;
}

const MemberAuthHeader: React.FC<MemberAuthHeaderProps> = ({ signInUrl = "/auth/member/login" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition">
                    Kungsbörnen
                </Link>

                {/* Desktop Action Button */}
                <div className="hidden md:flex gap-4 items-center">
                    <Link
                        href={signInUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-[#7C5800] border border-amber-200 hover:bg-amber-100 rounded-full font-bold text-sm transition-all shadow-xs"
                    >
                        <span>Sign In</span>
                    </Link>
                </div>

                {/* Mobile Hamburger Button */}
                <div className="md:hidden flex items-center">
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                        aria-label="Toggle Navigation Menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu (Absolute Overlay) */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-lg rounded-b-xl animate-in fade-in duration-150">
                    <Link
                        href={signInUrl}
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-center py-2.5 px-4 bg-amber-50 text-[#7C5800] border border-amber-200 hover:bg-amber-100 rounded-full font-bold text-sm transition-all shadow-xs"
                    >
                        Sign In
                    </Link>
                </div>
            )}
        </header>
    );
};

export default MemberAuthHeader;
