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

    const { data: storeInfo } = useGetStoreInfoQuery(
        { campaign, referral },
        { skip: !campaign || !referral }
    );

    const adminName = storeInfo?.validation ? storeInfo.adminName : "Martin Andersson";
    const campaignName = storeInfo?.validation ? storeInfo.campaignName : "Class 9B's graduation trip";
    const groupName = storeInfo?.validation ? storeInfo.groupName : "Nordic-inspired";

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="min-h-screen flex items-center">
                <div className="relative flex flex-col lg:flex-row items-center w-full">
                    <div className="bg-[#FFFFFFCC] p-6 md:p-12 shadow-[0px_12px_32px_rgba(26,28,28,0.06)] backdrop-blur-3xl rounded-[24px] w-full lg:w-175 lg:relative lg:z-10 lg:-mr-12.5 space-y-6 mb-8 lg:mb-0">
                        <h1 className="text-3xl md:text-5xl font-extrabold">
                            Welcome to {adminName}'s digital store
                        </h1>
                        <p className="text-base md:text-lg">
                            Hi! I'm fundraising for <span className="text-[#7C5800]">{campaignName}</span>. Your support helps us create memories that will last a lifetime. Explore our {groupName} collection below.
                        </p>
                        <Link href="#products-section" className="flex items-center w-fit gap-3 font-bold px-6 py-3 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white hover:from-[#8B6500] hover:to-[#FFCC00] transition-all">
                            Shop Now <ArrowDown />
                        </Link>
                    </div>
                    <div className="w-full lg:flex-1">
                        <Image src="/store/storepic.png" alt="Hero" width={1280} height={500} className="w-full h-75 md:h-100 lg:h-125 object-cover rounded-[24px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StoreHeroArea = () => {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-[#78716C] text-lg">Loading store details...</p>
                </div>
            </div>
        }>
            <StoreHeroContent />
        </Suspense>
    );
};

export default StoreHeroArea;
