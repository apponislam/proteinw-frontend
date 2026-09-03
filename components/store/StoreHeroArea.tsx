"use client";

import React, { Suspense } from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetStoreInfoQuery } from "@/redux/features/dashboard/dashboardApi";

const StoreHeroContent = () => {
    const searchParams = useSearchParams();
    const campaign = searchParams.get("campaign") || "";
    const referral = searchParams.get("referral") || "";

    const { data: storeInfo } = useGetStoreInfoQuery({ campaign, referral }, { skip: !campaign || !referral });

    const sellerName = storeInfo?.validation ? storeInfo.sellerName : "Unknown";
    const campaignName = storeInfo?.validation ? storeInfo.campaignName : "Unknown";
    const groupName = storeInfo?.validation ? storeInfo.groupName : "Unknown";

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="min-h-0 py-4 sm:py-8 lg:py-12 lg:min-h-[calc(100vh-100px)] flex items-center">
                <div className="relative flex flex-col lg:flex-row items-center w-full">
                    <div className="bg-[#FFFFFFCC] p-5 sm:p-8 md:p-12 shadow-[0px_12px_32px_rgba(26,28,28,0.06)] backdrop-blur-3xl rounded-[24px] w-full lg:w-162.5 lg:relative lg:z-10 lg:-mr-12.5 space-y-4 sm:space-y-6 mb-6 lg:mb-0">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold wrap-break-word">Welcome to {sellerName}'s digital store</h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                            Hi! I'm fundraising for <span className="text-[#7C5800] font-semibold">{campaignName}</span>. Your support helps us create memories that will last a lifetime. Explore our {groupName} collection below.
                        </p>
                        <Link href="#products-section" className="flex items-center w-fit gap-2 sm:gap-3 font-bold px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white hover:from-[#8B6500] hover:to-[#FFCC00] transition-all">
                            Shop Now <ArrowDown size={18} />
                        </Link>
                    </div>
                    <div className="w-full lg:flex-1">
                        <Image src="/store/storepic.png" alt="Hero" width={1280} height={500} className="w-full h-52 sm:h-72 md:h-96 lg:h-125 object-cover rounded-[24px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StoreHeroArea = () => {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="min-h-screen flex items-center justify-center">
                        <p className="text-[#78716C] text-lg">Loading store details...</p>
                    </div>
                </div>
            }
        >
            <StoreHeroContent />
        </Suspense>
    );
};

export default StoreHeroArea;
