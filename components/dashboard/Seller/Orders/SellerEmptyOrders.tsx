"use client";

import React, { useState } from "react";
import { useGetReferralAndCampaignQuery } from "@/redux/features/auth/authApi";
import Image from "next/image";

const SellerEmptyOrders = () => {
    const { data: refData } = useGetReferralAndCampaignQuery();
    const [copied, setCopied] = useState(false);

    // Build unique seller shop link
    const referralCode = refData?.data?.referralCode || "";
    const shopLink = typeof window !== "undefined" && referralCode ? `${window.location.origin}/shop?ref=${referralCode}` : "https://proteinw.com/shop";

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shopLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareSocials = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Support my 2024 Fundraiser",
                    text: "Buy delicious products from my shop link to support our fundraiser!",
                    url: shopLink,
                })
                .catch(() => {});
        } else {
            handleCopyLink();
        }
    };

    return (
        <div className="space-y-6 container mx-auto">
            {/* Main Single Card (Content on Left, QR code on Right inside card) */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] border border-stone-100 flex flex-col lg:flex-row justify-between items-stretch gap-8 min-h-80">
                {/* Left Side inside card */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D97706] text-xs font-bold mb-4">★ Start Your Campaign</div>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1A1C1C] tracking-tight mb-4">No orders yet!</h2>
                        <p className="text-[#78716C] text-base lg:text-lg leading-relaxed mb-8 max-w-xl">Your archive is waiting for its first treasure. Share your unique shop link with friends and family to start collecting orders for the 2024 fundraiser.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6  justify-start items-center">
                        <button
                            type="button"
                            onClick={handleCopyLink}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D97706] hover:bg-[#b46002] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
                        >
                            {copied ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            )}
                            <span>{copied ? "Link Copied!" : "Copy My Link"}</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleShareSocials}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-[#1A1C1C] font-bold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 border border-stone-200 whitespace-nowrap"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            <span>Share on Socials</span>
                        </button>
                    </div>
                </div>

                {/* Right Side QR Code section inside the SAME card */}
                <div className="lg:w-100 shrink-0 bg-[#F3F3F3] rounded-xl p-6 flex flex-col items-center justify-center text-center border border-stone-200/80">
                    <h3 className="text-base font-extrabold text-[#1A1C1C] tracking-wider mb-1 uppercase">SCAN TO SHOP</h3>
                    <div className="mb-3">
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shopLink)}`}
                            alt="Scan to shop QR code"
                            width={160}
                            height={160}
                            className="w-40 h-40 object-contain rounded-md"
                            onError={(e) => {
                                // Fallback SVG QR placeholder if network blocked
                                e.currentTarget.style.display = "none";
                                if (e.currentTarget.nextElementSibling) {
                                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                                }
                            }}
                        />
                    </div>
                    <span className="text-[#D97706] text-[11px] font-bold tracking-tight">Your Referral QR Code</span>
                </div>
            </div>

            {/* Bottom 3 Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Social Reach */}
                <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] border border-stone-100 hover:border-amber-200 transition-all duration-200 flex flex-col justify-between">
                    <Image src="/dashboard/orders/ordericon1.svg" width={24} height={24} alt="ordericon1" className="mb-4"></Image>
                    <div>
                        <h4 className="font-bold text-[#1A1C1C] text-base mb-1">Social Reach</h4>
                        <p className="text-sm text-[#78716C] leading-relaxed">Post your link on Instagram to reach 40% more supporters.</p>
                    </div>
                </div>

                {/* Card 2: Team Effort */}
                <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] border border-stone-100 hover:border-amber-200 transition-all duration-200 flex flex-col justify-between">
                    <Image src="/dashboard/orders/ordericon2.svg" width={24} height={24} alt="ordericon1" className="mb-4"></Image>
                    <div>
                        <h4 className="font-bold text-[#1A1C1C] text-base mb-1">Team Effort</h4>
                        <p className="text-sm text-[#78716C] leading-relaxed">Top-performing classes share their link at least twice a week.</p>
                    </div>
                </div>

                {/* Card 3: Goal Tracking */}
                <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] border border-stone-100 hover:border-amber-200 transition-all duration-200 flex flex-col justify-between">
                    <Image src="/dashboard/orders/ordericon3.svg" width={24} height={24} alt="ordericon1" className="mb-4"></Image>
                    <div>
                        <h4 className="font-bold text-[#1A1C1C] text-base mb-1">Goal Tracking</h4>
                        <p className="text-sm text-[#78716C] leading-relaxed">You&apos;re only $500 away from unlocking the silver archive badge.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerEmptyOrders;
