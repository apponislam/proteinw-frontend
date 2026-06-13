"use client";

import React from "react";
import SellerAdminHomeCards from "./SellerAdminHomeCards";
import SellerAdminFundraisingTarget from "./SellerAdminFundraisingTarget";
import SellerAdminContributions from "./SellerAdminContributions";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetDashboardStatusQuery } from "@/redux/features/dashboard/dashboardApi";
import CreateGroupForm from "./CreateGroupForm";

const SellerAdminOverview = () => {
    const user = useAppSelector(currentUser);
    const { data: statusData, isLoading: isStatusLoading } = useGetDashboardStatusQuery();

    if (isStatusLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D97706]" />
            </div>
        );
    }

    if (!statusData?.hasGroup) {
        return <CreateGroupForm />;
    }

    return (
        <div>
            <div>
                <h1 className="text-sm text-[#7C5800] mb-3">COORDINATOR DASHBOARD</h1>
                <h2 className="text-5xl text-[#1A1C1C] mb-3">Welcome back, {user?.name || "Erik"}!</h2>
                <p className="text-[#78716C] text-lg">Your campaign is active and performing well.</p>
            </div>
            <SellerAdminHomeCards />
            <SellerAdminFundraisingTarget />
            <SellerAdminContributions />
        </div>
    );
};

export default SellerAdminOverview;
