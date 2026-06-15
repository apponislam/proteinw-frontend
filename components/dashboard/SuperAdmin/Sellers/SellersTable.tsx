import React, { useState } from "react";
import { useGetSuperAdminSellersQuery, TSellerListItem } from "@/redux/features/dashboard/dashboardApi";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { Check, Copy } from "lucide-react";

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800";
        case "Inactive":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const SellerCampaignOrders = ({ memberId, campaignId }: { memberId: string; campaignId?: string }) => {
    const [page, setPage] = useState(1);
    const { data: response, isLoading } = useGetAllOrdersQuery(
        { memberId, campaignId, page, limit: 5 },
        { skip: !memberId }
    );

    const orders = response?.data || [];
    const meta = response?.meta || { total: 0, totalPages: 0 };

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-[#D97706] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-8 text-[#78716C] bg-[#FAFAF9] rounded-lg border border-dashed border-[#E7E5E4] text-sm">
                No orders found for this campaign.
            </div>
        );
    }

    return (
        <div className="mt-4">
            <div className="overflow-x-auto border border-[#E7E5E4] rounded-lg">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-[#FAFAF9] border-b border-[#E7E5E4]">
                            <th className="px-4 py-3 text-[#78716C] font-semibold text-xs uppercase tracking-wider">Customer</th>
                            <th className="px-4 py-3 text-[#78716C] font-semibold text-xs uppercase tracking-wider">Packages</th>
                            <th className="px-4 py-3 text-[#78716C] font-semibold text-xs uppercase tracking-wider">Total Price</th>
                            <th className="px-4 py-3 text-[#78716C] font-semibold text-xs uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-150">
                                <td className="px-4 py-3">
                                    <div className="font-semibold text-[#1A1C1C]">{order.customerName}</div>
                                    <div className="text-[#78716C] text-xs">{order.customerEmail}</div>
                                </td>
                                <td className="px-4 py-3 text-[#1A1C1C] font-medium">{order.totalPackage}</td>
                                <td className="px-4 py-3 font-semibold text-[#1A1C1C]">{order.totalPrice} SEK</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                                        order.status === "delivered" ? "bg-green-100 text-green-800" :
                                        order.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {meta.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-3 py-1.5 bg-white border border-[#E7E5E4] rounded-lg text-xs font-medium hover:bg-[#F5F5F4] disabled:opacity-50 transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-xs text-[#78716C]">
                        Page {page} of {meta.totalPages}
                    </span>
                    <button
                        disabled={page === meta.totalPages}
                        onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
                        className="px-3 py-1.5 bg-white border border-[#E7E5E4] rounded-lg text-xs font-medium hover:bg-[#F5F5F4] disabled:opacity-50 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

const SellersTable = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data: response, isLoading } = useGetSuperAdminSellersQuery({ page, limit });
    const sellers = response?.data || [];
    const meta = response?.meta || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
    };

    const [selectedSeller, setSelectedSeller] = useState<TSellerListItem | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (id: string, link: string) => {
        if (!link || link === "N/A") return;
        navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const startIdx = (page - 1) * limit + 1;
    const endIdx = Math.min(page * limit, meta.total);

    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">All Sellers</h2>
                    <p className="text-[#78716C] text-sm mt-1">LIVE OVERVIEW</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-[#D97706] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : sellers.length === 0 ? (
                    <div className="text-center py-20 text-[#78716C]">
                        No sellers registered in the system yet.
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#FAFAF9]">
                                <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SELLER NAME</th>
                                <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GROUP</th>
                                <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ORDERS</th>
                                <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PACKAGES</th>
                                <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                                <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SALES LINK</th>
                                <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellers.map((seller) => (
                                <tr key={seller._id} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="w-10 h-10 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-sm">{seller.code}</span>
                                            <div>
                                                <div className="text-[#1A1C1C] font-medium">{seller.name}</div>
                                                <div className="text-[#78716C] text-sm">{seller.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-[#1A1C1C] font-medium">{seller.group}</td>
                                    <td className="px-4 py-4 text-[#1A1C1C] font-medium">{seller.orders}</td>
                                    <td className="px-4 py-4 text-[#1A1C1C] font-medium">{seller.packages}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>{seller.status}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        {seller.salesLink === "N/A" ? (
                                            <span className="text-gray-400 text-sm">N/A</span>
                                        ) : (
                                            <button 
                                                onClick={() => handleCopy(seller._id, seller.salesLink)}
                                                className="flex items-center gap-1.5 text-[#D97706] hover:text-[#7C5800] transition-colors font-medium text-sm"
                                            >
                                                {copiedId === seller._id ? (
                                                    <>
                                                        <Check size={14} className="text-green-600" />
                                                        <span className="text-green-600">Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={14} />
                                                        <span>Copy Link</span>
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        <button 
                                            onClick={() => setSelectedSeller(seller)}
                                            className="text-[#D97706] hover:underline text-sm font-semibold"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {!isLoading && meta.total > 0 && (
                <div className="flex items-center justify-between mt-6">
                    <div className="text-[#78716C] text-sm uppercase">
                        SHOWING {startIdx} TO {endIdx} OF {meta.total} SELLERS
                    </div>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                            <button 
                                key={p} 
                                onClick={() => setPage(p)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${p === page ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* View Modal */}
            {selectedSeller && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm transition-all duration-300">
                    <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto flex flex-col p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-4 mb-6">
                            <div className="flex items-center gap-3">
                                <span className="w-12 h-12 rounded-xl bg-[#D97706] text-white flex items-center justify-center font-bold text-lg">
                                    {selectedSeller.code}
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold text-[#1A1C1C]">{selectedSeller.name}</h3>
                                    <p className="text-sm text-[#78716C]">{selectedSeller.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedSeller(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#78716C] hover:text-[#1C1917] transition-colors font-bold text-lg"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Content Grid (Group Left, Campaign Right) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            {/* Left side: Group Details */}
                            <div className="bg-[#FAFAF9] p-5 rounded-xl border border-[#E7E5E4]">
                                <h4 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-4">Group Details</h4>
                                {selectedSeller.groupDetails ? (
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-xs text-[#78716C] block uppercase font-medium">Group Name</span>
                                            <span className="font-semibold text-[#1A1C1C] mt-1 block">{selectedSeller.groupDetails.name}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-[#78716C] block uppercase font-medium">Group Code</span>
                                            <span className="font-mono bg-[#E7E5E4] px-1.5 py-0.5 rounded text-xs text-[#1C1917] font-semibold mt-1 inline-block">
                                                {selectedSeller.groupDetails.code}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-[#78716C] block uppercase font-medium">Goal Amount</span>
                                            <span className="font-semibold text-[#1A1C1C] mt-1 block">{selectedSeller.groupDetails.goal.toLocaleString()} SEK</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-[#78716C] block uppercase font-medium">End Date</span>
                                            <span className="font-semibold text-[#1A1C1C] mt-1 block">
                                                {new Date(selectedSeller.groupDetails.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-[#78716C]">No group assigned to this seller.</p>
                                )}
                            </div>

                            {/* Right side: Campaign Details */}
                            <div className="bg-[#FAFAF9] p-5 rounded-xl border border-[#E7E5E4]">
                                <h4 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-4">Campaign Details</h4>
                                {selectedSeller.campaignDetails ? (
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-xs text-[#78716C] block uppercase font-medium">Campaign Name</span>
                                            <span className="font-semibold text-[#1A1C1C] mt-1 block">{selectedSeller.campaignDetails.name}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-[#78716C] block uppercase font-medium">Campaign Code</span>
                                            <span className="font-mono bg-[#E7E5E4] px-1.5 py-0.5 rounded text-xs text-[#1C1917] font-semibold mt-1 inline-block">
                                                {selectedSeller.campaignDetails.code}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-[#78716C] block uppercase font-medium">Target Sales</span>
                                            <span className="font-semibold text-[#1A1C1C] mt-1 block">{selectedSeller.campaignDetails.target.toLocaleString()} SEK</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-[#78716C] block uppercase font-medium">End Date</span>
                                            <span className="font-semibold text-[#1A1C1C] mt-1 block">
                                                {new Date(selectedSeller.campaignDetails.endDate).toLocaleDateString()}
                                            </span>
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
                            <SellerCampaignOrders 
                                memberId={selectedSeller._id} 
                                campaignId={selectedSeller.campaignDetails?._id} 
                            />
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end pt-4 border-t border-[#F5F5F4] mt-auto">
                            <button
                                onClick={() => setSelectedSeller(null)}
                                className="px-5 py-2.5 bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#1A1C1C] font-semibold rounded-xl border border-[#E7E5E4] transition-colors duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellersTable;
