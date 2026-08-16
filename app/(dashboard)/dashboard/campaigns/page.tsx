import CampaignsOverviewCards from "@/components/dashboard/SuperAdmin/Campaigns/CampaignsOverviewCards";
import AllCampaignCards from "@/components/dashboard/SuperAdmin/Campaigns/AllCampaignCards";
import React, { Suspense } from "react";

const page = () => {
    return (
        <div>
            <CampaignsOverviewCards />
            <div className="mt-8">
                <Suspense fallback={<div className="py-12 text-center text-stone-500">Loading campaigns...</div>}>
                    <AllCampaignCards />
                </Suspense>
            </div>
        </div>
    );
};

export default page;
