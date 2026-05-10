"use client";

import React from "react";
import SellersCard from "@/components/dashboard/Admin/Sellers/SellersCard";
import SellersTable from "@/components/dashboard/Admin/Sellers/SellersTable";

const SellersPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">Sellers</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Manage your fundraising network. Track performance across individual sellers and organized groups with real-time analytics.</p>
                </div>
            </div>

            <SellersCard />
            <SellersTable />
        </div>
    );
};

export default SellersPage;
