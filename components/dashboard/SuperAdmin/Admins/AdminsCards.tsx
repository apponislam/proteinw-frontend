"use client";

import React from "react";
import Image from "next/image";
import { useGetSuperAdminAdminsStatsQuery } from "../../../../redux/features/dashboard/dashboardApi";

/* PREVIOUS STATIC CODE (COMMENTED OUT):
const adminStats = [
    {
        title: "ACTIVE ADMINS",
        value: "14",
        subtitle: "+2 this month",
        color: "#D97706",
    },
    {
        title: "TOTAL GROUPS",
        value: "82",
        subtitle: "across 12 regions",
        color: "#D97706",
    },
    {
        title: "AVG PERFORMANCE",
        value: "94%",
        subtitle: "Optimized",
        color: "#D97706",
    },
    {
        title: "AUDIT LOGS",
        value: "1.2k",
        subtitle: "Last 24h",
        color: "#D97706",
    },
];
*/

const AdminsCards = () => {
    const { data: response, isLoading } = useGetSuperAdminAdminsStatsQuery();
    const stats = response?.data;

    const cardsData = [
        {
            title: "TOTAL ADMINS",
            value: stats ? stats.totalAdmins : "--",
            subtitle: "All system controllers",
        },
        {
            title: "APPROVED ADMINS",
            value: stats ? stats.approvedAdmins : "--",
            subtitle: "Active & approved",
        },
        {
            title: "UNAPPROVED ADMINS",
            value: stats ? stats.unapprovedAdmins : "--",
            subtitle: "Pending super admin approval",
        },
        {
            title: "UNASSIGNED GROUP ADMINS",
            value: stats ? stats.unassignedGroupAdmins : "--",
            subtitle: "No group assigned yet",
        },
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-5 sm:p-6 rounded-xl shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] animate-pulse h-32" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {cardsData.map((stat, index) => (
                <div key={index} className="bg-white p-5 sm:p-6 rounded-xl shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer">
                    <div className="relative z-10">
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider mb-1.5 sm:mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.title}</div>
                        <div className="text-2xl sm:text-3xl font-bold text-[#1A1C1C] mb-1.5 sm:mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.value}</div>
                        <div className="text-[#78716C] text-xs sm:text-sm group-hover:text-[#271900] transition-colors duration-300">{stat.subtitle}</div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminsCards;
