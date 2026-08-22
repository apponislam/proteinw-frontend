"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetReferralAndCampaignQuery } from "@/redux/features/auth/authApi";

interface SellerShopLinkProps {
    statsShopUrl?: string;
    statsCampaignCode?: string;
    statsReferralCode?: string;
}

const SellerShopLink: React.FC<SellerShopLinkProps> = ({
    statsShopUrl,
    statsCampaignCode,
    statsReferralCode,
}) => {
    const user = useAppSelector(currentUser);
    const { data: referralData } = useGetReferralAndCampaignQuery();
    const [copied, setCopied] = useState(false);

    const referralCode = statsReferralCode || referralData?.data?.referralCode || user?.referralCode || "";
    const campaignCode = statsCampaignCode || referralData?.data?.campaignCode;
    const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "";

    const hasCampaign = Boolean(campaignCode);

    const shopUrl =
        statsShopUrl ||
        (referralCode
            ? hasCampaign
                ? `${clientUrl}/store?campaign=${campaignCode}&referral=${referralCode}`
                : "You are not in any campaign"
            : "Loading link...");

    const isLinkValid = Boolean(statsShopUrl) || (Boolean(referralCode) && hasCampaign);

    const copyToClipboard = () => {
        if (!isLinkValid) return;
        navigator.clipboard.writeText(shopUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={copyToClipboard}
            disabled={!isLinkValid}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E7E5E4] text-[#D97706] text-sm font-medium hover:bg-[#F5F5F4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs bg-white"
        >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className="max-w-50 sm:max-w-xs truncate">{copied ? "Copied!" : shopUrl}</span>
        </button>
    );
};

export default SellerShopLink;
