"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Package, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";
import { useGetProductsByCampaignQuery } from "@/redux/features/campaignProduct/campaignProductApi";

interface ProductsListProps {
    campaignId: string;
    fallbackProducts?: any[];
    onTotalCount?: (total: number) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ campaignId, fallbackProducts = [], onTotalCount }) => {
    const [page, setPage] = useState(1);
    const limit = 5;

    const { data: response, isLoading, isFetching } = useGetProductsByCampaignQuery(
        { campaignId, page, limit },
        { skip: !campaignId }
    );

    const products = response?.data || fallbackProducts;
    const meta = response?.meta;

    useEffect(() => {
        if (meta?.total !== undefined && onTotalCount) {
            onTotalCount(meta.total);
        }
    }, [meta?.total, onTotalCount]);

    if (isLoading) {
        return (
            <div className="p-8 flex flex-col items-center justify-center gap-2 text-[#78716C]">
                <Loader2 className="w-6 h-6 animate-spin text-[#D97706]" />
                <p className="text-xs">Loading campaign products...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return <div className="p-8 text-center text-sm text-[#78716C]">No products associated with this campaign.</div>;
    }

    return (
        <div className="relative">
            {isFetching && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <Loader2 className="w-6 h-6 animate-spin text-[#D97706]" />
                </div>
            )}
            <div className="divide-y divide-[#E7E5E4]">
                {products.map((product: any) => (
                    <div key={product._id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-[#FCFBFA] transition-colors">
                        <div className="w-14 h-14 relative rounded-lg bg-[#F3F3F3] border border-[#E7E5E4] overflow-hidden flex items-center justify-center shrink-0">
                            {product.productImage ? (
                                <Image src={getImageUrl(product.productImage)} alt={product.name} fill className="object-cover" />
                            ) : (
                                <Package className="text-[#A8A29E]" size={24} />
                            )}
                        </div>
                        <div className="grow min-w-0">
                            <h4 className="font-bold text-base text-[#1A1C1C] truncate">{product.name}</h4>
                            <p className="text-xs text-[#78716C] uppercase font-semibold mt-0.5">{product.category}</p>
                        </div>
                        <div className="flex items-center gap-6 sm:gap-12 shrink-0 w-full sm:w-auto justify-between sm:justify-end mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-[#E7E5E4]">
                            <div>
                                <span className="block text-[10px] text-[#78716C] font-semibold uppercase">Price</span>
                                <span className="text-sm font-bold text-[#1A1C1C]">SEK {product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
                <div className="p-4 bg-[#FAF9F6] border-t border-[#E7E5E4] flex items-center justify-between">
                    <p className="text-xs text-[#78716C]">
                        Showing <span className="font-bold text-[#1A1C1C]">{(page - 1) * limit + 1}</span> to{" "}
                        <span className="font-bold text-[#1A1C1C]">{Math.min(page * limit, meta.total)}</span> of{" "}
                        <span className="font-bold text-[#1A1C1C]">{meta.total}</span> products
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={!meta.hasPrev || isFetching}
                            className="p-1.5 rounded-md border border-[#E7E5E4] bg-white text-[#1A1C1C] hover:bg-[#F3F3F3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-xs font-semibold text-[#1A1C1C] px-2">
                            Page {page} of {meta.totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={!meta.hasNext || isFetching}
                            className="p-1.5 rounded-md border border-[#E7E5E4] bg-white text-[#1A1C1C] hover:bg-[#F3F3F3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsList;
