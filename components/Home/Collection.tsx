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
                        <h2 className="text-xs sm:text-sm lg:text-[14px] text-[#7C5800] tracking-widest">SORTIMENTET</h2>

                        <p className="mt-2 text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#1A1C1C] leading-tight">Kvalitet i varje detalj.</p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-[18px] max-w-2xl leading-relaxed">Vi samarbetar med svensk erfarenhet med fokus på hållbarhet och tidlös design. Våra produkter säljer sig själva.</p>
                    </div>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* LEFT BIG CARD */}
                    <div className="relative h-105 sm:h-130 lg:h-187.5 rounded-3xl overflow-hidden group">
                        <Image src="/products/product1.png" alt="Doftljus" fill className="object-cover group-hover:scale-105 transition duration-500" />

                        <div className="absolute inset-0 bg-black/30 flex items-end p-6 lg:p-10">
                            <div>
                                <h3 className="text-xl lg:text-3xl font-bold text-white mb-2">Kvalitet i varje detalj</h3>
                                <p className="text-white/80 text-sm">Svenska kvalitetsprodukter</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="grid grid-rows-2 gap-6 lg:gap-8">
                        {/* TOP RIGHT */}
                        <div className="relative h-65 sm:h-75 lg:h-90 rounded-3xl overflow-hidden group">
                            <Image src="/products/product2.png" alt="Doftpinnar" fill className="object-cover group-hover:scale-105 transition duration-500" />

                            <div className="absolute inset-0 bg-black/30 flex items-end p-6 lg:p-8">
                                <div>
                                    <h3 className="text-lg lg:text-2xl font-bold text-white">Doftpinnar</h3>
                                    <p className="text-white/80 text-sm">Naturliga och väldoftande dofter.</p>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM RIGHT */}
                        <div className="relative h-65 sm:h-75 lg:h-90 rounded-3xl overflow-hidden group">
                            <Image src="/products/product3.png" alt="Ljus och strumpor" fill className="object-cover group-hover:scale-105 transition duration-500" />

                            <div className="absolute inset-0 bg-black/30 flex items-end p-6 lg:p-8">
                                <div>
                                    <h3 className="text-lg lg:text-2xl font-bold text-white">Handgjorda ljus & Strumpor</h3>
                                    <p className="text-white/80 text-sm">Mjuk och hållbar komfort.</p>
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
