import { Box, TabletSmartphone } from "lucide-react";
import Image from "next/image";
import React from "react";

const FundraisingSection = () => {
    return (
        <section className="py-24 bg-[#F3F4F5]">
            <div className="container mx-auto px-6">
                {/* HEADER */}
                <div className="mb-14 lg:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">Det moderna sättet att samla pengar</h2>

                    <p className="text-gray-600 mt-4 text-center">Vi har digitaliserat hela processen så att ni kan fokusera på målet, inte på pappersarbete.</p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* 1st CARD (3/4) */}
                    <div className="lg:col-span-3 bg-white rounded-3xl p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                        <div className="h-14 w-14 bg-[#EFAC021A] flex items-center justify-center rounded-full mb-4">
                            <TabletSmartphone className="text-[#EFAC02] text-xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Smidig digital beställning</h3>

                        <p className="text-gray-600 leading-relaxed">Varje elev får sin egen unika webbshop. Dela länken på sociala medier och se beställningarna rulla in i realtid. Inga säljlappar som försvinner.</p>

                        <div className="mt-6 flex gap-3 text-xs font-bold">
                            <span className="bg-[#8F8F8F1A] text-[#2D2D2D] px-4 py-2 rounded-2xl">INGA BLANKETTER</span>
                            <span className="bg-[#8F8F8F1A] text-[#2D2D2D] px-4 py-2 rounded-2xl">QR-KODER</span>
                        </div>
                    </div>

                    {/* 2nd CARD (1/4) */}
                    <div className="lg:col-span-1 bg-[#EFAC02] rounded-3xl p-10 text-white flex justify-between flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                        <div>
                            <h3 className="text-xl font-bold  mb-4">Hög förtjänst</h3>

                            <p className=" text-sm">Vi erbjuder en av marknadens högsta marginaler. Behåll upp till hälften av försäljningspriset själv.</p>
                        </div>
                        <p className="mt-6  font-bold text-4xl">50% VINST</p>
                        {/* <div className="flex justify-between flex-col"></div> */}
                    </div>

                    {/* 3rd CARD (1/4) */}
                    <div className="lg:col-span-1 bg-[#EFAC02] rounded-3xl p-10 flex justify-between flex-col text-white gap-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                        <Box className="text-4xl" />
                        <h3 className="text-xl font-bold text-white">Fri frakt & retur</h3>

                        <p className="text-white text-sm">Ni riskerar ingenting. All logistik är optimerad för att vara så enkel som möjligt för er.</p>
                    </div>

                    {/* 4th CARD (3/4) */}
                    <div className="lg:col-span-3 bg-white rounded-3xl p-10 flex flex-col lg:flex-row lg:items-start gap-6 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                        <div className="min-w-0 flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Produkter folk faktiskt vill ha</h3>

                            <p className="text-gray-600 leading-relaxed">Vi har noga valt ut lättsålda kvalitetsprodukter som ljus, strumpor och delikatesser. Kvalitet som gör att kunderna gärna köper igen.</p>

                            <button className="mt-6 text-[#EFAC02] font-semibold transition-all duration-300 hover:underline hover:translate-x-1">Se hela sortimentet →</button>
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap gap-4 lg:mt-0 shrink-0 max-w-full">
                            <Image src="/sellwithus/product1.png" width={160} height={160} alt="Fundraising products" className="w-[140px] sm:w-[160px] h-[140px] sm:h-[160px] rounded-[32px] object-cover transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg mb-6" />
                            <Image src="/sellwithus/product2.png" width={160} height={160} alt="Fundraising products" className="w-[140px] sm:w-[160px] h-[140px] sm:h-[160px] rounded-[32px] object-cover transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg mt-6" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FundraisingSection;
