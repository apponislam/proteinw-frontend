"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

interface SupportPageTopProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onSearchSubmit: () => void;
}

const SupportPageTop = ({ searchQuery, onSearchChange, onSearchSubmit }: SupportPageTopProps) => {
    return (
        <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="w-full lg:max-w-xl">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#1A1C1C] mb-4 sm:mb-6 leading-tight">
                        How can we <span className="text-[#7C5800]">support</span> your mission?
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-[#514532] mb-6 sm:mb-8 leading-relaxed">
                        Find clear answers to your questions about our Nordic fundraising model, or reach out to our archive coordinators for personalized assistance.
                    </p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSearchSubmit();
                        }}
                        className="relative w-full"
                    >
                        <Search className="text-[#837560] absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                            type="text"
                            placeholder="Search our knowledge base..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="bg-[#E8E8E8] rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-transparent placeholder:text-[#837560] pl-10 sm:pl-11 pr-24 w-full"
                        />
                        <button type="submit" className="absolute right-2 top-1.5 bottom-1.5 text-[#7C5800] px-3 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer hover:bg-black/5 transition-all">
                            Search
                        </button>
                    </form>
                </div>
                <Image src="/about/aboutusbg.PNG" alt="Support" width={400} height={400} loading="eager" className="w-full max-w-sm lg:max-w-md lg:w-125 rounded-3xl object-cover hidden sm:block" />
            </div>
        </div>
    );
};

export default SupportPageTop;
