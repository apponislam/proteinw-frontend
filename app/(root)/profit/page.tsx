import FundraisingCalculatorLeft from "@/components/profit/FundraisingCalculatorLeft";
import FundraisingSummary from "@/components/profit/FundraisingSummary";
import React from "react";

const Page = () => {
    return (
        <div className="bg-[#FAFAF9CC]">
            <div className="container mx-auto py-14">
                <div className="flex flex-col justify-center items-center gap-6 mb-10">
                    <span className="text-center px-5 py-1 font-bold text-sm rounded-[32px] bg-[#FDD48E] text-[#785A20]">CALCULATOR</span>
                    <h1 className="text-7xl font-bold ">See Your Profit</h1>
                    <p className="text-center text-xl">
                        Calculate how much your class or team can earn by selling our <br className="hidden sm:block" /> premium curated Nordic heritage collections.
                    </p>
                </div>

                <FundraisingCalculatorLeft></FundraisingCalculatorLeft>
                <FundraisingSummary></FundraisingSummary>
                {/* <FundraisingCalculator></FundraisingCalculator> */}
            </div>
        </div>
    );
};

export default Page;
