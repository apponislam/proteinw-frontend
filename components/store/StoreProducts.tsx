"use client";

import React, { Suspense, useState, useEffect } from "react";
import StoreProductCard from "./StoreProductCard";
import { useSearchParams } from "next/navigation";
import { useGetStoreInfoQuery } from "@/redux/features/dashboard/dashboardApi";
import { useGetProductsByCampaignCodeQuery } from "@/redux/features/campaignProduct/campaignProductApi";
import { getImageUrl } from "@/utils/getImageUrl";
import { TProduct } from "@/redux/features/product/productApi";

const StoreProductsContent = () => {
    const searchParams = useSearchParams();
    const campaign = searchParams.get("campaign") || "";
    const referral = searchParams.get("referral") || "";

    const [page, setPage] = useState(1);
    const [allProducts, setAllProducts] = useState<TProduct[]>([]);

    const { data: storeInfo } = useGetStoreInfoQuery({ campaign, referral }, { skip: !campaign || !referral });

    const { data: campaignProductsData, isFetching } = useGetProductsByCampaignCodeQuery({ code: campaign, page, limit: 6 }, { skip: !campaign });

    // Reset list when campaign changes
    useEffect(() => {
        setAllProducts([]);
        setPage(1);
    }, [campaign]);

    // Append newly loaded products to existing list
    useEffect(() => {
        if (campaignProductsData?.data) {
            setAllProducts((prev) => {
                const existingIds = new Set(prev.map((p) => p._id));
                const newProducts = campaignProductsData.data.filter((p) => p._id && !existingIds.has(p._id));
                return [...prev, ...newProducts];
            });
        }
    }, [campaignProductsData]);

    const adminName = storeInfo?.validation ? storeInfo.adminName : "Martin Andersson";
    const firstName = adminName?.split(" ")[0];

    const totalCount = storeInfo?.campaignProductCount ?? allProducts.length;
    const hasNext = campaignProductsData?.meta?.hasNext || false;

    const handleLoadMore = () => {
        if (hasNext && !isFetching) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div id="products-section" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
            <div className="flex items-center justify-between gap-8 mb-12">
                <h2 className="text-3xl font-bold text-black">{firstName}'s Collection</h2>
                <span className="flex-1 h-0.5 bg-[#EEEEEE]"></span>
                <p className="text-[#A8A29E] whitespace-nowrap">{totalCount} PRODUCTS AVAILABLE</p>
            </div>
            {allProducts.length === 0 && !isFetching ? (
                <div className="text-center py-12">
                    <p className="text-[#78716C] text-lg">No products available in this campaign.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allProducts.map((product, index) => (
                            <StoreProductCard key={`${product._id}-${index}`} productId={product._id || ""} image={getImageUrl(product.productImage) || "/products/product1.png"} title={product.name} price={`${product.price} SEK`} rawPrice={product.price} description={product.shortDescription} adminName={adminName} />
                        ))}
                    </div>
                    {hasNext && (
                        <div className="flex justify-center mt-12">
                            <button onClick={handleLoadMore} disabled={isFetching} className="font-bold px-8 py-3 rounded-[24px] border border-[#7C5800] text-[#7C5800] hover:bg-[#7C5800] hover:text-white transition-all disabled:opacity-50">
                                {isFetching ? "Loading..." : "See More"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const StoreProducts = () => {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 text-center">
                    <p className="text-[#78716C] text-lg">Loading products...</p>
                </div>
            }
        >
            <StoreProductsContent />
        </Suspense>
    );
};

export default StoreProducts;
