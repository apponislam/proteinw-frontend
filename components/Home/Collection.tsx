// import React from "react";
// import Image from "next/image";

// const Collection = () => {
//     return (
//         <section className="py-20 bg-white">
//             <div className="container mx-auto px-6">
//                 {/* Heading */}
//                 <div className="mb-12">
//                     <h2 className="text-4xl font-bold text-gray-900">THE COLLECTION</h2>
//                     <p className="text-gray-600 mt-3 max-w-2xl">We only partner with Nordic artisans who value sustainability and timeless design. Our products sell themselves.</p>
//                 </div>

//                 {/* Layout */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {/* LEFT BIG CARD */}
//                     <div className="relative lg:col-span-1 h-130 rounded-3xl overflow-hidden group">
//                         <Image src="/products/product1.png" alt="Crafted" fill className="object-cover group-hover:scale-105 transition duration-500" />

//                         <div className="absolute inset-0 bg-black/30 flex items-end p-8">
//                             <div>
//                                 <h3 className="text-2xl font-bold text-white mb-2">Crafted for Quality</h3>
//                                 <p className="text-white/80 text-sm">Premium Nordic artisan products</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT SIDE */}
//                     <div className="lg:col-span-1 grid grid-rows-1 gap-6">
//                         {/* TOP RIGHT */}
//                         <div className="relative h-62.5 rounded-3xl overflow-hidden group">
//                             <Image src="/products/product2.png" alt="Diffusers" fill className="object-cover group-hover:scale-105 transition duration-500" />

//                             <div className="absolute inset-0 bg-black/30 flex items-end p-6">
//                                 <div>
//                                     <h3 className="text-xl font-bold text-white">Reed Diffusers</h3>
//                                     <p className="text-white/80 text-sm">Long-lasting natural fragrances.</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* BOTTOM RIGHT */}
//                         <div className="relative h-62.5 rounded-3xl overflow-hidden group">
//                             <Image src="/products/product3.png" alt="Candles" fill className="object-cover group-hover:scale-105 transition duration-500" />

//                             <div className="absolute inset-0 bg-black/30 flex items-end p-6">
//                                 <div>
//                                     <h3 className="text-xl font-bold text-white">Artisan Candles & Bamboo Socks</h3>
//                                     <p className="text-white/80 text-sm">Ultra-soft, sustainable comfort.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Collection;

import React from "react";
import Image from "next/image";

const Collection = () => {
    return (
        <section className="min-h-screen py-16 lg:py-24 bg-white flex items-center">
            <div className="container mx-auto px-6 w-full">
                {/* Heading */}
                <div className="mb-14 lg:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                    {/* LEFT SIDE */}
                    <div>
                        <h2 className="text-xs sm:text-sm lg:text-[14px] text-[#7C5800] tracking-widest">THE COLLECTION</h2>

                        <p className="mt-2 text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#1A1C1C] leading-tight">Crafted for Quality.</p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-[18px] max-w-2xl leading-relaxed">We only partner with Nordic artisans who value sustainability and timeless design. Our products sell themselves.</p>
                    </div>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* LEFT BIG CARD */}
                    <div className="relative h-105 sm:h-130 lg:h-187.5 rounded-3xl overflow-hidden group">
                        <Image src="/products/product1.png" alt="Crafted" fill className="object-cover group-hover:scale-105 transition duration-500" />

                        <div className="absolute inset-0 bg-black/30 flex items-end p-6 lg:p-10">
                            <div>
                                <h3 className="text-xl lg:text-3xl font-bold text-white mb-2">Crafted for Quality</h3>
                                <p className="text-white/80 text-sm">Premium Nordic artisan products</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="grid grid-rows-2 gap-6 lg:gap-8">
                        {/* TOP RIGHT */}
                        <div className="relative h-65 sm:h-75 lg:h-90 rounded-3xl overflow-hidden group">
                            <Image src="/products/product2.png" alt="Diffusers" fill className="object-cover group-hover:scale-105 transition duration-500" />

                            <div className="absolute inset-0 bg-black/30 flex items-end p-6 lg:p-8">
                                <div>
                                    <h3 className="text-lg lg:text-2xl font-bold text-white">Reed Diffusers</h3>
                                    <p className="text-white/80 text-sm">Long-lasting natural fragrances.</p>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM RIGHT */}
                        <div className="relative h-65 sm:h-75 lg:h-90 rounded-3xl overflow-hidden group">
                            <Image src="/products/product3.png" alt="Candles" fill className="object-cover group-hover:scale-105 transition duration-500" />

                            <div className="absolute inset-0 bg-black/30 flex items-end p-6 lg:p-8">
                                <div>
                                    <h3 className="text-lg lg:text-2xl font-bold text-white">Artisan Candles & Bamboo Socks</h3>
                                    <p className="text-white/80 text-sm">Ultra-soft, sustainable comfort.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Collection;
