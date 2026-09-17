"use client";

import React from "react";
import GroupCards from "@/components/dashboard/SuperAdmin/Groups/GroupCards";
import GroupsTable from "@/components/dashboard/SuperAdmin/Groups/GroupsTable";

const GroupsPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">Grupphantering</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Organisera insamlingsinitiativ i alla regionala kluster och upprätthåll realtidstillsyn över vinstnivåer.</p>
                </div>
            </div>

            <GroupCards />
            <GroupsTable />
        </div>
    );
};

export default GroupsPage;
