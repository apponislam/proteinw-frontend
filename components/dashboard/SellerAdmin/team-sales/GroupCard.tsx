import React from "react";
import Link from "next/link";

interface GroupCardProps {
    className: string;
    id: string;
    name: string;
    campaignName: string;
    activeSellers: string;
    totalSales: string;
    nextTierProfit: string;
    untilBonus: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ className, id, name, campaignName, activeSellers, totalSales, nextTierProfit, untilBonus }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group ${className}`}>
            <div className="relative z-10">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{name}</h3>
                    <p className="text-[#78716C] text-sm mt-1 group-hover:text-[#271900] transition-colors duration-300">{campaignName}</p>
                </div>

                <div className="mb-4">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">Active Sellers</div>
                    <div className="text-[#D97706] font-bold text-lg">{activeSellers}</div>
                </div>

                <div className="mb-4">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">Total Sales</div>
                    <div className="text-[#1A1C1C] font-bold text-lg group-hover:text-[#271900] transition-colors duration-300">{totalSales}</div>
                </div>

                <div className="mb-6">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">NEXT TIER PROFIT</div>
                    <div className="text-[#D97706] font-bold text-lg mb-1">{nextTierProfit}</div>
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">{untilBonus}</div>
                </div>

                <Link href={`/dashboard/team-sales/${id}`} className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2">
                    Manage Group
                </Link>
            </div>
        </div>
    );
};

export default GroupCard;
