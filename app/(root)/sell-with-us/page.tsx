import type { Metadata } from "next";
import FundraisingSection from "@/components/sell-with-us/FundraisingSection";
import HowItWorks from "@/components/sell-with-us/HowItWorks";
import SellWithUs from "@/components/sell-with-us/SellWithUs";
import React from "react";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Sell With Us",
    description: "Start selling with Kungsbjörnen and fundraise for your team",
};

const page = () => {
    return (
        <>
            <SellWithUs />
            <HowItWorks />
            <FundraisingSection />
        </>
    );
};

export default page;
