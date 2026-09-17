"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetCampaignByIdQuery } from "@/redux/features/campaign/campaignApi";
import CardDetails from "@/components/dashboard/SuperAdmin/Campaigns/CardDetails/CardDetails";
import { Loader2 } from "lucide-react";

export default function GroupCampaignDetailPage() {
    const params = useParams();
    const campaignId = params.campaignId as string;

    const {
        data: response,
        isLoading,
        error,
    } = useGetCampaignByIdQuery(campaignId, {
        skip: !campaignId,
    });

    const campaign = response?.data;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#D97706]" />
                <p className="text-[#78716C] text-sm font-medium">Laddar kampanjdetaljer...</p>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 gap-3">
                <p className="text-red-500 font-bold">Misslyckades med att ladda kampanj</p>
                <p className="text-sm text-[#78716C]">Kampanjen kunde inte hittas eller så har du inte behörighet att visa den.</p>
            </div>
        );
    }

    return <CardDetails campaign={campaign} />;
}
