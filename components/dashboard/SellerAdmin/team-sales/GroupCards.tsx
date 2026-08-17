"use client";

import React, { useState } from "react";
import GroupCard from "./GroupCard";
import CreateGroupModal from "./CreateGroupModal";
import { useGetMyGroupsQuery, TMyGroupSummary } from "@/redux/features/group/groupApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { Plus } from "lucide-react";
import Pagination from "@/components/dashboard/Pagination";

const GroupCards = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);

    const user = useAppSelector(currentUser);
    const isSuperAdmin = user?.role === "SUPER_ADMIN";

    const { data: myGroupsData, isLoading } = useGetMyGroupsQuery(
        { page, limit: 9 },
        { skip: isSuperAdmin }
    );

    const groups: TMyGroupSummary[] = myGroupsData?.data || [];
    const meta = myGroupsData?.meta;

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#78716C] text-sm">Loading your groups information...</p>
            </div>
        );
    }

    return (
        <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.length > 0 ? (
                    groups.map((group) => (
                        <GroupCard key={group._id} group={group} />
                    ))
                ) : (
                    <div className="col-span-full bg-white p-8 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] text-center text-[#78716C]">You don't have any groups yet. Click below to start a new group!</div>
                )}

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group flex flex-col justify-center items-center text-center min-h-62.5 cursor-pointer border border-[#E7E5E4]"
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-amber-50 group-hover:bg-white text-[#D97706] flex items-center justify-center mb-3 transition-colors duration-300 shadow-xs">
                            <Plus size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300 mb-1">Start New Group</h3>
                        <p className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">Add your next class or team</p>
                    </div>
                </button>
            </div>

            {meta && (
                <div className="mt-8">
                    <Pagination meta={meta} onPageChange={setPage} itemName="GROUPS" />
                </div>
            )}

            <CreateGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default GroupCards;
