import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import SellerHomeCards from "./SellerHomeCards";
import SellerFundraisingTarget from "./SellerFundraisingTarget";

const SellerOverview = () => {
    const [copied, setCopied] = useState(false);
    const shopUrl = "https://nordicarchive.com/shop/class-2024";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shopUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-8">
                <div>
                    <h1 className="text-sm text-[#7C5800] mb-3 uppercase font-medium">COORDINATOR DASHBOARD</h1>
                    <h2 className="text-5xl text-[#1A1C1C] mb-3">Welcome back, Erik!</h2>
                    <p className="text-[#78716C] text-lg">Your Class 2024 campaign is active and performing well.</p>
                </div>
                <div className="shrink-0">
                    <button onClick={copyToClipboard} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E7E5E4] text-[#D97706] text-sm font-medium hover:bg-[#F5F5F4] transition-colors">
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        <span>{copied ? "Copied!" : shopUrl}</span>
                    </button>
                </div>
            </div>
            <SellerHomeCards />
            <SellerFundraisingTarget />
        </div>
    );
};

export default SellerOverview;
