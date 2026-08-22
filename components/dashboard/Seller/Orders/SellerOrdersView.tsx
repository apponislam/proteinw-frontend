"use client";

import React, { useState } from "react";
import SellerOrdersCard from "./SellerOrdersCard";
import SellerOrdersTable from "./SellerOrdersTable";
import SellerEmptyOrders from "./SellerEmptyOrders";
import { useGetOrdersByMemberQuery } from "@/redux/features/order/orderApi";
import CampaignListOrderPage from "./CampaignListOrderPage";

const SellerOrdersView = () => {
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

    const { data: sellerOrdersData, isLoading } = useGetOrdersByMemberQuery({
        page: 1,
        limit: 10,
        campaignId: selectedCampaignId || undefined,
    });

    const ordersList = sellerOrdersData?.data || [];
    const hasOrders = !isLoading && ordersList.length > 0;

    return (
        <div>
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#78716C] text-sm">Loading your orders...</p>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4 md:mb-8 gap-4 flex-col md:flex-row">
                        <div>
                            <h1 className="text-3xl font-bold text-[#1A1C1C]">My Sales Orders</h1>
                            <p className="text-[#78716C] mt-2 max-w-2xl">View and track all customer orders placed through your personal fundraising sales link.</p>
                        </div>

                        <CampaignListOrderPage
                            selectedCampaignId={selectedCampaignId}
                            onSelectCampaign={(campaign) => {
                                setSelectedCampaignId(campaign?._id || "");
                            }}
                        />
                    </div>

                    {!hasOrders ? (
                        <SellerEmptyOrders campaignId={selectedCampaignId} />
                    ) : (
                        <>
                            <SellerOrdersCard campaignId={selectedCampaignId} />
                            <SellerOrdersTable campaignId={selectedCampaignId} />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default SellerOrdersView;
