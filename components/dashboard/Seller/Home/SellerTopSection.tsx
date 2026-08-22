"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import SellerHomeCards from "./SellerHomeCards";
import SellerFundraisingTarget from "./SellerFundraisingTarget";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetReferralAndCampaignQuery } from "@/redux/features/auth/authApi";
import CamPaignListSeller from "./CamPaignListSeller";

const SellerTopSection = () => {
    const user = useAppSelector(currentUser);
    const { data: referralData } = useGetReferralAndCampaignQuery();
    const [copied, setCopied] = useState(false);

    const referralCode = referralData?.data?.referralCode || user?.referralCode || "";
    const campaignCode = referralData?.data?.campaignCode;
    const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "";

    const hasCampaign = campaignCode !== undefined && campaignCode !== null && campaignCode !== false && campaignCode !== "";

    const shopUrl = referralCode ? (hasCampaign ? `${clientUrl}/store?campaign=${campaignCode}&referral=${referralCode}` : "You are not in any campaign") : "Loading link...";

    const copyToClipboard = () => {
        if (!referralCode || !hasCampaign) return;
        navigator.clipboard.writeText(shopUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-8">
                <div>
                    <h1 className="text-sm text-[#7C5800] mb-3 uppercase font-medium">COORDINATOR DASHBOARD</h1>
                    <h2 className="text-5xl text-[#1A1C1C] mb-3">Welcome back, {user?.name || "Erik"}!</h2>
                    <p className="text-[#78716C] text-lg">Your campaign is active and performing well.</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-3">
                    <button
                        onClick={copyToClipboard}
                        disabled={!referralCode || !hasCampaign}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E7E5E4] text-[#D97706] text-sm font-medium hover:bg-[#F5F5F4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs bg-white"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        <span className="max-w-50 sm:max-w-xs truncate">{copied ? "Copied!" : shopUrl}</span>
                    </button>

                    <CamPaignListSeller />
                </div>
            </div>
            <SellerHomeCards />
            <SellerFundraisingTarget />
        </div>
    );
};

export default SellerTopSection;
