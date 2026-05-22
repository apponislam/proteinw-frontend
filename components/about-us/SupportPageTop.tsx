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
        <div className="container mx-auto px-6">
            <div className="flex items-center justify-between gap-8 ">
                <div>
                    <h1 className="text-4xl md:text-7xl text-[#1A1C1C] mb-6">
                        How can we <br className="hidden md:block" /> <span className="text-[#7C5800]">support</span> your <br className="hidden md:block" /> mission?
                    </h1>

                    <p className="text-lg text-[#514532] mb-8">
                        Find clear answers to your questions about our Nordic fundraising <br className="hidden md:block" /> model, or reach out to our archive coordinators for personalized <br className="hidden md:block" /> assistance.
                    </p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSearchSubmit();
                        }}
                        className="relative"
                    >
                        <Search className="text-[#837560] absolute left-3 top-4" />
                        <input type="text" placeholder="Search our knowledge base..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="bg-[#E8E8E8] rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-transparent placeholder:text-[#837560] pl-10 pr-24 w-full" />
                        <button type="submit" className="absolute right-2 top-2 bottom-2 text-[#7C5800] px-3 rounded-xl font-semibold cursor-pointer">
                            Search
                        </button>
                    </form>
                </div>
                <Image src="/about/aboutusbg.PNG" alt="Support" width={400} height={400} loading="eager" className="w-auto md:w-125  rounded-3xl hidden md:block" />
            </div>
        </div>
    );
};

export default SupportPageTop;
