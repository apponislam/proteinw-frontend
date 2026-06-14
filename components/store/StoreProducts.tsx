"use client";

import React, { Suspense } from "react";
import StoreProductCard from "./StoreProductCard";
import { useSearchParams } from "next/navigation";
import { useGetStoreInfoQuery } from "@/redux/features/dashboard/dashboardApi";
import { useGetProductsByCampaignCodeQuery } from "@/redux/features/campaignProduct/campaignProductApi";
import { getImageUrl } from "@/utils/getImageUrl";

const StoreProductsContent = () => {
    const searchParams = useSearchParams();
    const campaign = searchParams.get("campaign") || "";
    const referral = searchParams.get("referral") || "";

    const { data: storeInfo } = useGetStoreInfoQuery({ campaign, referral }, { skip: !campaign || !referral });

    const { data: campaignProductsData } = useGetProductsByCampaignCodeQuery({ code: campaign }, { skip: !campaign });

    const adminName = storeInfo?.validation ? storeInfo.adminName : "Martin Andersson";
    const firstName = adminName?.split(" ")[0];

    // Dynamic products list
    const products = campaignProductsData?.data || [];
    const totalCount = products.length;

    return (
        <div id="products-section" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
            <div className="flex items-center justify-between gap-8 mb-12">
                <h2 className="text-3xl font-bold text-black">{firstName}'s Collection</h2>
                <span className="flex-1 h-0.5 bg-[#EEEEEE]"></span>
                <p className="text-[#A8A29E] whitespace-nowrap">{totalCount} PRODUCTS AVAILABLE</p>
            </div>
            {totalCount === 0 ? (
                <div className="text-center py-12">
                    <p className="text-[#78716C] text-lg">No products available in this campaign.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <StoreProductCard
                            key={`${product.name}-${index}`}
                            productId={product._id || ""}
                            image={getImageUrl(product.productImage) || "/products/product1.png"}
                            title={product.name}
                            price={`${product.price} SEK`}
                            rawPrice={product.price}
                            description={product.shortDescription}
                            adminName={adminName}
                        />
                    ))}
                </div>
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
