"use client";

import React, { useRef } from "react";
import { Printer, X, Scissors } from "lucide-react";

interface SellerA4QrPrintModalProps {
    isOpen: boolean;
    onClose: () => void;
    shopLink: string;
    campaignName?: string;
    sellerName?: string;
}

const SellerA4QrPrintModal: React.FC<SellerA4QrPrintModalProps> = ({ isOpen, onClose, shopLink }) => {
    const printAreaRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(shopLink)}`;

    const handlePrint = () => {
        window.print();
    };

    const renderCardContent = () => (
        <div className="a4-card-half flex-1 p-3 sm:p-6 flex flex-col items-center justify-center text-center bg-white border-2 border-stone-200 rounded-2xl shadow-xs relative overflow-hidden my-1">
            {/* Brand Header */}
            <h1 className="a4-header-text text-xl sm:text-2xl md:text-3xl font-black text-[#1A1C1C] tracking-tight uppercase mb-0.5 sm:mb-1">Kungsbjörnen</h1>

            {/* Tagline */}
            <p className="a4-tagline-text text-amber-700 font-bold text-xs sm:text-sm md:text-base mb-2 sm:mb-3">Tillsammans gör vi skillnad.</p>

            {/* Instructions */}
            <p className="a4-desc-text text-stone-800 font-semibold text-[11px] sm:text-xs md:text-sm max-w-xs sm:max-w-sm leading-snug mb-3 sm:mb-4">Scanna QR-koden för att besöka min digitala butik och stötta vår insamling.</p>

            {/* Seller Personal Campaign QR Code */}
            <div className="a4-qr-box p-2 sm:p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl shadow-inner flex items-center justify-center">
                <img src={qrCodeUrl} alt="Scanna QR-koden för att besöka min digitala butik" className="a4-qr-img w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 object-contain rounded-lg" />
            </div>
        </div>
    );

    return (
        <>
            {/* Global Print Styles */}
            <style jsx global>{`
                @media print {
                    html,
                    body {
                        width: 210mm !important;
                        height: 297mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: hidden !important;
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    body * {
                        visibility: hidden !important;
                    }
                    #a4-print-container,
                    #a4-print-container * {
                        visibility: visible !important;
                    }
                    #a4-print-container {
                        position: fixed !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        max-width: 210mm !important;
                        max-height: 297mm !important;
                        margin: 0 !important;
                        padding: 10mm 12mm !important;
                        background: white !important;
                        box-sizing: border-box !important;
                        border: none !important;
                        border-radius: 0 !important;
                        box-shadow: none !important;
                        page-break-after: avoid !important;
                        page-break-inside: avoid !important;
                        break-after: avoid !important;
                        break-inside: avoid !important;
                        display: flex !important;
                        flex-direction: column !important;
                        justify-content: space-between !important;
                    }
                    .a4-card-half {
                        height: 128mm !important;
                        max-height: 128mm !important;
                        padding: 6mm 10mm !important;
                        margin: 0 !important;
                        box-sizing: border-box !important;
                        border-width: 2px !important;
                        display: flex !important;
                        flex-direction: column !important;
                        justify-content: center !important;
                        align-items: center !important;
                        border-radius: 16px !important;
                    }
                    .a4-header-text {
                        font-size: 26pt !important;
                        margin-bottom: 2mm !important;
                    }
                    .a4-tagline-text {
                        font-size: 13pt !important;
                        margin-bottom: 3mm !important;
                    }
                    .a4-desc-text {
                        font-size: 10pt !important;
                        margin-bottom: 4mm !important;
                        max-width: 130mm !important;
                    }
                    .a4-qr-box {
                        padding: 3mm !important;
                    }
                    .a4-qr-img {
                        width: 44mm !important;
                        height: 44mm !important;
                        max-width: 44mm !important;
                        max-height: 44mm !important;
                    }
                    .a4-divider {
                        height: 10mm !important;
                        margin: 2mm 0 !important;
                    }
                    @page {
                        size: A4 portrait;
                        margin: 0;
                    }
                }
            `}</style>

            {/* Modal Backdrop */}
            <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
                <div className="bg-stone-900 rounded-2xl max-w-2xl w-full border border-stone-800 shadow-2xl flex flex-col h-[94vh] sm:h-[90vh] overflow-hidden text-white my-auto">
                    {/* Header */}
                    <div className="p-3 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900 shrink-0 gap-2">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-sm sm:text-base md:text-lg font-bold text-white flex items-center gap-1.5 sm:gap-2 truncate">
                                <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                                <span className="truncate">Print A4 QR Flyer</span>
                            </h2>
                            <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5 truncate">Print on an A4 paper and cut in the middle</p>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-[#7C5800] to-[#FFB800] hover:from-[#8B6500] hover:to-[#FFCC00] text-white font-bold text-[11px] sm:text-xs rounded-xl shadow-md transition-all cursor-pointer active:scale-95 whitespace-nowrap"
                            >
                                <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>Print A4 Sheet</span>
                            </button>
                            <button type="button" onClick={onClose} className="p-1.5 sm:p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors cursor-pointer">
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Preview Scroll Area */}
                    <div className="p-2 sm:p-6 overflow-y-auto bg-stone-950/70 flex justify-center items-start flex-1 min-h-0">
                        {/* Printable A4 Container */}
                        <div id="a4-print-container" ref={printAreaRef} className="bg-white text-stone-900 rounded-xl shadow-2xl w-full max-w-145 p-3 sm:p-6 md:p-8 flex flex-col justify-between box-border border border-stone-300 my-auto">
                            {/* Top Half */}
                            {renderCardContent()}

                            {/* Center Cut Line Divider */}
                            <div className="a4-divider relative my-2 sm:my-3 flex items-center justify-center shrink-0">
                                <div className="w-full border-t-2 border-dashed border-stone-400"></div>
                                <div className="absolute bg-white px-2.5 py-0.5 sm:px-3 sm:py-1 text-stone-500 text-[10px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 border border-stone-300 rounded-full shadow-xs">
                                    <Scissors className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    <span>Klipp här / Cut here</span>
                                </div>
                            </div>

                            {/* Bottom Half */}
                            {renderCardContent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerA4QrPrintModal;
