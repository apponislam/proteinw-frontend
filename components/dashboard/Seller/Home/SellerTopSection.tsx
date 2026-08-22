"use client";

import React, { useState } from "react";
import SellerHomeCards from "./SellerHomeCards";
import SellerFundraisingTarget from "./SellerFundraisingTarget";
import SellerShopLink from "./SellerShopLink";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetAsSellerDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import CamPaignListSeller from "./CamPaignListSeller";
import GroupCards from "./GroupCards";

const SellerTopSection = () => {
    const user = useAppSelector(currentUser);
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

    const { data: statsResponse, isLoading: isStatsLoading } = useGetAsSellerDashboardStatsQuery(selectedCampaignId || undefined);

    const statsData = statsResponse?.data;
    const hasActiveCampaign = Boolean(selectedCampaignId || statsData?.campaignCode);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-8">
                <div>
                    <h1 className="text-sm text-[#7C5800] mb-3 uppercase font-medium">COORDINATOR DASHBOARD</h1>
                    <h2 className="text-5xl text-[#1A1C1C] mb-3">Welcome back, {user?.name || "Erik"}!</h2>
                    <p className="text-[#78716C] text-lg">{hasActiveCampaign ? "Your campaign is active and performing well." : "There is no active campaign running."}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-3">
                    <SellerShopLink statsShopUrl={statsData?.shopUrl} statsCampaignCode={statsData?.campaignCode} statsReferralCode={statsData?.referralCode} />

                    <CamPaignListSeller
                        selectedCampaignId={selectedCampaignId}
                        onSelectCampaign={(campaign) => {
                            if (campaign?._id) {
                                setSelectedCampaignId(campaign._id);
                            }
                        }}
                    />
                </div>
            </div>

            {!isStatsLoading && !hasActiveCampaign ? (
                <div className="p-8 h-96 text-center bg-white rounded-xl border border-[#E7E5E4] text-[#78716C] font-medium text-lg shadow-xs flex items-center justify-center">There is no active campaign running.</div>
            ) : (
                <>
                    <SellerHomeCards data={statsData} isLoading={isStatsLoading} />
                    <SellerFundraisingTarget data={statsData} isLoading={isStatsLoading} />
                    <GroupCards />
                </>
            )}
        </div>
    );
};

export default SellerTopSection;
