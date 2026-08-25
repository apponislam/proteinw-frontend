import React, { useState } from "react";
import { useGetSuperAdminSellersQuery, TSellerListItem, TSalesLinkItem } from "@/redux/features/dashboard/dashboardApi";
import Pagination from "@/components/dashboard/Pagination";
import { SellerDetailsModal } from "./SellerDetailsModal";
import { SalesLinksModal } from "./SalesLinksModal";
import { SellerGroupsPopover } from "./SellerGroupsPopover";
import { SellerTableRow } from "./SellerTableRow";

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

    // Sales links modal state
    const [linksModalSeller, setLinksModalSeller] = useState<{
        name: string;
        email: string;
        links: TSalesLinkItem[];
    } | null>(null);

    // Popover portal state
    const [popoverData, setPopoverData] = useState<{
        sellerId: string;
        groups: string[];
        viewportTop: number;
        viewportBottom: number;
        left: number;
    } | null>(null);

    const handleCopy = (id: string, link: string) => {
        if (!link || link === "N/A") return;
        navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleOpenGroups = (sellerId: string, groups: string[], e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (popoverData?.sellerId === sellerId) {
            setPopoverData(null);
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        setPopoverData({
            sellerId,
            groups,
            viewportTop: rect.top,
            viewportBottom: window.innerHeight - rect.bottom,
            left: rect.left,
        });
    };

    const handleMouseEnterGroups = (sellerId: string, groups: string[], e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPopoverData({
            sellerId,
            groups,
            viewportTop: rect.top,
            viewportBottom: window.innerHeight - rect.bottom,
            left: rect.left,
        });
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
                                <SellerTableRow
                                    key={seller._id}
                                    seller={seller}
                                    copiedId={copiedId}
                                    onCopy={handleCopy}
                                    onOpenGroups={handleOpenGroups}
                                    onMouseEnterGroups={handleMouseEnterGroups}
                                    onOpenLinksModal={(name, email, links) => setLinksModalSeller({ name, email, links })}
                                    onViewSeller={setSelectedSeller}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination Component */}
            <Pagination meta={meta} onPageChange={setPage} itemName="SELLERS" />

            {/* View Details Modal */}
            {selectedSeller && <SellerDetailsModal seller={selectedSeller} onClose={() => setSelectedSeller(null)} />}

            {/* All Sales Links Modal */}
            {linksModalSeller && (
                <SalesLinksModal
                    sellerName={linksModalSeller.name}
                    sellerEmail={linksModalSeller.email}
                    links={linksModalSeller.links}
                    onClose={() => setLinksModalSeller(null)}
                />
            )}

            {/* Top-Level Portal Popover */}
            {popoverData && (
                <SellerGroupsPopover
                    groups={popoverData.groups}
                    viewportTop={popoverData.viewportTop}
                    viewportBottom={popoverData.viewportBottom}
                    left={popoverData.left}
                    onClose={() => setPopoverData(null)}
                />
            )}
        </div>
    );
};

export default SellersTable;
