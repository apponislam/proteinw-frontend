import type { Metadata } from "next";
import Fundraisingcalculator from "@/components/profit/Fundraisingcalculator";
import React from "react";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Profit Calculator",
    description: "Calculate your fundraising profit with Kungsbjörnen's profit calculator",
};

const Page = () => {
    return (
        <div className="bg-[#FAFAF9CC] min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-14">
                <div className="flex flex-col justify-center items-center gap-3 sm:gap-6 mb-8 sm:mb-10">
                    <span className="text-center px-4 sm:px-5 py-1 font-bold text-xs sm:text-sm rounded-[32px] bg-[#FDD48E] text-[#785A20]">CALCULATOR</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-regular leading-tight text-center">See Your Profit</h1>
                    <p className="text-center text-sm sm:text-base md:text-[18px] max-w-2xl text-gray-700">
                        Calculate how much your class or team can earn by selling our <br className="hidden sm:block" /> premium curated Nordic heritage collections.
                    </p>
                </div>

                <Fundraisingcalculator></Fundraisingcalculator>
            </div>
        </div>
    );
};

export default Page;
