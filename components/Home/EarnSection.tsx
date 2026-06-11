"use client";
import React, { useState } from "react";
import Image from "next/image";

const EarnSection = () => {
    const [groupSize, setGroupSize] = useState(40);
    const [productsPerSeller, setProductsPerSeller] = useState(40);

    const pricePerPackage = 180;
    const totalProducts = groupSize * productsPerSeller;
    const totalProfit = totalProducts * pricePerPackage;

    return (
        <section className="h-screen flex items-center bg-white">
            <div className="container mx-auto px-6">
                {/* Center Box */}
                <div className="bg-white rounded-3xl shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-150">
                    {/* LEFT SIDE */}
                    <div className="p-10 lg:p-14 flex flex-col justify-center">
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-[#1A1C1C]">See how much you can earn.</h2>

                        <p className="text-gray-600 mt-5 text-sm lg:text-base max-w-md mb-8">Input your group size and products per seller to calculate your estimated profit.</p>

                        <div className="space-y-12">
                            {/* SLIDER 1 - Group Size */}
                            <div>
                                <div className="flex justify-between ">
                                    <p className="text-xs tracking-widest font-semibold text-gray-500">GROUP SIZE</p>
                                    <p className="text-sm font-bold text-[#EFAC02]">{groupSize}</p>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="80"
                                    value={groupSize}
                                    onChange={(e) => setGroupSize(Number(e.target.value))}
                                    style={{
                                        background: `linear-gradient(to right, #EFAC02 ${(groupSize / 80) * 100}%, #E5E7EB ${(groupSize / 80) * 100}%)`,
                                    }}
                                    className="w-full h-2 rounded-full appearance-none outline-none    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4    [&::-webkit-slider-thumb]:h-4    [&::-webkit-slider-thumb]:rounded-full    [&::-webkit-slider-thumb]:bg-[#EFAC02]    [&::-webkit-slider-thumb]:shadow-md"
                                />
                            </div>

                            {/* SLIDER 2 - Products Per Seller */}
                            <div>
                                <div className="flex justify-between">
                                    <p className="text-xs tracking-widest font-semibold text-gray-500">PRODUCTS</p>
                                    <p className="text-sm font-bold text-[#7C5800]">{productsPerSeller}</p>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="80"
                                    value={productsPerSeller}
                                    onChange={(e) => setProductsPerSeller(Number(e.target.value))}
                                    style={{
                                        background: `linear-gradient(to right, #7C5800 ${(productsPerSeller / 80) * 100}%, #E5E7EB ${(productsPerSeller / 80) * 100}%)`,
                                    }}
                                    className="w-full h-2 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C5800] [&::-webkit-slider-thumb]:shadow-md"
                                />
                            </div>

                            {/* RESULT CARD */}
                            <div className="bg-linear-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                                <p className="text-xs tracking-widest font-semibold text-gray-500">TOTAL PROFIT</p>

                                <p className="text-5xl font-extrabold text-[#1A1C1C] mt-3">
                                    {totalProfit} <span className="text-2xl">SEK</span>
                                </p>

                                <p className="text-sm text-gray-600 mt-3">
                                    Total products: {totalProducts} at {pricePerPackage} SEK/package
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className="relative h-full min-h-75 lg:min-h-full">
                        <Image src="/howmuchearn.png" alt="Earning" fill className="object-cover" />

                        {/* optional overlay */}
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EarnSection;
