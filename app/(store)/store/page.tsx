"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StoreHeader from "@/components/store/StoreHeader";
import StoreHeroArea from "@/components/store/StoreHeroArea";
import StoreOrder from "@/components/store/StoreOrder";
import StoreProducts from "@/components/store/StoreProducts";
import { useGetStoreInfoQuery } from "@/redux/features/dashboard/dashboardApi";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const StoreContent = () => {
    const searchParams = useSearchParams();
    const campaign = searchParams.get("campaign") || "";
    const referral = searchParams.get("referral") || "";

    const { data: storeInfo, isLoading } = useGetStoreInfoQuery(
        { campaign, referral },
        { skip: !campaign || !referral }
    );

    // If campaign or referral is missing, or query returned validation false
    const isInvalid = !campaign || !referral || (storeInfo && storeInfo.validation === false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-center items-center">
                <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-semibold text-lg animate-pulse">Loading digital store...</p>
            </div>
        );
    }

    if (isInvalid) {
        return (
            <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-center items-center px-4">
                <div className="bg-white p-8 md:p-12 shadow-[0px_16px_36px_rgba(0,0,0,0.05)] rounded-[32px] max-w-md w-full text-center space-y-6 border border-gray-100">
                    <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle size={36} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Invalid Store Link</h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            This fundraising link is invalid, incomplete, or the campaign is no longer active. Please contact your seller to get the correct link.
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link href="/" className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white hover:from-[#8B6500] hover:to-[#FFCC00] transition-all w-full justify-center">
                            <ArrowLeft size={20} />
                            Go Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <StoreHeader />
            <StoreHeroArea />
            <StoreProducts />
            <StoreOrder />
        </>
    );
};

const Page = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-center items-center">
                <p className="text-[#78716C] text-lg">Loading store details...</p>
            </div>
        }>
            <StoreContent />
        </Suspense>
    );
};

export default Page;
