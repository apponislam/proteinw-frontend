"use client";

import React, { useState } from "react";
import { TCampaign } from "../../../../../redux/features/campaign/campaignApi";
import { useGetCampaignSellersQuery } from "@/redux/features/campaignSeller/campaignSellerApi";
import { AlertTriangle, ArrowLeft, Users, Package, Plus, User, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import SellersList from "./SellersList";
import ProductsList from "./ProductsList";
import CampaignMetricsGrid from "./CampaignMetricsGrid";
import ManageSellersModal from "./ManageSellersModal";
import ManageProductsModal from "./ManageProductsModal";

interface CardDetailsProps {
    campaign: TCampaign;
}

const CardDetails: React.FC<CardDetailsProps> = ({ campaign }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"sellers" | "products">("sellers");
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

    const campaignId = campaign._id || "";
    const groupId = (campaign.groupId as any)?._id || (campaign.groupId as string) || "";

    const { data: campaignSellersResponse } = useGetCampaignSellersQuery(campaignId, { skip: !campaignId });
    const currentCampaignSellers = campaignSellersResponse?.data || campaign.sellers || [];
    const products = campaign.products || [];
    const admin = campaign.campaignAdmin;

    const progress = campaign.target > 0 ? Math.min(100, Math.round(((campaign.totalPackagesSold || 0) / campaign.target) * 100)) : 0;

    const endDate = new Date(campaign.endDate);
    const today = new Date();
    const isExpired = campaign.status !== "ACTIVE" || endDate.getTime() < today.getTime();

    const formattedEndDate = endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const getDaysLeft = () => {
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return "Expired";
        if (diffDays === 0) return "Ends today";
        return `In ${diffDays} days`;
    };

    const stats = [
        {
            title: `GOAL: ${campaign.target || 0} PCS (${progress}%)`,
            value: `${campaign.totalPackagesSold || 0} pcs`,
            subtitle: "TOTAL SOLD",
        },
        {
            title: `EST. PROFIT: SEK ${Math.round((campaign.totalRevenueSold || 0) * 0.4).toLocaleString()}`,
            value: `SEK ${(campaign.totalRevenueSold || 0).toLocaleString()}`,
            subtitle: "REVENUE RAISED",
        },
        {
            title: `END DATE: ${formattedEndDate}`,
            value: !isExpired ? getDaysLeft() : "Expired",
            subtitle: "CAMPAIGN STATUS",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header / Breadcrumb */}
            <div className="flex items-center justify-between">
                <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm text-[#78716C] hover:text-[#1A1C1C] transition-colors cursor-pointer">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </button>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${!isExpired ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    <span className={`w-2 h-2 rounded-full ${!isExpired ? "bg-green-500" : "bg-red-500"}`}></span>
                    {!isExpired ? "ACTIVE" : campaign.status || "EXPIRED"}
                </span>
            </div>

            {/* Title / Description Area */}
            <div>
                <h1 className="text-2xl font-bold text-[#1A1C1C] tracking-tight">{campaign.name}</h1>
                <p className="text-sm text-[#78716C] mt-1.5 leading-relaxed">{campaign.shortDescription}</p>
            </div>

            {/* Quick Metrics Grid */}
            <CampaignMetricsGrid stats={stats} />

            {/* Expired Deletion Warning inline */}
            {isExpired && (
                <div className="flex gap-3 bg-red-50 p-4 rounded-xl border border-red-100">
                    <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
                    <div>
                        <div className="text-xs font-bold text-red-800 uppercase">Auto-Deletion Warning</div>
                        <p className="text-xs text-red-700 mt-0.5 leading-relaxed">This campaign has ended and is scheduled to be automatically deleted in 2 months.</p>
                    </div>
                </div>
            )}

            {/* Split Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left/Middle Column: Tabs for Sellers & Products */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Tab Header */}
                    <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-0.5">
                        <div className="flex gap-6">
                            <button onClick={() => setActiveTab("sellers")} className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${activeTab === "sellers" ? "text-[#D97706]" : "text-[#78716C] hover:text-[#1A1C1C]"}`}>
                                <Users size={16} />
                                Sellers ({currentCampaignSellers.length}){activeTab === "sellers" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706] rounded-full" />}
                            </button>
                            <button onClick={() => setActiveTab("products")} className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${activeTab === "products" ? "text-[#D97706]" : "text-[#78716C] hover:text-[#1A1C1C]"}`}>
                                <Package size={16} />
                                Products ({products.length}){activeTab === "products" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706] rounded-full" />}
                            </button>
                        </div>
                        {activeTab === "sellers" && (
                            <button onClick={() => setIsSellerModalOpen(true)} className="mb-2 px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
                                <Plus size={14} />
                                Manage Sellers
                            </button>
                        )}
                        {activeTab === "products" && (
                            <button onClick={() => setIsProductModalOpen(true)} className="mb-2 px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
                                <Plus size={14} />
                                Manage Products
                            </button>
                        )}
                    </div>

                    {/* Tab Body */}
                    <div className="bg-white rounded-lg border border-[#E7E5E4] overflow-hidden shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">{activeTab === "sellers" ? <SellersList sellers={currentCampaignSellers} /> : <ProductsList products={products} />}</div>
                </div>

                {/* Right Column: Campaign Contact / Admin Info Card */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#1A1C1C] uppercase tracking-wider">Campaign Contact</h3>
                    <div className="bg-white rounded-lg border border-[#E7E5E4] p-6 space-y-4 shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">
                        {admin ? (
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-[#D97706] flex items-center justify-center font-bold text-sm shrink-0">
                                        <User size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-sm text-[#1A1C1C] truncate">{admin.name || "N/A"}</h4>
                                        <span className="text-xs text-[#78716C] block">Group Leader</span>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-[#E7E5E4] text-xs text-[#78716C]">
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="shrink-0" />
                                        <span className="truncate">{admin.email}</span>
                                    </div>
                                    {admin.phone ? (
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} className="shrink-0" />
                                            <span>{admin.phone}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 opacity-50">
                                            <Phone size={16} className="shrink-0" />
                                            <span>No phone number</span>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-sm text-[#78716C] italic text-center py-4">No admin user assigned to this campaign.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ManageSellersModal isOpen={isSellerModalOpen} onClose={() => setIsSellerModalOpen(false)} campaignId={campaignId} groupId={groupId} initialSellers={currentCampaignSellers} />

            <ManageProductsModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} campaignId={campaignId} initialProducts={products} />
        </div>
    );
};

export default CardDetails;
