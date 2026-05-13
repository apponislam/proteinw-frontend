"use client";
import React, { useState } from "react";
import CampaignCard from "./CampaignCard";

const campaigns = [
    {
        title: "Eco-Park Reforestation",
        description: "Planting 10,000 trees in Gothenburg",
        status: "ACTIVE",
        progress: 92,
        goal: "SEK 50,000",
        raised: "SEK 46,000",
        daysLeft: "Deadline: In 3 days",
    },
    {
        title: "Malmö Green Initiative",
        description: "Urban gardening projects across the city",
        status: "ACTIVE",
        progress: 92,
        goal: "SEK 50,000",
        raised: "SEK 46,000",
        daysLeft: "Deadline: In 3 days",
    },
    {
        title: "Stockholm Water Cleanup",
        description: "Restoring lake ecosystems in the region",
        status: "ACTIVE",
        progress: 85,
        goal: "SEK 45,000",
        raised: "SEK 38,250",
        daysLeft: "Deadline: In 7 days",
    },
    {
        title: "Gothenburg Youth Sports",
        description: "Equipment for underprivileged children",
        status: "ACTIVE",
        progress: 78,
        goal: "SEK 35,000",
        raised: "SEK 27,300",
        daysLeft: "Deadline: In 10 days",
    },
    {
        title: "Uppsala Library Fund",
        description: "New books for local community library",
        status: "ACTIVE",
        progress: 65,
        goal: "SEK 30,000",
        raised: "SEK 19,500",
        daysLeft: "Deadline: In 14 days",
    },
    {
        title: "Lund Science Lab",
        description: "STEM equipment for high schools",
        status: "ACTIVE",
        progress: 55,
        goal: "SEK 40,000",
        raised: "SEK 22,000",
        daysLeft: "Deadline: In 18 days",
    },
];

const CampaignLists = () => {
    const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all");

    const filteredCampaigns = campaigns.filter((campaign) => {
        if (activeTab === "all") return true;
        if (activeTab === "active") return campaign.status === "ACTIVE";
        return campaign.status === "INACTIVE";
    });

    return (
        <div>
            <div className="mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#1A1C1C]">Available Campaigns</h2>
                        <p className="text-[#78716C] text-sm mt-1">Fundraising campaigns you can join</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setActiveTab("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "all" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            All
                        </button>
                        <button onClick={() => setActiveTab("active")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "active" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Active
                        </button>
                        <button onClick={() => setActiveTab("inactive")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "inactive" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            Inactive
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign, index) => (
                    <CampaignCard key={index} title={campaign.title} description={campaign.description} status={campaign.status} progress={campaign.progress} goal={campaign.goal} raised={campaign.raised} daysLeft={campaign.daysLeft} />
                ))}
            </div>
        </div>
    );
};

export default CampaignLists;
