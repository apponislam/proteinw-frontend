import CampaignsOverviewCards from "@/components/dashboard/Admin/Campaigns/CampaignsOverviewCards";
import AllCampaignCards from "@/components/dashboard/Admin/Campaigns/AllCampaignCards";
import React from "react";

const page = () => {
    return (
        <div>
            <CampaignsOverviewCards />
            <div className="mt-8">
                <AllCampaignCards />
            </div>
        </div>
    );
};

export default page;
