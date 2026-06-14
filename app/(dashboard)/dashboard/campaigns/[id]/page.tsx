"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetCampaignByIdQuery } from "@/redux/features/campaign/campaignApi";
import CardDetails from "@/components/dashboard/SuperAdmin/Campaigns/CardDetails/CardDetails";
import { Loader2 } from "lucide-react";

export default function CampaignDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: response, isLoading, error } = useGetCampaignByIdQuery(id, {
        skip: !id,
    });

    const campaign = response?.data;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#D97706]" />
                <p className="text-[#78716C] text-sm font-medium">Loading campaign details...</p>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <p className="text-red-500 font-bold">Failed to load campaign</p>
                <p className="text-sm text-[#78716C]">The campaign could not be found or you do not have permission to view it.</p>
            </div>
        );
    }

    return <CardDetails campaign={campaign} />;
}
