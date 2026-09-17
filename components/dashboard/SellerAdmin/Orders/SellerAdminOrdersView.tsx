"use client";

import React, { useState } from "react";
import AdminOrdersCard from "./AdminOrdersCard";
import AdminOrdersTable from "./AdminOrdersTable";
import CampaignListOrdersPage from "./CampaignListOrdersPage";

const SellerAdminOrdersView = () => {
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

    return (
        <div>
            <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4 flex-col md:flex-row">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1C1C]">Kampanjorderhantering</h1>
                    <p className="text-[#78716C] text-xs sm:text-sm mt-1 sm:mt-2 max-w-2xl">Övervaka och hantera alla kampanjbeställningar för din grupp.</p>
                </div>
                <CampaignListOrdersPage
                    selectedCampaignId={selectedCampaignId}
                    onSelectCampaign={(campaign) => {
                        setSelectedCampaignId(campaign?._id || "");
                    }}
                />
            </div>

            <AdminOrdersCard campaignId={selectedCampaignId} />
            <AdminOrdersTable campaignId={selectedCampaignId} />
        </div>
    );
};

export default SellerAdminOrdersView;
