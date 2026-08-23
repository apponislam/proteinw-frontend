"use client";

import React, { useState } from "react";
import StoreProducts from "./StoreProducts";
import CampaignList from "../Home/CamPaignList";

const StorefrontView = () => {
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-xs sm:text-sm text-[#7C5800] mb-2 sm:mb-3 uppercase font-medium">STOREFRONT</h1>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1C1C] mb-2 sm:mb-3">Your Shop Collection</h2>
                    <p className="text-[#78716C] text-sm sm:text-lg">Browse all products available for your campaign.</p>
                </div>
                <CampaignList
                    selectedCampaignId={selectedCampaignId}
                    onSelectCampaign={(campaign) => {
                        setSelectedCampaignId(campaign?._id || "");
                    }}
                />
            </div>
            <StoreProducts campaignId={selectedCampaignId} />
        </div>
    );
};

export default StorefrontView;
