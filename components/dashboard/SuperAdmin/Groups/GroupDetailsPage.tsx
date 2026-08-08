"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Store, Calendar, Award, Loader2, Users } from "lucide-react";
import { useGetGroupByIdQuery } from "@/redux/features/group/groupApi";
import { useGetCampaignsByGroupQuery, TCampaign } from "@/redux/features/campaign/campaignApi";

interface GroupDetailsPageProps {
    groupId: string;
}

const GroupDetailsPage = ({ groupId }: GroupDetailsPageProps) => {
    const [page, setPage] = useState(1);
    const limit = 10;

    // Fetch Group Details
    const { data: groupResponse, isLoading: isGroupLoading } = useGetGroupByIdQuery(groupId);
    const group = groupResponse?.data;

    // Fetch Campaigns by Group using router.get("/group/:groupId", auth, campaignControllers.getCampaignsByGroup)
    const { data: campaignResponse, isLoading: isCampaignsLoading } = useGetCampaignsByGroupQuery({
        groupId,
        page,
        limit,
    });

    const campaigns: TCampaign[] = campaignResponse?.data || [];
    const meta = campaignResponse?.meta;

    if (isGroupLoading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <Loader2 className="animate-spin text-[#D97706]" size={36} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Link href="/dashboard/groups" className="inline-flex items-center gap-2 text-sm text-[#78716C] hover:text-[#1A1C1C] transition-colors cursor-pointer font-medium mb-2">
                <ArrowLeft size={16} />
                <span>Back to Groups</span>
            </Link>

            {/* Group Header Info */}
            {group ? (
                <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                            <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">Group Details</span>
                            <h1 className="text-2xl font-bold text-[#1A1C1C] mt-2 mb-1">{group.name}</h1>
                            <p className="text-[#78716C] text-sm">{group.shortDescription}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase">Code:</span>
                            <span className="bg-[#D97706] text-white px-3 py-1 rounded-md text-sm font-bold">{group.code}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F5F5F4]">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706]">
                                <Award size={18} />
                            </div>
                            <div>
                                <div className="text-[10px] text-[#78716C] font-semibold uppercase leading-none mb-1">Fundraising Goal</div>
                                <div className="text-sm font-bold text-[#1A1C1C]">SEK {(group.goal || 0).toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706]">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <div className="text-[10px] text-[#78716C] font-semibold uppercase leading-none mb-1">End Date</div>
                                <div className="text-sm font-bold text-[#1A1C1C]">{group.endDate ? new Date(group.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706]">
                                <Users size={18} />
                            </div>
                            <div>
                                <div className="text-[10px] text-[#78716C] font-semibold uppercase leading-none mb-1">Status</div>
                                <div className="text-sm font-bold text-[#1A1C1C]">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${group.isActive ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{group.isActive ? "ACTIVE" : "INACTIVE"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] text-center text-[#78716C]">Group not found.</div>
            )}

            {/* Campaigns Section fetched from /campaigns/group/:groupId */}
            <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-[#1A1C1C]">Group Campaigns</h2>
                        <p className="text-sm text-[#78716C]">Campaigns belonging to this group</p>
                    </div>
                </div>

                {isCampaignsLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="animate-spin text-[#D97706]" size={28} />
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="text-center py-10 text-[#78716C]">
                        <Store size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="font-medium">No campaigns found for this group.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {campaigns.map((campaign) => {
                            const formattedEndDate = campaign.endDate ? new Date(campaign.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";

                            return (
                                <div key={campaign._id} className="p-5 border border-[#E7E5E4] rounded-xl hover:border-[#D97706] transition-colors duration-200 bg-[#FAFAF9]">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl shrink-0 ${campaign.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                                <Store size={20} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-bold text-[#1A1C1C]">{campaign.name}</h3>
                                                    <span className="text-xs font-semibold text-[#D97706] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">#{campaign.code}</span>
                                                </div>
                                                <p className="text-sm text-[#78716C] mt-0.5">{campaign.shortDescription}</p>
                                            </div>
                                        </div>

                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${campaign.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{campaign.isActive ? "Active" : "Expired / Inactive"}</span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#E7E5E4]">
                                        <div className="flex items-center gap-2">
                                            <Award size={16} className="text-[#D97706]" />
                                            <span className="text-xs text-[#78716C]">Target:</span>
                                            <span className="text-sm font-semibold text-[#1A1C1C]">SEK {(campaign.target || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-[#D97706]" />
                                            <span className="text-xs text-[#78716C]">End Date:</span>
                                            <span className="text-sm font-semibold text-[#1A1C1C]">{formattedEndDate}</span>
                                        </div>
                                        {campaign.totalPackagesSold !== undefined && (
                                            <div className="flex items-center gap-2">
                                                <Store size={16} className="text-[#D97706]" />
                                                <span className="text-xs text-[#78716C]">Sold Packages:</span>
                                                <span className="text-sm font-semibold text-[#1A1C1C]">{campaign.totalPackagesSold}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {meta && meta.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F5F5F4]">
                        <div className="text-[#78716C] text-sm uppercase">
                            SHOWING {(page - 1) * meta.limit + 1} TO {Math.min(page * meta.limit, meta.total)} OF {meta.total} CAMPAIGNS
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={!meta.hasPrev || isCampaignsLoading}
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                className="px-3 h-10 rounded-lg flex items-center justify-center text-sm font-medium border border-[#E7E5E4] hover:bg-[#F5F5F4] disabled:opacity-50 transition-all text-[#78716C] cursor-pointer disabled:cursor-not-allowed"
                            >
                                Prev
                            </button>

                            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                                <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all cursor-pointer ${p === page ? "bg-[#D97706] text-white font-bold" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                                    {p}
                                </button>
                            ))}

                            <button
                                disabled={!meta.hasNext || isCampaignsLoading}
                                onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
                                className="px-3 h-10 rounded-lg flex items-center justify-center text-sm font-medium border border-[#E7E5E4] hover:bg-[#F5F5F4] disabled:opacity-50 transition-all text-[#78716C] cursor-pointer disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupDetailsPage;
