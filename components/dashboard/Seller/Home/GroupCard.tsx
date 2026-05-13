import { GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Group {
    name: string;
    campaignName: string;
    activeSellers: string;
    totalSales: string;
    nextTierProfit: string;
    untilBonus: string;
    progress: number;
}

interface GroupCardProps {
    group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                    <div className="bg-[#F5F5F4] w-14 h-14 rounded-[16px] flex items-center justify-center">
                        <GraduationCap />
                    </div>
                </div>

                <div className="mb-4 text-center">
                    <h3 className="text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{group.name}</h3>
                    <p className="text-[#78716C] text-sm mt-1 group-hover:text-[#271900] transition-colors duration-300">{group.campaignName}</p>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">Active Sellers</div>
                    <div className="text-[#D97706] font-bold text-lg">{group.activeSellers}</div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">Total Sales</div>
                    <div className="text-[#1A1C1C] font-bold text-lg group-hover:text-[#271900] transition-colors duration-300">{group.totalSales}</div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">NEXT TIER PROFIT</div>
                    <div className="text-[#D97706] font-bold text-lg">{group.nextTierProfit}</div>
                </div>

                <div className="w-full h-2 bg-[#E7E5E4] rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${group.progress}%` }} />
                </div>

                <div className="mb-6">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">{group.untilBonus}</div>
                </div>

                <Link href={`/dashboard/seller/group/${group.name}`}>
                    <button className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 cursor-pointer">View Group</button>
                </Link>
            </div>
        </div>
    );
};

export default GroupCard;
