"use client";

import React, { useState } from "react";

const PolicyCenterPage = () => {
    const [activeTab, setActiveTab] = useState("terms");

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">Policy Center</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Manage your terms and conditions and privacy policy.</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-1 p-2 border-b border-[#F5F5F4]">
                    <button onClick={() => setActiveTab("terms")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "terms" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:text-[#1A1C1C] hover:bg-[#F5F5F4]"}`}>
                        Terms and Conditions
                    </button>
                    <button onClick={() => setActiveTab("privacy")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "privacy" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:text-[#1A1C1C] hover:bg-[#F5F5F4]"}`}>
                        Privacy Policy
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === "terms" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Terms and Conditions</h2>
                            <textarea placeholder="Enter your terms and conditions here..." className="w-full h-96 px-4 py-3 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 resize-none" />
                            <button className="h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all">Save Terms</button>
                        </div>
                    )}

                    {activeTab === "privacy" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Privacy Policy</h2>
                            <textarea placeholder="Enter your privacy policy here..." className="w-full h-96 px-4 py-3 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 resize-none" />
                            <button className="h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all">Save Privacy Policy</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PolicyCenterPage;
