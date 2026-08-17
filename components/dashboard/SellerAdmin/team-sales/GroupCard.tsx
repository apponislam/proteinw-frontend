import React from "react";
import Link from "next/link";
import { TMyGroupSummary } from "@/redux/features/group/groupApi";

interface GroupCardProps {
    group: TMyGroupSummary;
    className?: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, className = "" }) => {
    const totalSellersCount = group.totalSellers ?? 0;
    const activeCampaignsCount = group.activeCampaigns ?? 0;
    const totalCampaignsCount = group.totalCampaigns ?? 0;

    const activeCampaignPkgs = group.activeCampaignPackagesSold ?? 0;
    const activeCampaignRevenue = group.activeCampaignTotalSales ?? 0;

    const totalPackages = group.packagesSold ?? 0;
    const totalSalesNum = group.totalSales ?? 0;

    return (
        <div className={`bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group flex flex-col justify-between ${className}`}>
            <div className="relative z-10">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{group.name}</h3>
                    <p className="text-[#78716C] text-sm mt-1 group-hover:text-[#271900] transition-colors duration-300 line-clamp-2">{group.shortDescription || `Code: ${group.code}`}</p>
                </div>

                {/* Key-Value Left-Right Data List */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[#78716C] text-xs font-semibold group-hover:text-[#271900] transition-colors duration-300 uppercase tracking-wider">Active Sellers</span>
                        <span className="text-[#D97706] font-bold text-sm">{totalSellersCount} Seller{totalSellersCount !== 1 ? "s" : ""}</span>
                    </div>

                    <div className="flex items-start justify-between">
                        <span className="text-[#78716C] text-xs font-semibold group-hover:text-[#271900] transition-colors duration-300 uppercase tracking-wider mt-0.5">Active Campaigns</span>
                        <div className="flex flex-col items-end">
                            <span className="text-[#D97706] font-bold text-sm">{activeCampaignsCount} Active</span>
                            <span className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">{totalCampaignsCount} Total</span>
                        </div>
                    </div>

                    <div className="flex items-start justify-between">
                        <span className="text-[#78716C] text-xs font-semibold group-hover:text-[#271900] transition-colors duration-300 uppercase tracking-wider mt-0.5">Active Campaign Sales</span>
                        <div className="flex flex-col items-end">
                            <span className="text-[#1A1C1C] font-bold text-sm group-hover:text-[#271900] transition-colors duration-300">{activeCampaignRevenue.toLocaleString()} SEK</span>
                            <span className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">{activeCampaignPkgs} package{activeCampaignPkgs !== 1 ? "s" : ""}</span>
                        </div>
                    </div>

                    <div className="flex items-start justify-between">
                        <span className="text-[#78716C] text-xs font-semibold group-hover:text-[#271900] transition-colors duration-300 uppercase tracking-wider mt-0.5">Total Sales</span>
                        <div className="flex flex-col items-end">
                            <span className="text-[#1A1C1C] font-bold text-sm group-hover:text-[#271900] transition-colors duration-300">{totalSalesNum.toLocaleString()} SEK</span>
                            <span className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">{totalPackages} package{totalPackages !== 1 ? "s" : ""}</span>
                        </div>
                    </div>
                </div>

                <Link
                    href={`/dashboard/team-sales/${group._id}`}
                    className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
                >
                    Manage Group
                </Link>
            </div>
        </div>
    );
};

export default GroupCard;
