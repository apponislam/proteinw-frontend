"use client";

import React, { useState } from "react";
import { TCampaign, useUpdateCampaignStatusMutation } from "../../../../../redux/features/campaign/campaignApi";
import { useGetCampaignSellersQuery } from "@/redux/features/campaignSeller/campaignSellerApi";
import { AlertTriangle, ArrowLeft, Users, Package, Plus, User, Mail, Phone, ChevronDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import SellersList from "./SellersList";
import ProductsList from "./ProductsList";
import CampaignMetricsGrid from "./CampaignMetricsGrid";
import ManageSellersModal from "./ManageSellersModal";
import ManageProductsModal from "./ManageProductsModal";

interface CardDetailsProps {
    campaign: TCampaign;
}

const statusOptions: { value: "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED"; label: string; bg: string; text: string; dot: string }[] = [
    { value: "DRAFT", label: "DRAFT", bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
    { value: "ACTIVE", label: "ACTIVE", bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    { value: "FULFILMENT", label: "FULFILMENT", bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
    { value: "COMPLETED", label: "COMPLETED", bg: "bg-[#FFDEA8]", text: "text-amber-900", dot: "bg-amber-600" },
];

const CardDetails: React.FC<CardDetailsProps> = ({ campaign }) => {
    const router = useRouter();
    const [updateCampaignStatus, { isLoading: isUpdating }] = useUpdateCampaignStatusMutation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [activeTab, setActiveTab] = useState<"sellers" | "products">("sellers");
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

    const campaignId = campaign._id || "";
    const groupId = (campaign.groupId as any)?._id || (campaign.groupId as string) || "";

    const { data: campaignSellersResponse } = useGetCampaignSellersQuery(campaignId, { skip: !campaignId });
    const currentCampaignSellers = campaignSellersResponse?.data || campaign.sellers || [];
    const products = campaign.products || [];
    const [apiProductCount, setApiProductCount] = useState<number | null>(null);
    const totalProductsCount = apiProductCount ?? products.length;
    const admin = campaign.campaignAdmin;

    const progress = campaign.target > 0 ? Math.min(100, Math.round(((campaign.totalPackagesSold || 0) / campaign.target) * 100)) : 0;

    const endDate = new Date(campaign.endDate);
    const today = new Date();
    const isExpired = campaign.status !== "ACTIVE" || endDate.getTime() < today.getTime();

    const currentStatusStr = campaign.status || "DRAFT";
    const currentOption = statusOptions.find((opt) => opt.value === currentStatusStr) || statusOptions[0];

    const handleStatusSelect = async (status: "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED") => {
        if (!campaignId || status === currentStatusStr) {
            setIsDropdownOpen(false);
            return;
        }
        try {
            await updateCampaignStatus({ campaignId, status }).unwrap();
        } catch (error) {
            console.error("Failed to update campaign status:", error);
        } finally {
            setIsDropdownOpen(false);
        }
    };

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

    const profitPercentage = campaign.currentTier?.percentage || 40;
    const estProfit = Math.round(((campaign.totalRevenueSold || 0) * profitPercentage) / 100);
    const targetRevenue = campaign.target || 0;
    const sekProgress = targetRevenue > 0 ? Math.min(100, Math.round(((campaign.totalRevenueSold || 0) / targetRevenue) * 100)) : 0;
    const packagesNeeded = campaign.packagesNeededForNextTier;

    const stats = [
        {
            title: targetRevenue > 0 ? `GOAL: SEK ${targetRevenue.toLocaleString()} (${sekProgress}%)` : `GOAL: SEK 0`,
            value: `${campaign.totalPackagesSold || 0} pcs`,
            subtitle: packagesNeeded && packagesNeeded > 0 ? `NEXT TIER: ${packagesNeeded} PCS NEEDED` : "TOTAL SOLD",
        },
        {
            title: `EST. PROFIT (${profitPercentage}%): SEK ${estProfit.toLocaleString()}`,
            value: `SEK ${(campaign.totalRevenueSold || 0).toLocaleString()}`,
            subtitle: "REVENUE RAISED",
        },
        {
            title: `END DATE: ${formattedEndDate}`,
            value: currentStatusStr,
            subtitle: `STATUS (${getDaysLeft()})`,
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

                {/* Status Dropdown Picker for Details Page */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen((prev) => !prev);
                        }}
                        disabled={isUpdating}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all border border-stone-200 hover:border-amber-400 ${currentOption.bg} ${currentOption.text}`}
                        title="Change Status"
                    >
                        <span className={`w-2 h-2 rounded-full ${currentOption.dot} ${isUpdating ? "animate-ping" : ""}`}></span>
                        <span>{isUpdating ? "UPDATING..." : currentOption.label}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)}></div>
                            <div className="absolute right-0 mt-2 z-30 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                {statusOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStatusSelect(opt.value);
                                        }}
                                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors text-left cursor-pointer hover:bg-amber-50 ${
                                            currentStatusStr === opt.value ? "bg-amber-50 text-[#D97706] font-bold" : "text-stone-700"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${opt.dot}`}></span>
                                            <span>{opt.label}</span>
                                        </div>
                                        {currentStatusStr === opt.value && <Check size={14} className="text-[#D97706]" />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Title / Description Area */}
            <div>
                <h1 className="text-2xl font-bold text-[#1A1C1C] tracking-tight">{campaign.name}</h1>
                <p className="text-sm text-[#78716C] mt-1.5 leading-relaxed">{campaign.shortDescription}</p>
            </div>

            {/* Quick Metrics Grid */}
            <CampaignMetricsGrid stats={stats} />

            {/* Auto-Deletion Warning banner for Fulfilment or Completed campaigns */}
            {(currentStatusStr === "FULFILMENT" || currentStatusStr === "COMPLETED") && (
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
                                Products ({totalProductsCount}){activeTab === "products" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706] rounded-full" />}
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
                    <div className="bg-white rounded-lg border border-[#E7E5E4] overflow-hidden shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">
                        <div className={activeTab === "sellers" ? "block" : "hidden"}>
                            <SellersList sellers={currentCampaignSellers} />
                        </div>
                        <div className={activeTab === "products" ? "block" : "hidden"}>
                            <ProductsList campaignId={campaignId} fallbackProducts={products} onTotalCount={setApiProductCount} />
                        </div>
                    </div>
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
