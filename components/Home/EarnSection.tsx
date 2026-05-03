"use client";
import React, { useState } from "react";
import Image from "next/image";

const EarnSection = () => {
    const [count, setCount] = useState(50);
    const [price, setPrice] = useState(20);

    // profit logic
    const getProfit = () => {
        if (count <= 149) return 40;
        if (count <= 224) return 45;
        return 50;
    };

    const profitPercent = getProfit();
    const total = count * price;
    const profit = (total * profitPercent) / 100;

    return (
        <section className="h-screen flex items-center bg-white">
            <div className="container mx-auto px-6">
                {/* Center Box */}
                <div className="bg-white rounded-3xl shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-150">
                    {/* LEFT SIDE */}
                    <div className="p-10 lg:p-14 flex flex-col justify-center">
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-[#1A1C1C]">See how much you can earn.</h2>

                        <p className="text-gray-600 mt-5 text-sm lg:text-base max-w-md mb-8">Input your group size and goal to calculate your estimated payout. Most classes earn enough for their trip in just 2 weeks.</p>

                        {/* Buttons */}
                        {/* <div className="mt-10 space-y-3">
                            <p className="text-sm font-semibold text-gray-500">GROUP SIZE</p>

                            <div className="flex gap-3 flex-wrap">
                                <button className="px-6 py-3 rounded-2xl border border-gray-200 hover:border-[#EFAC02] transition">5 Product</button>

                                <button className="px-6 py-3 rounded-2xl border border-gray-200 hover:border-[#EFAC02] transition">25 Product</button>

                                <button className="px-6 py-3 rounded-2xl border border-gray-200 hover:border-[#EFAC02] transition">100 Product</button>
                            </div>
                        </div> */}

                        {/* Profit */}
                        {/* <div className="mt-10">
                            <p className="text-sm font-semibold text-gray-500">ESTIMATED PROFIT</p>

                            <p className="text-4xl lg:text-5xl font-extrabold text-[#1A1C1C] mt-2">12,500 SEK</p>
                        </div> */}

                        {/* CTA */}
                        {/* <button className="mt-10 bg-[#EFAC02] hover:opacity-90 transition text-white px-8 py-4 rounded-2xl font-semibold w-fit">Start Selling Now</button> */}

                        <div className="space-y-12">
                            {/* SLIDER 1 */}
                            <div>
                                <div className="flex justify-between ">
                                    <p className="text-xs tracking-widest font-semibold text-gray-500">PRODUCT COUNT</p>
                                    <p className="text-sm font-bold text-[#EFAC02]">{count}</p>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="300"
                                    value={count}
                                    onChange={(e) => setCount(Number(e.target.value))}
                                    style={{
                                        background: `linear-gradient(to right, #EFAC02 ${(count / 300) * 100}%, #E5E7EB ${(count / 300) * 100}%)`,
                                    }}
                                    className="w-full h-2 rounded-full appearance-none outline-none    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4    [&::-webkit-slider-thumb]:h-4    [&::-webkit-slider-thumb]:rounded-full    [&::-webkit-slider-thumb]:bg-[#EFAC02]    [&::-webkit-slider-thumb]:shadow-md"
                                />
                            </div>

                            {/* SLIDER 2 */}
                            <div>
                                <div className="flex justify-between">
                                    <p className="text-xs tracking-widest font-semibold text-gray-500">PRODUCT PRICE</p>
                                    <p className="text-sm font-bold text-[#7C5800]">{price} SEK</p>
                                </div>

                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    style={{
                                        background: `linear-gradient(to right, #7C5800 ${(price / 100) * 100}%, #E5E7EB ${(price / 100) * 100}%)`,
                                    }}
                                    className="w-full h-2 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C5800] [&::-webkit-slider-thumb]:shadow-md"
                                />
                            </div>

                            {/* RESULT CARD */}
                            <div className="bg-linear-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                                <p className="text-xs tracking-widest font-semibold text-gray-500">ESTIMATED PROFIT</p>

                                <p className="text-5xl font-extrabold text-[#1A1C1C] mt-3">
                                    {Math.round(profit)} <span className="text-2xl">SEK</span>
                                </p>

                                <p className="text-sm text-gray-600 mt-3">{profitPercent}% profit margin on total sales</p>
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
