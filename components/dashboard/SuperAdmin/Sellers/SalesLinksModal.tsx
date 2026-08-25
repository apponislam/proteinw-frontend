import React, { useState } from "react";
import { TSalesLinkItem } from "@/redux/features/dashboard/dashboardApi";
import { Check, Copy, ExternalLink, Link2, X } from "lucide-react";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200/80 w-[95vw] sm:w-full max-w-lg max-h-[85vh] flex flex-col p-4 sm:p-6 relative animate-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between pb-3 sm:pb-4 border-b border-stone-100 mb-3 sm:mb-4 shrink-0 pr-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-100 text-[#D97706] flex items-center justify-center font-bold shrink-0 shadow-xs">
                            <Link2 size={22} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-extrabold text-[#1A1C1C] truncate">Store Sales Links</h3>
                            <p className="text-xs text-[#78716C] truncate">{sellerName} • {sellerEmail}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                    title="Close"
                >
                    <X size={18} />
                </button>

                {/* List Container */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
                    {links.map((item, idx) => {
                        const isCopied = copiedLinkUrl === item.link;

                        return (
                            <div
                                key={idx}
                                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200/70 bg-[#FAFAF9] hover:bg-amber-50/40 hover:border-amber-200 transition-all duration-200 space-y-2.5 shadow-2xs"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs sm:text-sm font-bold text-[#1A1C1C] flex items-center gap-2 truncate">
                                        <span className="w-2 h-2 rounded-full bg-[#D97706] shrink-0"></span>
                                        <span className="truncate">{item.name || `Store Link #${idx + 1}`}</span>
                                    </span>
                                    <span className="text-[10px] font-extrabold text-[#7C5800] bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-200/50 shrink-0">
                                        Link #{idx + 1}
                                    </span>
                                </div>

                                <div className="bg-white p-2.5 rounded-xl border border-stone-200/60 flex items-center justify-between gap-2">
                                    <span className="text-xs font-mono text-[#57534E] break-all select-all line-clamp-2 sm:line-clamp-1">
                                        {item.link}
                                    </span>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-1">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#1A1C1C] bg-white hover:bg-stone-100 px-3.5 py-2 rounded-xl border border-stone-200 transition-colors"
                                    >
                                        <ExternalLink size={13} />
                                        <span>Open Store</span>
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => handleCopyModalLink(item.link)}
                                        className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs ${
                                            isCopied
                                                ? "bg-green-600 text-white"
                                                : "bg-[#D97706] hover:bg-[#b46204] text-white"
                                        }`}
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check size={14} />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={14} />
                                                <span>Copy Link</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between shrink-0">
                    <span className="text-xs font-extrabold text-[#78716C]">
                        Total Links: <span className="text-[#D97706]">{links.length}</span>
                    </span>
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
