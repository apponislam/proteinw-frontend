import React from "react";
import { X } from "lucide-react";
import { TSellerListItem } from "@/redux/features/dashboard/dashboardApi";
import { SellerCampaignOrders } from "./SellerCampaignOrders";

interface SellerDetailsModalProps {
    seller: TSellerListItem;
    onClose: () => void;
}

export const SellerDetailsModal: React.FC<SellerDetailsModalProps> = ({ seller, onClose }) => {
    const groupGoal = seller.groupDetails?.goal ?? 0;
    const campaignTarget = seller.campaignDetails?.target ?? 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm transition-all duration-300">
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto flex flex-col p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-xl bg-[#D97706] text-white flex items-center justify-center font-bold text-lg">{seller.code}</span>
                        <div>
                            <h3 className="text-xl font-bold text-[#1A1C1C]">{seller.name}</h3>
                            <p className="text-sm text-[#78716C]">{seller.email}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#78716C] hover:text-[#1C191C] transition-colors cursor-pointer" title="Close">
                        <X size={18} />
                    </button>
                </div>

                {/* Content Grid (Group Left, Campaign Right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    {/* Left side: Group Details */}
                    <div className="bg-[#FAFAF9] p-5 rounded-xl border border-[#E7E5E4]">
                        <h4 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-4">Group Details</h4>
                        {seller.groupDetails ? (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-xs text-[#78716C] block uppercase font-medium">Group Name</span>
                                    <span className="font-semibold text-[#1A1C1C] mt-1 block">{seller.groupDetails.name}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-[#78716C] block uppercase font-medium">Group Code</span>
                                    <span className="font-mono bg-[#E7E5E4] px-1.5 py-0.5 rounded text-xs text-[#1C1917] font-semibold mt-1 inline-block">{seller.groupDetails.code}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-[#78716C] block uppercase font-medium">Goal Amount</span>
                                    <span className="font-semibold text-[#1A1C1C] mt-1 block">{groupGoal.toLocaleString()} SEK</span>
                                </div>
                                <div>
                                    <span className="text-xs text-[#78716C] block uppercase font-medium">End Date</span>
                                    <span className="font-semibold text-[#1A1C1C] mt-1 block">{seller.groupDetails.endDate ? new Date(seller.groupDetails.endDate).toLocaleDateString() : "N/A"}</span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-[#78716C]">No group assigned to this seller.</p>
                        )}
                    </div>

                    {/* Right side: Campaign Details */}
                    <div className="bg-[#FAFAF9] p-5 rounded-xl border border-[#E7E5E4]">
                        <h4 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-4">Campaign Details</h4>
                        {seller.campaignDetails ? (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-xs text-[#78716C] block uppercase font-medium">Campaign Name</span>
                                    <span className="font-semibold text-[#1A1C1C] mt-1 block">{seller.campaignDetails.name}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-[#78716C] block uppercase font-medium">Campaign Code</span>
                                    <span className="font-mono bg-[#E7E5E4] px-1.5 py-0.5 rounded text-xs text-[#1C1917] font-semibold mt-1 inline-block">{seller.campaignDetails.code}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-[#78716C] block uppercase font-medium">Target Sales</span>
                                    <span className="font-semibold text-[#1A1C1C] mt-1 block">{campaignTarget.toLocaleString()} SEK</span>
                                </div>
                                <div>
                                    <span className="text-xs text-[#78716C] block uppercase font-medium">End Date</span>
                                    <span className="font-semibold text-[#1A1C1C] mt-1 block">{seller.campaignDetails.endDate ? new Date(seller.campaignDetails.endDate).toLocaleDateString() : "N/A"}</span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-[#78716C]">No running campaign found for this seller's group.</p>
                        )}
                    </div>
                </div>

                {/* Bottom: Campaign Orders (Full Width) */}
                <div className="mt-4 mb-6 border-t border-[#F5F5F4] pt-6">
                    <h4 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-2">Campaign Orders</h4>
                    <SellerCampaignOrders memberId={seller._id} campaignId={seller.campaignDetails?._id} />
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t border-[#F5F5F4] mt-auto">
                    <button onClick={onClose} className="px-5 py-2.5 bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#1A1C1C] font-semibold rounded-xl border border-[#E7E5E4] transition-colors duration-200 cursor-pointer">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
