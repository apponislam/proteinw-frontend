"use client";

import React from "react";
import GroupCards from "@/components/dashboard/SellerAdmin/team-sales/GroupCards";

const Page = () => {
    return (
        <div>
            <div>
                <h1 className="text-sm text-[#7C5800] mb-3 uppercase font-medium">TEAM SALES</h1>
                <h2 className="text-5xl text-[#1A1C1C] mb-3">Your Groups Overview</h2>
                <p className="text-[#78716C] text-lg">Track all your active groups and their performance.</p>
            </div>
            <GroupCards />
        </div>
    );
};

export default Page;
