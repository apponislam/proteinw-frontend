"use client";

import React, { useState, useEffect } from "react";
import StoreProduct from "./StoreProduct";
import { useGetMyCampaignProductsQuery } from "@/redux/features/campaignProduct/campaignProductApi";
import { getImageUrl } from "@/utils/getImageUrl";
import { Loader2 } from "lucide-react";
import ProductDetailModal from "@/components/products/ProductDetailModal";

const StoreProducts = () => {
    // Lazy loading state
    const [page, setPage] = useState(1);
    const [accumulatedProducts, setAccumulatedProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    const { data: response, isFetching, isLoading } = useGetMyCampaignProductsQuery({
        page,
        limit: 6,
    });

    // Append items when results arrive
    useEffect(() => {
        if (response?.data) {
            if (page === 1) {
                setAccumulatedProducts(response.data);
            } else {
                setAccumulatedProducts((prev) => {
                    const existingIds = new Set(prev.map((p) => p._id));
                    const newItems = response.data.filter((p) => !existingIds.has(p._id));
                    return [...prev, ...newItems];
                });
            }
        }
    }, [response, page]);

    const hasNextPage = response?.meta?.hasNext || false;

    // Window scroll listener for infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120 &&
                hasNextPage &&
                !isFetching
            ) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage, isFetching]);

    if (isLoading && accumulatedProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="animate-spin text-[#D97706]" size={32} />
                <p className="text-sm text-[#78716C]">Loading campaign storefront...</p>
            </div>
        );
    }

    if (accumulatedProducts.length === 0) {
        return (
            <div className="mt-8 text-center py-16 text-sm text-[#78716C] bg-white rounded-3xl border border-[#E7E5E4] shadow-xs">
                No products found in your campaign. Please contact your campaign admin to add products.
            </div>
        );
    }

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accumulatedProducts.map((product, idx) => (
                    <StoreProduct
                        key={product._id || idx}
                        isNewCollection={idx === 0} // visual showcase
                        isBestseller={idx === 1} // visual showcase
                        name={product.name}
                        price={`${product.price} SEK`}
                        description={product.shortDescription}
                        image={getImageUrl(product.productImage)}
                        onViewDetails={() => setSelectedProduct({
                            image: getImageUrl(product.productImage),
                            title: product.name,
                            price: `${product.price} SEK`,
                            description: product.shortDescription,
                        })}
                    />
                ))}
            </div>

            {isFetching && (
                <div className="flex items-center justify-center py-8 gap-2">
                    <Loader2 className="animate-spin text-[#D97706]" size={20} />
                    <span className="text-xs text-[#78716C]">Loading more products...</span>
                </div>
            )}

            {/* Product Detail Modal */}
            <ProductDetailModal 
                isOpen={!!selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
                product={selectedProduct} 
            />
        </div>
    );
};

export default StoreProducts;
