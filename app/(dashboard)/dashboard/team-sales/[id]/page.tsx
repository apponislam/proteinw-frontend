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
            <div className="flex items-center justify-center min-h-[400px]">
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
                <div className="bg-white p-8 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">Class / Team Group</span>
                            <h1 className="text-4xl font-extrabold text-[#1A1C1C] mt-2 mb-3">{group.name}</h1>
                            <p className="text-[#78716C] text-lg max-w-2xl">{group.shortDescription}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#F5F5F4]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-xl text-[#D97706]">
                                <Award size={24} />
                            </div>
                            <div>
                                <div className="text-xs text-[#78716C] font-semibold uppercase">Fundraising Goal</div>
                                <div className="text-lg font-bold text-[#1A1C1C]">SEK {group.goal.toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-xl text-[#D97706]">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <div className="text-xs text-[#78716C] font-semibold uppercase">Campaign End Date</div>
                                <div className="text-lg font-bold text-[#1A1C1C]">{group.endDate ? new Date(group.endDate).toLocaleDateString() : "N/A"}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-xl text-[#D97706]">
                                <Users size={24} />
                            </div>
                            <div>
                                <div className="text-xs text-[#78716C] font-semibold uppercase">Status</div>
                                <div className="text-lg font-bold text-[#1A1C1C]">{group.isActive ? "Active" : "Inactive"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Campaign groupId={id} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GroupMembers groupId={id} />
                <Invitations groupId={id} />
            </div>
        </div>
    );
};

export default Page;
