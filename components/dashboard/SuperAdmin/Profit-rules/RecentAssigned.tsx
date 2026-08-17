"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGetAllCampaignsSummaryQuery } from "@/redux/features/campaign/campaignApi";
import { useGetTotalDistributedProfitQuery } from "@/redux/features/dashboard/dashboardApi";
import Pagination from "../../Pagination";
import AssignGroupModal from "./AssignGroupModal";

const RecentAssigned: React.FC = () => {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: summaryResponse, isLoading } = useGetAllCampaignsSummaryQuery({ page, limit: 5 });
    const { data: profitResponse, isLoading: isProfitLoading } = useGetTotalDistributedProfitQuery();

    const recentCampaigns = summaryResponse?.data || [];
    const meta = summaryResponse?.meta;
    const totalProfit = profitResponse?.data?.totalDistributedProfit ?? 0;

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Recent Assignments</h2>
                            <p className="text-[#78716C] text-sm mt-1">Latest groups mapped to pricing tiers</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all cursor-pointer"
                        >
                            Assign New Group
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-8 text-stone-500 text-sm">Loading summary...</div>
                    ) : recentCampaigns.length === 0 ? (
                        <div className="text-center py-8 text-stone-500 text-sm">No campaign summaries found.</div>
                    ) : (
                        <div className="space-y-4">
                            {recentCampaigns.map((item: any, index: number) => {
                                const groupName = item.groupId?.name || item.name || "Group";
                                const memberCount = item.membersCount ?? item.groupId?.membersCount ?? item.groupId?.members?.length ?? 0;

                                const tierObj = item.tier || item.tierId;
                                const percentageNum = tierObj?.percentage ?? item.tierPercentage ?? item.percentage;
                                const tierName = percentageNum !== undefined && percentageNum !== null
                                    ? `${percentageNum}% Tier`
                                    : tierObj?.name ? tierObj.name : "Unassigned Tier";

                                const dateToUse = item.tierAssignDate || item.updatedAt || item.createdAt;
                                const assignedDate = dateToUse
                                    ? `Assigned ${new Date(dateToUse).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                                    : "Recently Assigned";

                                return (
                                    <div key={item._id || index} className="flex items-center justify-between p-4 border border-[#F5F5F4] rounded-lg hover:border-[#D97706] hover:bg-[#FFF7ED] transition-all duration-300">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[#D97706] text-white flex items-center justify-center font-bold text-lg">{groupName.charAt(0)}</div>
                                            <div>
                                                <div className="font-bold text-[#1A1C1C]">{groupName}</div>
                                                <div className="text-[#78716C] text-sm">
                                                    {memberCount} Members
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-[#D97706]">{tierName}</div>
                                            <div className="text-[#78716C] text-sm">{assignedDate}</div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="mt-4">
                                <Pagination meta={meta} onPageChange={setPage} itemName="CAMPAIGNS" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-[#F59E0B1A] rounded-[32px] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] p-6 flex items-center justify-center relative overflow-hidden">
                    <Image src="/dashboard/superadmin/overlayrighttop.png" alt="" width={117} height={129} className="absolute right-0 top-0 opacity-50" />
                    <Image src="/dashboard/superadmin/overleyleftbottom.png" alt="" width={117} height={129} className="absolute left-0 bottom-0 opacity-50" />
                    <div className="relative z-10 text-center">
                        <div className="text-[#F59E0B] text-center text-sm mb-2">Total Distributed Profit</div>
                        <div className="text-4xl text-center font-bold text-[#FBBF24]">
                            {isProfitLoading ? "Loading..." : `SEK ${totalProfit.toLocaleString()}`}
                        </div>
                    </div>
                </div>
            </div>

            {/* Standalone Modal Component */}
            <AssignGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default RecentAssigned;
