"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Search, Check, Loader2, Package } from "lucide-react";
import { toast } from "sonner";
import { getImageUrl } from "@/utils/getImageUrl";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import {
    useAddMultipleProductsToCampaignMutation,
    useRemoveMultipleProductsFromCampaignMutation,
} from "@/redux/features/campaignProduct/campaignProductApi";

interface ManageProductsModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string;
    initialProducts?: any[];
}

const ManageProductsModal: React.FC<ManageProductsModalProps> = ({
    isOpen,
    onClose,
    campaignId,
    initialProducts = [],
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [accumulatedProducts, setAccumulatedProducts] = useState<any[]>([]);

    const [addMultipleProducts, { isLoading: isAdding }] = useAddMultipleProductsToCampaignMutation();
    const [removeMultipleProducts, { isLoading: isRemoving }] = useRemoveMultipleProductsFromCampaignMutation();

    const { data: allProductsResponse, isFetching: isFetchingProducts } = useGetAllProductsQuery(
        { page, limit: 8 },
        { skip: !isOpen }
    );

    useEffect(() => {
        if (isOpen) {
            setPage(1);
            setAccumulatedProducts([]);
            setSelectedProductIds(initialProducts.map((p: any) => p._id || ""));
            setSearchTerm("");
        }
    }, [isOpen, initialProducts]);

    useEffect(() => {
        if (allProductsResponse?.data) {
            if (page === 1) {
                setAccumulatedProducts(allProductsResponse.data);
            } else {
                setAccumulatedProducts((prev) => {
                    const existingIds = new Set(prev.map((p) => p._id));
                    const newItems = allProductsResponse.data.filter((p: any) => !existingIds.has(p._id));
                    return [...prev, ...newItems];
                });
            }
        }
    }, [allProductsResponse, page]);

    if (!isOpen) return null;

    const hasNextPage = allProductsResponse?.meta?.hasNext || false;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 80) {
            if (hasNextPage && !isFetchingProducts) {
                setPage((prev) => prev + 1);
            }
        }
    };

    const handleToggleProduct = (productId: string) => {
        setSelectedProductIds((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
    };

    const handleSave = async () => {
        const initialIds = initialProducts.map((p: any) => p._id || "");
        const additions = selectedProductIds.filter((id) => !initialIds.includes(id));
        const deletions = initialIds.filter((id) => !selectedProductIds.includes(id));

        try {
            if (additions.length > 0) {
                await addMultipleProducts({ campaignId, productIds: additions }).unwrap();
            }
            if (deletions.length > 0) {
                await removeMultipleProducts({ campaignId, productIds: deletions }).unwrap();
            }
            toast.success("Campaign products updated successfully!");
            onClose();
        } catch (err) {
            console.error("Failed to update campaign products:", err);
            toast.error("Failed to update products. Please try again.");
        }
    };

    const filteredProducts = accumulatedProducts.filter(
        (product: any) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-[#E7E5E4] flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[#E7E5E4] flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#1A1C1C]">Manage Campaign Products</h3>
                    <button onClick={onClose} className="p-1 hover:bg-[#F3F3F3] rounded-lg transition-colors text-[#78716C] cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="px-6 pt-4">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" size={16} />
                        <input
                            type="text"
                            placeholder="Search products by name or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#F3F3F3] border border-[#E7E5E4] rounded-xl text-sm focus:outline-none focus:border-[#D97706] transition-all"
                        />
                    </div>
                </div>

                {/* Body - Lazy Loading Product List */}
                <div onScroll={handleScroll} className="p-6 overflow-y-auto space-y-3 grow min-h-0">
                    {accumulatedProducts.length === 0 && isFetchingProducts ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="animate-spin text-[#D97706]" size={24} />
                            <span className="text-sm text-[#78716C] ml-2">Loading products...</span>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center text-sm text-[#78716C] py-8">No products found matching your search.</div>
                    ) : (
                        <>
                            {filteredProducts.map((product: any) => {
                                const isSelected = selectedProductIds.includes(product._id || "");
                                return (
                                    <div
                                        key={product._id}
                                        onClick={() => handleToggleProduct(product._id || "")}
                                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                            isSelected ? "border-[#D97706] bg-[#FCFBFA]" : "border-[#E7E5E4] bg-white hover:bg-[#F3F3F3]"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 relative rounded-lg bg-[#F3F3F3] border border-[#E7E5E4] overflow-hidden flex items-center justify-center shrink-0">
                                                {product.productImage ? (
                                                    <Image src={getImageUrl(product.productImage)} alt={product.name} fill className="object-cover" />
                                                ) : (
                                                    <Package className="text-[#A8A29E]" size={18} />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-sm text-[#1A1C1C] truncate">{product.name}</h4>
                                                <p className="text-xs text-[#78716C] mt-0.5">
                                                    SEK {product.price} • {product.category}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                                isSelected ? "bg-[#D97706] border-[#D97706] text-white" : "border-[#A8A29E] bg-white"
                                            }`}
                                        >
                                            {isSelected && <Check size={14} strokeWidth={3} />}
                                        </div>
                                    </div>
                                );
                            })}
                            {isFetchingProducts && (
                                <div className="flex items-center justify-center py-4">
                                    <Loader2 className="animate-spin text-[#D97706]" size={20} />
                                    <span className="text-xs text-[#78716C] ml-2">Loading more...</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#E7E5E4] flex items-center justify-between bg-[#F8F6F4]">
                    <span className="text-xs font-semibold text-[#78716C]">{selectedProductIds.length} products selected</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-[#E7E5E4] hover:bg-[#F3F3F3] text-sm font-semibold rounded-xl transition-all cursor-pointer text-[#1A1C1C]"
                            disabled={isAdding || isRemoving}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-5 py-2 bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                            disabled={isAdding || isRemoving}
                        >
                            {isAdding || isRemoving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProductsModal;
