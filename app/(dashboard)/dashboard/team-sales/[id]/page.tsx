"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetGroupByIdQuery } from "@/redux/features/group/groupApi";
import { ArrowLeft, Users, Calendar, Award } from "lucide-react";
import Invitations from "@/components/dashboard/SellerAdmin/team-sales/GroupView/Invitations";
import GroupMembers from "@/components/dashboard/SellerAdmin/team-sales/GroupView/GroupMembers";
import Campaign from "@/components/dashboard/SellerAdmin/team-sales/GroupView/Campaign";

const Page = () => {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { data: groupData, isLoading } = useGetGroupByIdQuery(id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D97706]" />
            </div>
        );
    }

    const group = groupData?.data;

    return (
        <div className="space-y-6">
            <button onClick={() => router.push("/dashboard/team-sales")} className="inline-flex items-center gap-2 text-sm text-[#78716C] hover:text-[#1A1C1C] transition-colors cursor-pointer font-medium mb-2">
                <ArrowLeft size={16} />
                <span>Back to Groups</span>
            </button>

            {group && (
                <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)]">
                    <div className="mb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <span className="inline-block text-[11px] sm:text-xs font-semibold text-[#D97706] uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">Class / Team Group</span>
                            <h1 className="text-xl sm:text-2xl font-bold text-[#1A1C1C] mt-2 mb-1 truncate">{group.name}</h1>
                            <p className="text-[#78716C] text-xs sm:text-sm line-clamp-2">{group.shortDescription}</p>
                        </div>
                        <div className="text-xs text-[#78716C] font-semibold flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shrink-0 self-start">
                            <Calendar size={14} className="text-[#D97706]" />
                            <span>Created: {group.createdAt ? new Date(group.createdAt).toLocaleDateString() : "N/A"}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-[#F5F5F4]">
                        <div className="flex items-center gap-2.5 bg-stone-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none">
                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706] shrink-0">
                                <Users size={16} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[10px] text-[#78716C] font-semibold uppercase leading-none mb-1">Total Sellers</div>
                                <div className="text-sm font-bold text-[#1A1C1C] truncate">{group.sellerCount ?? 0}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 bg-stone-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none">
                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706] shrink-0">
                                <Award size={16} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[10px] text-[#78716C] font-semibold uppercase leading-none mb-1">Active Campaigns</div>
                                <div className="text-sm font-bold text-[#1A1C1C] truncate">
                                    {group.activeCampaigns ?? 0}/{group.totalCampaigns ?? 0}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 bg-stone-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none">
                            <div className="p-2 bg-amber-50 rounded-lg text-[#D97706] shrink-0">
                                <Calendar size={16} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[10px] text-[#78716C] font-semibold uppercase leading-none mb-1">Pending Invitations</div>
                                <div className="text-sm font-bold text-[#1A1C1C] truncate">{group.invitationCount ?? 0}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GroupMembers groupId={id} />
                <Invitations groupId={id} />
            </div>

            <Campaign groupId={id} />
        </div>
    );
};

export default Page;
