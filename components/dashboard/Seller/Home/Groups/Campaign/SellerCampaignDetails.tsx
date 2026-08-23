"use client";

import React from "react";
import { TCampaign } from "@/redux/features/campaign/campaignApi";
import { ArrowLeft, User, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import CampaignMetricsGrid from "./CampaignMetricsGrid";
import CampaignOrdersList from "@/components/dashboard/SuperAdmin/Campaigns/CardDetails/CampaignOrdersList";

interface SellerCampaignDetailsProps {
    campaign: TCampaign;
}

const statusOptions: { value: "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED"; label: string; bg: string; text: string; dot: string }[] = [
    { value: "DRAFT", label: "DRAFT", bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
    { value: "ACTIVE", label: "ACTIVE", bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    { value: "FULFILMENT", label: "FULFILMENT", bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
    { value: "COMPLETED", label: "COMPLETED", bg: "bg-[#FFDEA8]", text: "text-amber-900", dot: "bg-amber-600" },
];

const SellerCampaignDetails: React.FC<SellerCampaignDetailsProps> = ({ campaign }) => {
    const router = useRouter();

    const campaignId = campaign._id || "";
    const admin = campaign.campaignAdmin;

    const currentStatusStr = campaign.status || "DRAFT";
    const currentOption = statusOptions.find((opt) => opt.value === currentStatusStr) || statusOptions[0];

    return (
        <div className="space-y-8">
            {/* Top Navigation */}
            <div className="flex items-center justify-between">
                <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm text-[#78716C] hover:text-[#1A1C1C] transition-colors cursor-pointer font-medium">
                    <ArrowLeft size={16} />
                    <span>Back to Campaigns</span>
                </button>

                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-stone-200 ${currentOption.bg} ${currentOption.text}`}>
                    <span className={`w-2 h-2 rounded-full ${currentOption.dot}`}></span>
                    <span>{currentOption.label}</span>
                </div>
            </div>

            {/* Title / Description Area */}
            <div>
                <h1 className="text-2xl font-bold text-[#1A1C1C] tracking-tight">{campaign.name}</h1>
                <p className="text-sm text-[#78716C] mt-1.5 leading-relaxed">{campaign.shortDescription}</p>
            </div>

            {/* Quick Metrics Grid (includes 4th Leader Contact Card) */}
            <CampaignMetricsGrid campaign={campaign} />

            {/* Campaign Orders Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#1A1C1C] uppercase tracking-wider">Campaign Orders</h3>
                <div className="bg-white rounded-xl border border-[#E7E5E4] shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">
                    <CampaignOrdersList campaignId={campaignId} />
                </div>
            </div>
        </div>
    );
};

export default SellerCampaignDetails;
