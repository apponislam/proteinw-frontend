"use client";

import React, { useState, useEffect } from "react";
import StoreProduct from "./StoreProduct";
import { useGetProductsByCampaignQuery } from "@/redux/features/campaignProduct/campaignProductApi";
import { getImageUrl } from "@/utils/getImageUrl";
import { Loader2 } from "lucide-react";
import ProductDetailModal from "@/components/products/ProductDetailModal";

interface StoreProductsProps {
    campaignId?: string;
}

const StoreProducts: React.FC<StoreProductsProps> = ({ campaignId }) => {
    // Lazy loading state by increasing limit
    const [limit, setLimit] = useState(6);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    const {
        data: response,
        isFetching,
        isLoading,
    } = useGetProductsByCampaignQuery(
        {
            campaignId: campaignId || "",
            page: 1,
            limit,
        },
        {
            skip: !campaignId,
        }
    );

    const products = response?.data || [];
    const hasNextPage = response?.meta?.hasNext || false;

    // Window scroll listener to increase limit
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const clientHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight;

            if (scrollTop + clientHeight >= scrollHeight - 300 && hasNextPage && !isFetching) {
                setLimit((prev) => prev + 6);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage, isFetching]);

    if (isLoading && products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="animate-spin text-[#D97706]" size={32} />
                <p className="text-sm text-[#78716C]">Loading campaign storefront...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return <div className="mt-8 text-center py-16 text-sm text-[#78716C] bg-white rounded-3xl border border-[#E7E5E4] shadow-xs">No products found in your campaign. Please contact your campaign admin to add products.</div>;
    }

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, idx) => (
                    <StoreProduct
                        key={product._id || idx}
                        isNewCollection={idx === 0} // visual showcase
                        isBestseller={idx === 1} // visual showcase
                        name={product.name}
                        price={`${product.price} SEK`}
                        description={product.shortDescription}
                        image={getImageUrl(product.productImage)}
                        onViewDetails={() =>
                            setSelectedProduct({
                                image: getImageUrl(product.productImage),
                                title: product.name,
                                price: `${product.price} SEK`,
                                description: product.shortDescription,
                                marginBenefit: product.marginBenefit,
                                qualityHighlight: product.qualityHighlight,
                                ecoHighlight: product.ecoHighlight,
                            })
                        }
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
            <ProductDetailModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} />
        </div>
    );
};

export default StoreProducts;
