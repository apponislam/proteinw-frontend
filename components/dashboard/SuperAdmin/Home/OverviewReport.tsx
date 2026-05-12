import Link from "next/link";
import React from "react";

const groupData = [
    {
        name: "Sollentuna Tigers P14",
        campaign: "Anders Wilhelmsson",
        units: "1,240",
        revenue: "€31,000",
        profit: "€9,300",
    },
    {
        name: "Bromma Ridklubb",
        campaign: "Karin Ström",
        units: "980",
        revenue: "€24,500",
        profit: "€7,350",
    },
    {
        name: "Vasa Konstsim",
        campaign: "Lars Ekdahl",
        units: "754",
        revenue: "€18,850",
        profit: "€5,655",
    },
];

const OverviewReport = () => {
    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-[#1A1C1C] text-xl font-bold">Total Profit per Group</h2>
                    <p className="text-[#78716C] text-sm mt-1">Revenue distribution for the top-performing groups this quarter.</p>
                </div>
                <Link href="/dashboard/groups">
                    <button className="text-[#D97706] font-medium text-sm hover:underline cursor-pointer">View all reports</button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#FAFAF9]">
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GROUP NAME</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">CAMPAIGN Admin</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">UNITS SOLD</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">REVENUE</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GROUP PROFIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupData.map((group, index) => {
                            const groupCode = group.name
                                .split(" ")
                                .slice(0, 2)
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase();
                            return (
                                <tr key={index} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-md bg-[#F5F5F4] bg-opacity-10 flex items-center justify-center text-[#D97706] font-bold text-sm">{groupCode}</div>
                                            <span className="text-[#1A1C1C] font-medium">{group.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-[#78716C]">{group.campaign}</td>
                                    <td className="px-4 py-4 text-[#1A1C1C] font-medium">{group.units}</td>
                                    <td className="px-4 py-4 text-[#1A1C1C] font-medium">{group.revenue}</td>
                                    <td className="px-4 py-4 text-[#D97706] font-bold">{group.profit}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OverviewReport;
