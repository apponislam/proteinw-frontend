"use client";

import React from "react";
import StoreProducts from "@/components/dashboard/SellerAdmin/storefront/StoreProducts";

const Page = () => {
    return (
        <div>
            <div>
                <h1 className="text-sm text-[#7C5800] mb-3 uppercase font-medium">STOREFRONT</h1>
                <h2 className="text-5xl text-[#1A1C1C] mb-3">Your Shop Collection</h2>
                <p className="text-[#78716C] text-lg">Browse all products available for your campaign.</p>
            </div>
            <StoreProducts />
        </div>
    );
};

export default Page;
