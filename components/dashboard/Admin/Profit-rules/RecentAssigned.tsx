"use client";

import React from "react";
import Image from "next/image";

interface Assignment {
    groupName: string;
    tier: string;
    category: string;
    members: number;
    assignedDate: string;
}

const RecentAssigned: React.FC = () => {
    const assignments: Assignment[] = [
        {
            groupName: "Lincoln High Seniors",
            tier: "45% Tier",
            category: "Education",
            members: 84,
            assignedDate: "Assigned Oct 12",
        },
        {
            groupName: "Northside Youth Soccer",
            tier: "40% Tier",
            category: "Sports",
            members: 120,
            assignedDate: "Assigned Oct 10",
        },
        {
            groupName: "City Hope Foundation",
            tier: "50% Tier",
            category: "Non-Profit",
            members: 240,
            assignedDate: "Assigned Oct 08",
        },
    ];

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Recent Assignments</h2>
                            <p className="text-[#78716C] text-sm mt-1">Latest groups mapped to pricing tiers</p>
                        </div>
                        <button className="h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all">Assign New Group</button>
                    </div>
                    <div className="space-y-4">
                        {assignments.map((assignment, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-[#F5F5F4] rounded-lg hover:border-[#D97706] hover:bg-[#FFF7ED] transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#D97706] text-white flex items-center justify-center font-bold text-lg">{assignment.groupName.charAt(0)}</div>
                                    <div>
                                        <div className="font-bold text-[#1A1C1C]">{assignment.groupName}</div>
                                        <div className="text-[#78716C] text-sm">
                                            {assignment.category} • {assignment.members} Members
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-[#D97706]">{assignment.tier}</div>
                                    <div className="text-[#78716C] text-sm">{assignment.assignedDate}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#F59E0B1A] rounded-[32px] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] p-6 flex items-center justify-center relative overflow-hidden">
                    <Image src="/dashboard/superadmin/overlayrighttop.png" alt="" width={117} height={129} className="absolute right-0 top-0 opacity-50" />
                    <Image src="/dashboard/superadmin/overleyleftbottom.png" alt="" width={117} height={129} className="absolute left-0 bottom-0 opacity-50" />
                    <div className="relative z-10">
                        <div className="text-[#F59E0B] text-center text-sm mb-2">Total Distributed Profit</div>
                        <div className="text-4xl text-center font-bold text-[#FBBF24]">$842,500</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentAssigned;
