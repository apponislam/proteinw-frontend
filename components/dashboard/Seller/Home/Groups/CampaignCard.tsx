import React from "react";

const campaignColors = ["bg-[#D97706]", "bg-[#7C3AED]", "bg-[#10B981]", "bg-[#3B82F6]"];

export interface TTier {
    _id?: string;
    name?: string;
    percentage?: number;
    minSalesVolume?: number;
    maxSalesVolume?: number;
}

export interface TTierInfo {
    currentTier?: TTier | null;
    nextTier?: TTier | null;
    packagesNeededForNextTier?: number;
}

interface CampaignCardProps {
    id?: string;
    title: string;
    description: string;
    status: string;
    progress: number;
    goal: string;
    raised: string;
    daysLeft: string;
    tierInfo?: TTierInfo;
    campaigns?: string[];
    onViewDetails?: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ title, description, status, progress, goal, raised, daysLeft, tierInfo, campaigns = ["W", "N", "F", "G"], onViewDetails }) => {
    const nextTierProfitText = tierInfo?.nextTier?.percentage ? `${tierInfo.nextTier.percentage}%` : null;
    const untilBonusText = tierInfo?.nextTier
        ? `${tierInfo.packagesNeededForNextTier || 0} package${(tierInfo.packagesNeededForNextTier || 0) !== 1 ? "s" : ""} until ${tierInfo.nextTier.percentage}% profit bonus`
        : null;

    const currentMin = tierInfo?.currentTier?.minSalesVolume ?? 0;
    const nextMin = tierInfo?.nextTier?.minSalesVolume;
    let tierProgress: number | null = null;
    if (nextMin && nextMin > currentMin) {
        const pkgsNeeded = tierInfo?.packagesNeededForNextTier ?? 0;
        const currentPkgs = Math.max(0, nextMin - pkgsNeeded);
        tierProgress = Math.min(100, Math.round(((currentPkgs - currentMin) / (nextMin - currentMin)) * 100));
    }

    const getStatusBadgeStyle = (statusStr: string) => {
        const s = (statusStr || "").toUpperCase();
        switch (s) {
            case "ACTIVE":
                return {
                    label: "ACTIVE",
                    bg: "bg-green-100 text-green-800",
                    dot: "bg-green-500",
                };
            case "FULFILMENT":
                return {
                    label: "FULFILMENT",
                    bg: "bg-blue-100 text-blue-800",
                    dot: "bg-blue-500",
                };
            case "COMPLETED":
                return {
                    label: "COMPLETED",
                    bg: "bg-[#FFDEA8] text-amber-900",
                    dot: "bg-amber-600",
                };
            case "DRAFT":
                return {
                    label: "DRAFT",
                    bg: "bg-gray-100 text-gray-800",
                    dot: "bg-gray-500",
                };
            default:
                return {
                    label: statusStr || "INACTIVE",
                    bg: "bg-red-100 text-red-800",
                    dot: "bg-red-500",
                };
        }
    };

    const statusStyle = getStatusBadgeStyle(status);

    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 relative overflow-hidden group flex flex-col justify-between h-full">
            <div className="relative z-10">
                <div className="mb-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`}></span>
                        {statusStyle.label}
                    </span>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{title}</h3>
                    <p className="text-[#78716C] text-sm mt-1 group-hover:text-[#271900] transition-colors duration-300">{description}</p>
                </div>

                <div className="bg-[#F3F3F3] py-4 px-6 rounded-[24px] mb-4">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">Progress</span>
                            <span className="text-[#D97706] font-bold">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
                            <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 ">
                        <div>
                            <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">PROFIT</div>
                            <div className="text-[#D97706] font-bold text-lg">{raised}</div>
                        </div>
                        <div>
                            <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300 text-right">TARGET</div>
                            <div className="text-[#1A1C1C] font-bold text-lg group-hover:text-[#271900] transition-colors duration-300 text-right">{goal}</div>
                        </div>
                    </div>
                </div>

                {tierInfo?.nextTier && (
                    <div className="mb-4 space-y-1.5">
                        {nextTierProfitText && (
                            <div className="flex items-center justify-between">
                                <span className="text-[#78716C] text-xs font-semibold group-hover:text-[#271900] transition-colors duration-300 uppercase tracking-wider">NEXT TIER PROFIT</span>
                                <span className="text-[#D97706] font-bold text-sm">{nextTierProfitText}</span>
                            </div>
                        )}
                        {tierProgress !== null && (
                            <div className="w-full h-1.5 bg-[#E7E5E4] rounded-full overflow-hidden">
                                <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${tierProgress}%` }} />
                            </div>
                        )}
                        {untilBonusText && (
                            <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">{untilBonusText}</div>
                        )}
                    </div>
                )}
            </div>

            <div className="relative z-10 mt-auto pt-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">{daysLeft}</div>
                    <div className="flex items-center relative group/campaigns">
                        {campaigns.slice(0, 2).map((camp, idx) => (
                            <span key={idx} className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm border-2 border-white ${campaignColors[idx % campaignColors.length]} ${idx > 0 ? "-ml-2" : ""}`}>
                                {camp}
                            </span>
                        ))}
                        {campaigns.length > 2 && <span className={`w-8 h-8 rounded-full bg-[#78716C] text-white flex items-center justify-center font-bold text-xs border-2 border-white ${campaigns.length > 2 ? "-ml-2" : ""}`}>+{campaigns.length - 2}</span>}
                        {campaigns.length > 2 && (
                            <div className="absolute bottom-full right-0 mb-2 hidden group-hover/campaigns:flex flex-wrap gap-1 bg-white p-2 rounded-lg shadow-lg border border-[#F5F5F4] z-50">
                                {campaigns.map((camp, idx) => (
                                    <span key={idx} className={`w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs ${campaignColors[idx % campaignColors.length]}`}>
                                        {camp}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onViewDetails}
                    className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 cursor-pointer"
                >
                    View Campaign
                </button>
            </div>
        </div>
    );
};

export default CampaignCard;
