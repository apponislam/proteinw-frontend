"use client";

import React from "react";
import GroupCards from "@/components/dashboard/SuperAdmin/Groups/GroupCards";
import GroupsTable from "@/components/dashboard/SuperAdmin/Groups/GroupsTable";

const GroupsPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">Group Management</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Orchestrate fundraising initiatives across all regional clusters and maintain real-time oversight of profit tiers.</p>
                </div>
            </div>

            <GroupCards />
            <GroupsTable />
        </div>
    );
};

export default GroupsPage;
