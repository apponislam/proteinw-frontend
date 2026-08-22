import React from "react";
import { TSellerDashboardStats } from "@/redux/features/dashboard/dashboardApi";

interface SellerFundraisingTargetProps {
    data?: TSellerDashboardStats;
    isLoading?: boolean;
}

const SellerFundraisingTarget: React.FC<SellerFundraisingTargetProps> = ({ data, isLoading }) => {
    const statsData = data || {
        totalSales: 0,
        goal: 0,
        current: 0,
        remaining: 0,
        shortDescription: "",
    };

    const goal = statsData.goal || 0;
    const current = statsData.current ?? statsData.totalSales ?? 0;
    const remaining = statsData.remaining ?? Math.max(0, goal - current);
    const progressPercent = goal > 0 ? Math.min(Math.round((current / goal) * 100), 100) : 0;

    return (
        <div className="mt-4 md:mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
            <div className="relative z-10">
                <div className="mb-3 sm:mb-6 flex flex-row items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-[#78716C] text-xs sm:text-sm font-medium uppercase tracking-wider mb-1 sm:mb-2 group-hover:text-[#271900] transition-colors duration-300">Fundraising Progress</h3>
                        <p className="text-[#78716C] text-xs sm:text-base lg:text-lg group-hover:text-[#271900] transition-colors duration-300 leading-snug">
                            {isLoading ? "Loading progress details..." : `Targeting ${statsData.shortDescription || "the fundraising goal"} of ${goal.toLocaleString()} SEK`}
                        </p>
                    </div>
                    <div className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#D97706] group-hover:text-[#7C5800] transition-colors duration-300 shrink-0 whitespace-nowrap">
                        {isLoading ? "..." : `${progressPercent}%`}
                    </div>
                </div>

                <div className="w-full h-2.5 sm:h-4 bg-[#E7E5E4] rounded-full overflow-hidden mb-3 sm:mb-6">
                    <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6">
                    <div className="flex sm:block justify-between items-center bg-stone-50/70 sm:bg-transparent px-3 py-2 sm:p-0 rounded-md">
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">CURRENT</div>
                        <div className="text-base sm:text-xl lg:text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">
                            {isLoading ? "..." : `${current.toLocaleString()} SEK`}
                        </div>
                    </div>
                    <div className="flex sm:block justify-between items-center bg-stone-50/70 sm:bg-transparent px-3 py-2 sm:p-0 rounded-md">
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">GOAL</div>
                        <div className="text-base sm:text-xl lg:text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">
                            {isLoading ? "..." : `${goal.toLocaleString()} SEK`}
                        </div>
                    </div>
                    <div className="flex sm:block justify-between items-center bg-stone-50/70 sm:bg-transparent px-3 py-2 sm:p-0 rounded-md">
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">REMAINING</div>
                        <div className="text-base sm:text-xl lg:text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">
                            {isLoading ? "..." : `${remaining.toLocaleString()} SEK`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerFundraisingTarget;
