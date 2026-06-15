import React from "react";
import { useGetSellerDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";

const SellerAdminFundraisingTarget = () => {
    const { data: response, isLoading } = useGetSellerDashboardStatsQuery();

    const statsData = response?.data || {
        totalSales: 0,
        goal: 0,
        shortDescription: "",
    };

    const totalSales = statsData.totalSales;
    const goal = statsData.goal;
    const remaining = Math.max(0, goal - totalSales);
    const progressPercent = goal > 0 ? Math.min(Math.round((totalSales / goal) * 100), 100) : 0;

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
            <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-[#78716C] text-sm font-medium uppercase tracking-wider mb-2 group-hover:text-[#271900] transition-colors duration-300">Fundraising Progress</h3>
                        <p className="text-[#78716C] text-lg group-hover:text-[#271900] transition-colors duration-300">
                            {isLoading ? "Loading progress details..." : `Targeting ${statsData.shortDescription || "the fundraising goal"} of ${goal.toLocaleString()} SEK`}
                        </p>
                    </div>
                    <div className="text-6xl font-bold text-[#D97706] mb-2 group-hover:text-[#7C5800] transition-colors duration-300">
                        {isLoading ? "..." : `${progressPercent}%`}
                    </div>
                </div>

                <div className="w-full h-4 bg-[#E7E5E4] rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <div className="text-[#78716C] text-xs uppercase tracking-wider mb-1 group-hover:text-[#271900] transition-colors duration-300">CURRENT</div>
                        <div className="text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">
                            {isLoading ? "..." : `${totalSales.toLocaleString()} SEK`}
                        </div>
                    </div>
                    <div>
                        <div className="text-[#78716C] text-xs uppercase tracking-wider mb-1 group-hover:text-[#271900] transition-colors duration-300">GOAL</div>
                        <div className="text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">
                            {isLoading ? "..." : `${goal.toLocaleString()} SEK`}
                        </div>
                    </div>
                    <div>
                        <div className="text-[#78716C] text-xs uppercase tracking-wider mb-1 group-hover:text-[#271900] transition-colors duration-300">REMAINING</div>
                        <div className="text-2xl font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">
                            {isLoading ? "..." : `${remaining.toLocaleString()} SEK`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAdminFundraisingTarget;
