import React, { useState } from "react";
import { useGetSuperAdminSellersQuery, TSellerListItem } from "@/redux/features/dashboard/dashboardApi";
import { Check, Copy } from "lucide-react";
import Pagination from "@/components/dashboard/Pagination";
import { SellerDetailsModal } from "./SellerDetailsModal";

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

    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">All Sellers</h2>
                </div>
            </div>

            <div className="overflow-x-auto">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-[#D97706] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : sellers.length === 0 ? (
                    <div className="text-center py-20 text-[#78716C]">No sellers registered in the system yet.</div>
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
                                            <button onClick={() => handleCopy(seller._id, seller.salesLink)} className="flex items-center gap-1.5 text-[#D97706] hover:text-[#7C5800] transition-colors font-medium text-sm cursor-pointer">
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
                                        <button onClick={() => setSelectedSeller(seller)} className="text-[#D97706] hover:underline text-sm font-semibold cursor-pointer">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination Component */}
            <Pagination meta={meta} onPageChange={setPage} itemName="SELLERS" />

            {/* View Modal */}
            {selectedSeller && <SellerDetailsModal seller={selectedSeller} onClose={() => setSelectedSeller(null)} />}
        </div>
    );
};

export default SellersTable;
