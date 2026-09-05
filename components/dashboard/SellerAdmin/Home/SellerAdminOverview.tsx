"use client";

import React, { useState } from "react";
import SellerAdminStatsSection from "./SellerAdminStatsSection";
import SellerAdminContributions from "./SellerAdminContributions";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetDashboardStatusQuery } from "@/redux/features/dashboard/dashboardApi";
import CreateGroupForm from "./CreateGroupForm";
import PendingApprovalNotice from "./PendingApprovalNotice";
import CampaignList from "./CamPaignList";

const SellerAdminOverview = () => {
    const user = useAppSelector(currentUser);
    const { data: statusData, isLoading: isStatusLoading } = useGetDashboardStatusQuery();
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

    if (isStatusLoading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D97706]" />
            </div>
        );
    }

    if (!statusData?.isApproved) {
        return <PendingApprovalNotice />;
    }

    if (!statusData?.hasGroup) {
        return <CreateGroupForm />;
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <h1 className="text-xs sm:text-sm text-[#7C5800] mb-2 sm:mb-3 font-semibold uppercase tracking-wider">COORDINATOR DASHBOARD</h1>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1A1C1C] mb-2 sm:mb-3 tracking-tight">Welcome back, {user?.name || "Erik"}!</h2>
                        <p className="text-[#78716C] text-sm sm:text-base md:text-lg">Your campaign is active and performing well.</p>
                    </div>
                    <div className="w-full md:w-auto">
                        <CampaignList
                            selectedCampaignId={selectedCampaignId}
                            onSelectCampaign={(campaign) => setSelectedCampaignId(campaign._id || "")}
                        />
                    </div>
                </div>
            </div>

            <SellerAdminStatsSection campaignId={selectedCampaignId} />
            <SellerAdminContributions />
        </div>
    );
};

export default SellerAdminOverview;
