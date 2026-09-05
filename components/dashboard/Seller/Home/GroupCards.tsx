"use client";

import React from "react";
import GroupCard from "./GroupCard";
import { useGetMyJoinedGroupsQuery } from "@/redux/features/sellerGroup/sellerGroupApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

const GroupCards = () => {
    const user = useAppSelector(currentUser);
    const isSuperAdminOrAdmin = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

    const { data: myJoinedGroupsData, isLoading } = useGetMyJoinedGroupsQuery(undefined, {
        skip: isSuperAdminOrAdmin,
    });

    if (isSuperAdminOrAdmin) {
        return null;
    }

    console.log(myJoinedGroupsData);

    const groups = myJoinedGroupsData?.data || [];

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#78716C] text-sm">Loading group info...</p>
            </div>
        );
    }

    if (!groups || groups.length === 0) {
        return <div className="mt-8 bg-white p-8 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] text-center text-[#78716C]">You are not currently assigned to any fundraising group.</div>;
    }

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group: any) => (
                <GroupCard key={group._id} group={group} />
            ))}
        </div>
    );
};

export default GroupCards;
