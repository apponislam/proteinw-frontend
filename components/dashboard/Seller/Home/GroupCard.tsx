import { GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";

interface GroupCardProps {
    group: any;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    const activeSellersCount = group?.totalSellers ?? group?.activeSellers ?? 0;
    const totalPackages = group?.totalPackagesSold ?? group?.tierInfo?.totalPackagesSold ?? 0;
    const totalSalesNum = group?.totalRevenue ?? group?.tierInfo?.totalRevenue ?? 0;

    const campaignName = group?.runningCampaign?.name || (group?.runningCampaignId as any)?.name || group?.shortDescription || "Fundraising Group";

    const totalActiveCampaigns = group?.totalActiveCampaigns ?? 0;
    const totalCampaigns = group?.totalCampaigns ?? 0;

    const tierInfo = group?.tierInfo;
    const nextTierProfitText = tierInfo?.nextTier ? `${tierInfo.nextTier.percentage}%` : null;
    const untilBonusText = tierInfo?.nextTier 
        ? `${tierInfo.packagesNeededForNextTier || 0} package${(tierInfo.packagesNeededForNextTier || 0) > 1 ? "s" : ""} until ${tierInfo.nextTier.percentage}% profit bonus` 
        : null;
    const progress = tierInfo?.nextTier && tierInfo.nextTier.minSalesVolume 
        ? Math.min(100, Math.round((totalPackages / tierInfo.nextTier.minSalesVolume) * 100)) 
        : null;

    const totalSalesText = `${totalPackages} package${totalPackages !== 1 ? "s" : ""} (${totalSalesNum.toLocaleString()} SEK)`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group flex flex-col justify-between">
            <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-[#F5F5F4] w-14 h-14 rounded-[16px] flex items-center justify-center">
                        <GraduationCap className="w-7 h-7" />
                    </div>
                </div>

                <div className="mb-6 text-center">
                    <h3 className="text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{group?.name}</h3>
                    <p className="text-[#78716C] text-sm mt-1 group-hover:text-[#271900] transition-colors duration-300">{campaignName}</p>
                </div>

                <div className="mb-3 flex items-center justify-between">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">Active Sellers</div>
                    <div className="text-[#D97706] font-bold text-base">{activeSellersCount}</div>
                </div>

                <div className="mb-3 flex items-start justify-between">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">Campaigns</div>
                    <div className="text-right">
                        <div className="text-[#D97706] font-bold text-base">{totalActiveCampaigns} Active</div>
                        <div className="text-[#1A1C1C] font-bold text-base group-hover:text-[#271900] transition-colors duration-300">{totalCampaigns} Total</div>
                    </div>
                </div>

                <div className="mb-3 flex items-start justify-between">
                    <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">Total Sales</div>
                    <div className="text-right">
                        <div className="text-[#1A1C1C] font-bold text-base group-hover:text-[#271900] transition-colors duration-300">
                            {totalPackages} package{totalPackages !== 1 ? "s" : ""}
                        </div>
                        <div className="text-[#78716C] font-medium text-xs group-hover:text-[#271900] transition-colors duration-300">
                            ({totalSalesNum.toLocaleString()} SEK)
                        </div>
                    </div>
                </div>

                {nextTierProfitText && (
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">NEXT TIER PROFIT</div>
                        <div className="text-[#D97706] font-bold text-lg">{nextTierProfitText}</div>
                    </div>
                )}

                {typeof progress === "number" && (
                    <div className="w-full h-2 bg-[#E7E5E4] rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                )}

                {untilBonusText && (
                    <div className="mb-6">
                        <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">{untilBonusText}</div>
                    </div>
                )}
            </div>

            <div className="relative z-10 mt-4">
                <Link href={`/dashboard/seller/group/${group?._id || ""}`}>
                    <button className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 cursor-pointer">View Group</button>
                </Link>
            </div>
        </div>
    );
};

export default GroupCard;
