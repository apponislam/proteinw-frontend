"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Store, Calendar, Award, Loader2, Users } from "lucide-react";
import CampaignCard from "@/components/dashboard/SuperAdmin/Campaigns/CampaignCard";
import Pagination from "@/components/dashboard/Pagination";
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
                    <div className="mb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                            <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">Group Details</span>
                            <h1 className="text-xl sm:text-2xl font-bold text-[#1A1C1C] mt-2 mb-1">{group.name}</h1>
                            <p className="text-[#78716C] text-sm">{group.shortDescription}</p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2 shrink-0">
                            {typeof group.createdBy === "object" && group.createdBy && (
                                <div className="flex items-center gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80 w-full sm:w-auto">
                                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#7C5800] to-[#FFB800] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">
                                        {(group.createdBy.name || "A").charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left leading-tight min-w-0">
                                        <div className="text-[10px] text-[#78716C] font-semibold uppercase tracking-wider">Created By</div>
                                        <div className="text-xs font-bold text-[#1A1C1C] mt-0.5 truncate">{group.createdBy.name || "Admin"}</div>
                                        <div className="text-[11px] text-[#78716C] font-medium flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                                            {group.createdBy.phone && <span className="text-[#D97706] font-semibold">{group.createdBy.phone}</span>}
                                            {group.createdBy.email && <span className="truncate">{group.createdBy.email}</span>}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="text-xs text-[#78716C] font-semibold flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 w-fit">
                                <Calendar size={14} className="text-[#D97706]" />
                                <span>Created: {group.createdAt ? new Date(group.createdAt).toLocaleDateString() : "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-[#F5F5F4]">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706] shrink-0">
                                <Users size={18} />
                            </div>
                            <div>
                                <div className="text-[10px] text-[#78716C] font-semibold uppercase leading-none mb-1">Total Sellers</div>
                                <div className="text-sm font-bold text-[#1A1C1C]">{group.sellerCount ?? 0}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706] shrink-0">
                                <Award size={18} />
                            </div>
                            <div>
                                <div className="text-[10px] text-[#78716C] font-semibold uppercase leading-none mb-1">Active Campaigns</div>
                                <div className="text-sm font-bold text-[#1A1C1C]">{group.activeCampaigns ?? 0}/{group.totalCampaigns ?? 0}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706] shrink-0">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <div className="text-[10px] text-[#78716C] font-semibold uppercase leading-none mb-1">Pending Invitations</div>
                                <div className="text-sm font-bold text-[#1A1C1C]">{group.invitationCount ?? 0}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] text-center text-[#78716C]">Group not found.</div>
            )}

            {/* Campaigns Section fetched from /campaigns/group/:groupId */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[#1A1C1C]">Group Campaigns</h2>
                        <p className="text-sm text-[#78716C]">Campaigns belonging to this group</p>
                    </div>
                </div>

                {isCampaignsLoading ? (
                    <div className="flex items-center justify-center py-12 bg-white rounded-2xl border border-[#E7E5E4]">
                        <Loader2 className="animate-spin text-[#D97706]" size={28} />
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-10 text-center text-[#78716C]">
                        <Store size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="font-medium">No campaigns found for this group.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {campaigns.map((campaign) => (
                                <CampaignCard key={campaign._id} campaign={campaign} />
                            ))}
                        </div>

                        {/* Standard Pagination Component */}
                        <div className="mt-8">
                            <Pagination meta={meta} onPageChange={(p) => setPage(p)} itemName="CAMPAIGNS" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GroupDetailsPage;
