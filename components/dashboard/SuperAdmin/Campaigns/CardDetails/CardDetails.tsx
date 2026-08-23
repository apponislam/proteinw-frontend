"use client";

import React, { useState } from "react";
import { TCampaign, useUpdateCampaignStatusMutation } from "../../../../../redux/features/campaign/campaignApi";
import { useGetCampaignSellersQuery } from "@/redux/features/campaignSeller/campaignSellerApi";
import { toast } from "sonner";
import { AlertTriangle, ArrowLeft, Users, Package, Plus, User, Mail, Phone, ChevronDown, Check, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import SellersList from "./SellersList";
import ProductsList from "./ProductsList";
import CampaignMetricsGrid from "./CampaignMetricsGrid";
import ManageSellersModal from "./ManageSellersModal";
import ManageProductsModal from "./ManageProductsModal";
import CampaignOrdersList from "./CampaignOrdersList";

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
    const user = useAppSelector(currentUser);
    const isSuperAdmin = user?.role === "SUPER_ADMIN";

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

    const currentStatusStr = campaign.status || "DRAFT";
    const currentOption = statusOptions.find((opt) => opt.value === currentStatusStr) || statusOptions[0];

    const handleStatusSelect = async (status: "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED") => {
        if (!campaignId || status === currentStatusStr || !isSuperAdmin) {
            setIsDropdownOpen(false);
            return;
        }
        try {
            await updateCampaignStatus({ campaignId, status }).unwrap();
            toast.success(`Campaign status updated to ${status}`);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update campaign status");
        } finally {
            setIsDropdownOpen(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Top Navigation */}
            <div className="flex items-center justify-between">
                <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm text-[#78716C] hover:text-[#1A1C1C] transition-colors cursor-pointer font-medium">
                    <ArrowLeft size={16} />
                    <span>Back to Campaigns</span>
                </button>

                {/* Status Dropdown */}
                {isSuperAdmin ? (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            disabled={isUpdating}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-stone-200 shadow-xs hover:shadow-md transition-all cursor-pointer ${currentOption.bg} ${currentOption.text}`}
                        >
                            <span className={`w-2 h-2 rounded-full ${currentOption.dot}`}></span>
                            <span>{currentOption.label}</span>
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)}></div>
                                <div className="absolute right-0 mt-1.5 z-30 w-40 bg-white rounded-xl shadow-xl border border-stone-200 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                    {statusOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStatusSelect(opt.value);
                                            }}
                                            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors text-left cursor-pointer hover:bg-amber-50 ${currentStatusStr === opt.value ? "bg-amber-50 text-[#D97706] font-bold" : "text-stone-700"}`}
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
                ) : (
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-stone-200 ${currentOption.bg} ${currentOption.text}`}>
                        <span className={`w-2 h-2 rounded-full ${currentOption.dot}`}></span>
                        <span>{currentOption.label}</span>
                    </div>
                )}
            </div>

            {/* Title / Description Area */}
            <div>
                <h1 className="text-2xl font-bold text-[#1A1C1C] tracking-tight">{campaign.name}</h1>
                <p className="text-sm text-[#78716C] mt-1.5 leading-relaxed">{campaign.shortDescription}</p>
            </div>

            {/* Quick Metrics Grid */}
            <CampaignMetricsGrid campaign={campaign} />

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
                {/* Campaign Contact / Admin Info Card - Shows first on Mobile, Right Column on Desktop */}
                <div className="lg:col-span-1 lg:order-2 space-y-4">
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
                                    <div className="flex items-center gap-2 min-w-0">
                                        <Mail size={16} className="shrink-0" />
                                        <span className="truncate block" title={admin.email}>
                                            {admin.email}
                                        </span>
                                    </div>
                                    {admin.phone ? (
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Phone size={16} className="shrink-0" />
                                            <span className="truncate block">{admin.phone}</span>
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

                {/* Left/Middle Column: Tabs for Sellers & Products */}
                <div className="lg:col-span-2 lg:order-1 space-y-4">
                    {/* Tab Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E7E5E4] pb-2 sm:pb-0.5 gap-3">
                        <div className="flex gap-4 sm:gap-6 w-full sm:w-auto">
                            <button onClick={() => setActiveTab("sellers")} className={`pb-2 sm:pb-3 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${activeTab === "sellers" ? "text-[#D97706]" : "text-[#78716C] hover:text-[#1A1C1C]"}`}>
                                <Users size={16} />
                                Sellers ({currentCampaignSellers.length}){activeTab === "sellers" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706] rounded-full" />}
                            </button>
                            <button onClick={() => setActiveTab("products")} className={`pb-2 sm:pb-3 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${activeTab === "products" ? "text-[#D97706]" : "text-[#78716C] hover:text-[#1A1C1C]"}`}>
                                <Package size={16} />
                                Products ({totalProductsCount}){activeTab === "products" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706] rounded-full" />}
                            </button>
                        </div>
                        {(user?.role === "SUPER_ADMIN" || user?.role === "ADMIN") && activeTab === "sellers" && (
                            <button onClick={() => setIsSellerModalOpen(true)} className="mb-1 sm:mb-2 px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0">
                                <Plus size={14} />
                                Manage Sellers
                            </button>
                        )}
                        {(user?.role === "SUPER_ADMIN" || user?.role === "ADMIN") && activeTab === "products" && (
                            <button onClick={() => setIsProductModalOpen(true)} className="mb-1 sm:mb-2 px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0">
                                <Plus size={14} />
                                Manage Products
                            </button>
                        )}
                    </div>

                    {/* Tab Body */}
                    <div className="bg-white rounded-lg border border-[#E7E5E4] overflow-hidden max-w-full shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">
                        <div className={activeTab === "sellers" ? "block w-full overflow-x-auto" : "hidden"}>
                            <SellersList sellers={currentCampaignSellers} />
                        </div>
                        <div className={activeTab === "products" ? "block w-full overflow-x-auto" : "hidden"}>
                            <ProductsList campaignId={campaignId} fallbackProducts={products} onTotalCount={setApiProductCount} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Orders Component */}
            <div className="bg-white rounded-xl border border-[#E7E5E4] shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">
                <CampaignOrdersList campaignId={campaignId} />
            </div>

            {/* Modals */}
            <ManageSellersModal isOpen={isSellerModalOpen} onClose={() => setIsSellerModalOpen(false)} campaignId={campaignId} groupId={groupId} initialSellers={currentCampaignSellers} />

            <ManageProductsModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} campaignId={campaignId} initialProducts={products} />
        </div>
    );
};

export default CardDetails;
