"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
}

interface PaginationProps {
    meta?: PaginationMeta;
    onPageChange: (page: number) => void;
    itemName?: string;
    className?: string;
    maxVisiblePages?: number;
}

const getPaginationRange = (currentPage: number, totalPages: number, maxVisible: number = 5) => {
    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range: (number | string)[] = [];
    const showBoundary = 1; // Always show first and last page

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
        endPage = 4;
    } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
    }

    // Always include page 1
    range.push(1);

    if (startPage > 2) {
        range.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
        range.push(i);
    }

    if (endPage < totalPages - 1) {
        range.push("...");
    }

    // Always include last page
    range.push(totalPages);

    return range;
};

const Pagination: React.FC<PaginationProps> = ({
    meta,
    onPageChange,
    itemName = "ITEMS",
    className = "",
    maxVisiblePages = 5,
}) => {
    if (!meta || meta.total <= 0) return null;

    const page = meta.page || 1;
    const limit = meta.limit || 10;
    const total = meta.total || 0;
    const totalPages = meta.totalPages || Math.ceil(total / limit) || 1;

    const hasPrev = meta.hasPrev !== undefined ? meta.hasPrev : page > 1;
    const hasNext = meta.hasNext !== undefined ? meta.hasNext : page < totalPages;

    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    const paginationRange = getPaginationRange(page, totalPages, maxVisiblePages);

    return (
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 py-3 ${className}`}>
            {/* Info Text */}
            <div className="text-[#78716C] text-xs font-semibold uppercase tracking-wider">
                SHOWING <span className="text-[#1A1C1C] font-bold">{startItem}</span> TO{" "}
                <span className="text-[#1A1C1C] font-bold">{endItem}</span> OF{" "}
                <span className="text-[#1A1C1C] font-bold">{total.toLocaleString()}</span> {itemName}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center gap-1 flex-wrap justify-center">
                    {/* First Page Button */}
                    {page > 2 && (
                        <button
                            onClick={() => onPageChange(1)}
                            className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E7E5E4] hover:bg-[#F5F5F4] transition-all text-[#78716C] cursor-pointer"
                            title="First Page"
                        >
                            <ChevronsLeft size={16} />
                        </button>
                    )}

                    {/* Prev Button */}
                    <button
                        disabled={!hasPrev}
                        onClick={() => onPageChange(page - 1)}
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E7E5E4] hover:bg-[#F5F5F4] disabled:opacity-40 transition-all text-[#78716C] cursor-pointer disabled:cursor-not-allowed"
                        title="Previous Page"
                        aria-label="Previous Page"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {/* Page Numbers */}
                    {paginationRange.map((p, idx) => {
                        if (p === "...") {
                            return (
                                <span key={`ellipsis-${idx}`} className="w-6 h-9 flex items-center justify-center text-[#78716C] text-xs font-bold select-none">
                                    ...
                                </span>
                            );
                        }
                        const isCurrentPage = p === page;
                        return (
                            <button
                                key={`page-${p}`}
                                onClick={() => onPageChange(p as number)}
                                className={`w-9 h-9 px-1 rounded-full flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
                                    isCurrentPage
                                        ? "bg-[#D97706] text-white font-bold shadow-xs scale-105"
                                        : "text-[#78716C] hover:bg-[#F5F5F4] hover:text-[#1A1C1C]"
                                }`}
                            >
                                {p}
                            </button>
                        );
                    })}

                    {/* Next Button */}
                    <button
                        disabled={!hasNext}
                        onClick={() => onPageChange(page + 1)}
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E7E5E4] hover:bg-[#F5F5F4] disabled:opacity-40 transition-all text-[#78716C] cursor-pointer disabled:cursor-not-allowed"
                        title="Next Page"
                        aria-label="Next Page"
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* Last Page Button */}
                    {page < totalPages - 1 && (
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E7E5E4] hover:bg-[#F5F5F4] transition-all text-[#78716C] cursor-pointer"
                            title="Last Page"
                        >
                            <ChevronsRight size={16} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Pagination;
