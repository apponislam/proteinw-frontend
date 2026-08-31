"use client";

import React from "react";
import { TCampaign } from "@/redux/features/campaign/campaignApi";
import { TSellerCampaignInfo } from "@/redux/features/dashboard/dashboardApi";
import { ArrowLeft, User, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import CampaignMetricsGrid from "./CampaignMetricsGrid";
import SellerCampaignOrdersList from "./SellerCampaignOrdersList";

interface SellerCampaignDetailsProps {
    campaign?: TCampaign;
    campaignInfo?: TSellerCampaignInfo;
}

const statusOptions: { value: "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED"; label: string; bg: string; text: string; dot: string }[] = [
    { value: "DRAFT", label: "DRAFT", bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
    { value: "ACTIVE", label: "ACTIVE", bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    { value: "FULFILMENT", label: "FULFILMENT", bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
    { value: "COMPLETED", label: "COMPLETED", bg: "bg-[#FFDEA8]", text: "text-amber-900", dot: "bg-amber-600" },
];

const SellerCampaignDetails: React.FC<SellerCampaignDetailsProps> = ({ campaign, campaignInfo }) => {
    const router = useRouter();

    const campaignId = campaignInfo?._id || campaign?._id || "";
    const name = campaignInfo?.name || campaign?.name || "Campaign Details";
    const shortDescription = campaignInfo?.shortDescription || campaign?.shortDescription || "";
    const admin = campaignInfo?.campaignAdmin || campaign?.campaignAdmin;

    const currentStatusStr = campaignInfo?.status || campaign?.status || "DRAFT";
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

            {/* Title & Leader Contact Header */}
            <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1C1C] tracking-tight">{name}</h1>
                    <p className="text-sm text-[#78716C] mt-1.5 leading-relaxed max-w-xl">{shortDescription}</p>
                </div>

                {/* Leader Contact Card */}
                <div className="bg-[#FDFBF7] p-3.5 sm:p-4 rounded-xl border border-amber-100/80 w-full md:w-auto md:min-w-72 shrink-0">
                    <div className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider mb-2">Leader Contact</div>
                    {admin ? (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-100/60 border border-amber-200 text-[#D97706] flex items-center justify-center font-bold text-sm shrink-0">
                                    <User size={18} />
                                </div>
                                <h4 className="font-bold text-sm text-[#1A1C1C] sm:hidden truncate">{admin.name || "N/A"}</h4>
                            </div>
                            <div className="min-w-0 flex-1 space-y-1">
                                <h4 className="font-bold text-sm text-[#1A1C1C] hidden sm:block truncate">{admin.name || "N/A"}</h4>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#78716C]">
                                    {admin.email && (
                                        <a href={`mailto:${admin.email}`} className="flex items-center gap-1 hover:text-[#D97706] transition-colors max-w-full truncate">
                                            <Mail size={12} className="text-[#D97706] shrink-0" />
                                            <span className="truncate">{admin.email}</span>
                                        </a>
                                    )}
                                    {admin.phone && (
                                        <a href={`tel:${admin.phone}`} className="flex items-center gap-1 hover:text-[#D97706] transition-colors shrink-0">
                                            <Phone size={12} className="text-[#D97706] shrink-0" />
                                            <span>{admin.phone}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-xs text-[#78716C] italic">No leader assigned.</div>
                    )}
                </div>
            </div>

            {/* Quick Metrics Grid */}
            <CampaignMetricsGrid campaign={campaign} campaignInfo={campaignInfo} />

            {/* Campaign Orders Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#1A1C1C] uppercase tracking-wider">Campaign Orders</h3>
                <div className="bg-white rounded-xl border border-[#E7E5E4] shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">
                    <SellerCampaignOrdersList campaignId={campaignId} />
                </div>
            </div>
        </div>
    );
};

export default SellerCampaignDetails;
