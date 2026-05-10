import React from "react";
import CampaignCard from "./CampaignCard";

const campaigns = [
    {
        title: "Eco-Park Reforestation",
        description: "Planting 10,000 trees in Gothenburg",
        status: "ACTIVE",
        progress: 92,
        goal: "€50,000",
        raised: "€46,000",
        daysLeft: "Deadline: In 3 days",
    },
    {
        title: "Malmö Green Initiative",
        description: "Urban gardening projects across the city",
        status: "ACTIVE",
        progress: 92,
        goal: "€50,000",
        raised: "€46,000",
        daysLeft: "Deadline: In 3 days",
    },
    {
        title: "Stockholm Water Cleanup",
        description: "Restoring lake ecosystems in the region",
        status: "ACTIVE",
        progress: 85,
        goal: "€45,000",
        raised: "€38,250",
        daysLeft: "Deadline: In 7 days",
    },
    {
        title: "Gothenburg Youth Sports",
        description: "Equipment for underprivileged children",
        status: "ACTIVE",
        progress: 78,
        goal: "€35,000",
        raised: "€27,300",
        daysLeft: "Deadline: In 10 days",
    },
    {
        title: "Uppsala Library Fund",
        description: "New books for local community library",
        status: "ACTIVE",
        progress: 65,
        goal: "€30,000",
        raised: "€19,500",
        daysLeft: "Deadline: In 14 days",
    },
    {
        title: "Lund Science Lab",
        description: "STEM equipment for high schools",
        status: "ACTIVE",
        progress: 55,
        goal: "€40,000",
        raised: "€22,000",
        daysLeft: "Deadline: In 18 days",
    },
    {
        title: "Örebro Animal Shelter",
        description: "Food and supplies for rescue animals",
        status: "ACTIVE",
        progress: 88,
        goal: "€25,000",
        raised: "€22,000",
        daysLeft: "Deadline: In 5 days",
    },
    {
        title: "Västerås Music Program",
        description: "Instruments for school music classes",
        status: "ACTIVE",
        progress: 72,
        goal: "€28,000",
        raised: "€20,160",
        daysLeft: "Deadline: In 12 days",
    },
    {
        title: "Linköping Community Center",
        description: "Renovating the local gathering space",
        status: "ACTIVE",
        progress: 95,
        goal: "€60,000",
        raised: "€57,000",
        daysLeft: "Deadline: In 2 days",
    },
];

const AllCampaignCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
                <CampaignCard key={index} title={campaign.title} description={campaign.description} status={campaign.status} progress={campaign.progress} goal={campaign.goal} raised={campaign.raised} daysLeft={campaign.daysLeft} />
            ))}
        </div>
    );
};

export default AllCampaignCards;
