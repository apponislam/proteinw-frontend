"use client";

import React from "react";
import SellersCard from "@/components/dashboard/SuperAdmin/Sellers/SellersCard";
import SellersTable from "@/components/dashboard/SuperAdmin/Sellers/SellersTable";

const SellersPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">Säljare</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Hantera ditt insamlingsnätverk. Spåra prestanda för enskilda säljare och organiserade grupper med realtidsanalys.</p>
                </div>
            </div>

            <SellersCard />
            <SellersTable />
        </div>
    );
};

export default SellersPage;
