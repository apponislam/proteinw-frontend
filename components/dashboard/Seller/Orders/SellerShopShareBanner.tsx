"use client";

import React, { useState } from "react";
import { useGetAsSellerCampaignInfoQuery } from "@/redux/features/dashboard/dashboardApi";
import { Copy, Share2, QrCode, Check, Printer } from "lucide-react";
import SellerA4QrPrintModal from "./SellerA4QrPrintModal";

interface SellerShopShareBannerProps {
    campaignId?: string;
}

const SellerShopShareBanner: React.FC<SellerShopShareBannerProps> = ({ campaignId }) => {
    const { data: campaignInfoResponse } = useGetAsSellerCampaignInfoQuery(campaignId || undefined);
    const [copied, setCopied] = useState(false);
    const [showQrModal, setShowQrModal] = useState(false);
    const [showPrintModal, setShowPrintModal] = useState(false);

    const infoData = campaignInfoResponse?.data;
    const shopLink = infoData?.shopUrl || "";

    const handleCopyLink = () => {
        if (!shopLink) return;
        navigator.clipboard.writeText(shopLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareSocials = () => {
        const shareTitle = infoData?.name ? `Support ${infoData.name}` : "Support my Fundraiser";
        const shareText = infoData?.shortDescription ? `${infoData.shortDescription} — Buy products to support our fundraiser!` : "Buy products to support our fundraiser!";

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
        <>
            <div className="bg-linear-to-r from-[#1A1C1C] via-[#2A2D2D] to-[#1A1C1C] rounded-2xl p-4 sm:p-5 md:p-6 mb-6 shadow-md border border-stone-800 text-white flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                {/* Left info */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#FFB800] shrink-0">
                        <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-[#FFB800] px-2 py-0.5 rounded-full border border-amber-500/30">Personal Store Link</span>
                            {infoData?.name && <span className="text-xs text-stone-400 truncate max-w-37.5 sm:max-w-xs">• {infoData.name}</span>}
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-stone-200 mt-1 truncate max-w-full lg:max-w-md">{shopLink ? shopLink : "Loading personal store link..."}</p>
                    </div>
                </div>

                {/* Right Action buttons */}
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full lg:w-auto shrink-0 pt-3 lg:pt-0 border-t border-stone-800/80 lg:border-t-0">
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 bg-linear-to-r from-[#7C5800] to-[#FFB800] hover:from-[#8B6500] hover:to-[#FFCC00] text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer active:scale-95"
                    >
                        {copied ? <Check size={15} /> : <Copy size={15} />}
                        <span className="truncate">{copied ? "Copied!" : "Copy Link"}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleShareSocials}
                        className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl text-xs border border-stone-700 transition-all cursor-pointer active:scale-95"
                    >
                        <Share2 size={15} />
                        <span className="truncate">Share</span>
                    </button>

                    {shopLink && (
                        <>
                            <button
                                type="button"
                                onClick={() => setShowQrModal(true)}
                                className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl text-xs border border-stone-700 transition-all cursor-pointer active:scale-95"
                                title="Show QR Code"
                            >
                                <QrCode size={15} />
                                <span className="truncate">QR Code</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowPrintModal(true)}
                                className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold rounded-xl text-xs border border-amber-500/40 transition-all cursor-pointer active:scale-95"
                                title="Print A4 QR Flyer"
                            >
                                <Printer size={15} />
                                <span className="truncate">Print A4 Sheet</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* QR Modal Popover */}
            {showQrModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-xs w-full text-center relative border border-stone-100 flex flex-col items-center">
                        <h3 className="text-base font-bold text-[#1A1C1C] mb-1 uppercase tracking-wider">SCAN TO SHOP</h3>
                        <p className="text-xs text-[#78716C] mb-4">Let customers scan directly from your screen</p>
                        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl mb-5">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shopLink)}`} alt="Scan to shop QR code" className="w-48 h-48 object-contain rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowQrModal(false);
                                    setShowPrintModal(true);
                                }}
                                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Printer size={15} />
                                <span>Print A4 QR Flyer</span>
                            </button>
                            <button type="button" onClick={() => setShowQrModal(false)} className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-[#1A1C1C] text-xs font-bold rounded-xl transition-all cursor-pointer">
                                Close
                            </button>
                        </div>
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
        </>
    );
};

export default SellerShopShareBanner;
