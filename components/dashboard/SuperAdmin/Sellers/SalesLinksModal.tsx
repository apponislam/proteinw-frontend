import React, { useState } from "react";
import { TSalesLinkItem } from "@/redux/features/dashboard/dashboardApi";
import { Check, Copy, ExternalLink, X } from "lucide-react";

interface SalesLinksModalProps {
    sellerName: string;
    sellerEmail: string;
    links: TSalesLinkItem[];
    onClose: () => void;
}

export const SalesLinksModal: React.FC<SalesLinksModalProps> = ({
    sellerName,
    sellerEmail,
    links,
    onClose,
}) => {
    const [copiedLinkUrl, setCopiedLinkUrl] = useState<string | null>(null);

    const handleCopyModalLink = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedLinkUrl(url);
        setTimeout(() => setCopiedLinkUrl(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-150" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                    title="Close"
                >
                    <X size={18} />
                </button>

                <div className="flex items-center gap-3 pb-4 border-b border-stone-100 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#7C5800] flex items-center justify-center font-bold shrink-0">
                        <ExternalLink size={20} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#1A1C1C]">Store Sales Links</h3>
                        <p className="text-xs text-[#78716C]">{sellerName} • {sellerEmail}</p>
                    </div>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                    {links.map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-stone-200/80 bg-[#FAFAF9] hover:bg-amber-50/40 transition-colors space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#1A1C1C] flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
                                    {item.name || `Store Link #${idx + 1}`}
                                </span>
                                <span className="text-[10px] font-bold text-[#78716C] bg-white px-2 py-0.5 rounded border border-stone-200">
                                    Link #{idx + 1}
                                </span>
                            </div>

                            <p className="text-xs font-mono text-[#78716C] bg-white p-2 rounded-lg border border-stone-200/60 break-all select-all">
                                {item.link}
                            </p>

                            <div className="flex items-center justify-end gap-2 pt-1">
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#78716C] hover:text-[#1A1C1C] bg-white hover:bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 transition-colors"
                                >
                                    <ExternalLink size={12} />
                                    Open Store
                                </a>
                                <button
                                    type="button"
                                    onClick={() => handleCopyModalLink(item.link)}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#D97706] hover:bg-[#b46204] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                                >
                                    {copiedLinkUrl === item.link ? (
                                        <>
                                            <Check size={13} />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-[#78716C]">Total Links: {links.length}</span>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
