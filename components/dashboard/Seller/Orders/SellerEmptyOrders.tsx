"use client";

import React, { useState } from "react";
import { useGetAsSellerCampaignInfoQuery } from "@/redux/features/dashboard/dashboardApi";
import Image from "next/image";
import { Printer } from "lucide-react";
import SellerA4QrPrintModal from "./SellerA4QrPrintModal";

interface SellerEmptyOrdersProps {
    campaignId?: string;
    onAutoSelectCampaign?: (campaignId: string) => void;
}

const SellerEmptyOrders: React.FC<SellerEmptyOrdersProps> = ({ campaignId, onAutoSelectCampaign }) => {
    const { data: campaignInfoResponse } = useGetAsSellerCampaignInfoQuery(campaignId || undefined);
    const [copied, setCopied] = useState(false);
    const [showPrintModal, setShowPrintModal] = useState(false);

    const infoData = campaignInfoResponse?.data;
    const shopLink = infoData?.shopUrl || "";
    const campaignNameText = infoData?.name ? `the ${infoData.name}` : "your active";
    const statusUpper = (infoData?.status || "").toUpperCase();
    const isCampaignActive = !infoData?.status || statusUpper === "ACTIVE";

    React.useEffect(() => {
        const activeCampaignId = infoData?.campaignId;
        if (!campaignId && activeCampaignId && onAutoSelectCampaign) {
            onAutoSelectCampaign(activeCampaignId);
        }
    }, [campaignId, infoData?.campaignId, onAutoSelectCampaign]);

    const handleCopyLink = () => {
        if (!shopLink) return;
        navigator.clipboard.writeText(shopLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareSocials = () => {
        const shareTitle = infoData?.name ? `Stötta ${infoData.name}` : "Stötta vår försäljning";
        const shareText = infoData?.shortDescription ? `${infoData.shortDescription} — Handla goda produkter från min butikslänk för att stötta vår försäljning!` : "Handla goda produkter från min butikslänk för att stötta vår försäljning!";

        if (navigator.share && shopLink) {
            navigator
                .share({
                    title: shareTitle,
                    text: shareText,
                    url: shopLink,
                })
                .catch(() => {});
        } else {
            handleCopyLink();
        }
    };

    return (
        <div className="space-y-6 container mx-auto">
            {!isCampaignActive ? (
                /* Non-Active Campaign Closed State */
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] border border-stone-100 flex flex-col items-center justify-center text-center min-h-80">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1A1C1C] tracking-tight mb-3">Inga beställningar har lagts</h2>
                    <p className="text-[#78716C] text-base lg:text-lg leading-relaxed max-w-xl">
                        Denna försäljning är för närvarande i status <span className="font-semibold text-[#1A1C1C]">{infoData?.status ? infoData.status.toLowerCase() : "stängd"}</span> och tar inte längre emot nya kundbeställningar.
                    </p>
                </div>
            ) : (
                /* Active Campaign Sharing Card */
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] border border-stone-100 flex flex-col lg:flex-row justify-between items-stretch gap-8 min-h-80">
                    {/* Left Side inside card */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D97706] text-xs font-bold mb-4">★ Starta din försäljning</div>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1A1C1C] tracking-tight mb-4">Inga beställningar än!</h2>
                            <p className="text-[#78716C] text-base lg:text-lg leading-relaxed mb-8 max-w-xl">Du har inte fått din första beställning än. Dela din unika butikslänk med vänner och familj för att börja ta emot beställningar för din försäljning.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-start items-center">
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
                                <span>{copied ? "Länk kopierad!" : "Kopiera min länk"}</span>
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
                                <span>Dela i sociala medier</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Side QR Code section inside the SAME card */}
                    <div className="lg:w-100 shrink-0 bg-[#F3F3F3] rounded-xl p-6 flex flex-col items-center justify-center text-center border border-stone-200/80">
                        <div className="mb-3 w-40 h-40 flex items-center justify-center bg-white rounded-md p-2 shadow-xs">
                            {shopLink ? (
                                <img key={shopLink} src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shopLink)}`} alt="Skanna för att handla QR-kod" width={160} height={160} className="w-full h-full object-contain rounded-md" />
                            ) : (
                                <div className="text-xs text-stone-400 text-center">Laddar QR-kod...</div>
                            )}
                        </div>
                        <h3 className="text-base font-extrabold text-[#1A1C1C] tracking-wider uppercase mb-3">SKANNA FÖR ATT HANDLA</h3>
                        {shopLink && (
                            <button
                                type="button"
                                onClick={() => setShowPrintModal(true)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                                <Printer size={14} />
                                <span>Skriv ut A4-ark</span>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* A4 Print Modal */}
            <SellerA4QrPrintModal
                isOpen={showPrintModal}
                onClose={() => setShowPrintModal(false)}
                shopLink={shopLink}
                campaignName={infoData?.name}
            />

            {/* Bottom 3 Cards Section - Only shown when campaign is ACTIVE */}
            {isCampaignActive && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Social Reach */}
                    <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] border border-stone-100 hover:border-amber-200 transition-all duration-200 flex flex-col justify-between">
                        <div className="w-6 h-6 mb-4">
                            <Image src="/dashboard/orders/ordericon1.svg" width={24} height={24} className="w-6 h-6 object-contain" alt="ordericon1" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1A1C1C] text-base mb-1">Nå ut i sociala medier</h4>
                            <p className="text-sm text-[#78716C] leading-relaxed">Dela din länk på Instagram för att nå 40% fler supportrar.</p>
                        </div>
                    </div>

                    {/* Card 2: Team Effort */}
                    <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] border border-stone-100 hover:border-amber-200 transition-all duration-200 flex flex-col justify-between">
                        <div className="w-6 h-6 mb-4">
                            <Image src="/dashboard/orders/ordericon2.svg" width={24} height={24} className="w-6 h-6 object-contain" alt="ordericon2" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1A1C1C] text-base mb-1">Gemensam insats</h4>
                            <p className="text-sm text-[#78716C] leading-relaxed">De bästa klasserna och lagen delar sin länk minst två gånger i veckan.</p>
                        </div>
                    </div>

                    {/* Card 3: Goal Tracking */}
                    <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.06)] border border-stone-100 hover:border-amber-200 transition-all duration-200 flex flex-col justify-between">
                        <div className="w-6 h-6 mb-4">
                            <Image src="/dashboard/orders/ordericon3.svg" width={24} height={24} className="w-6 h-6 object-contain" alt="ordericon3" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1A1C1C] text-base mb-1">Måluppföljning</h4>
                            <p className="text-sm text-[#78716C] leading-relaxed">Fortsätt dela din försäljningslänk regelbundet för att nå ert försäljningsmål snabbare.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerEmptyOrders;
