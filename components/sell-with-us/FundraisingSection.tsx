import { Box, TabletSmartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FundraisingSection = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-24 bg-[#F3F4F5]">
            <div className="container mx-auto px-4 sm:px-6">
                {/* HEADER */}
                <div className="mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center leading-tight">Det moderna sättet att samla pengar</h2>

                    <p className="text-gray-600 mt-2 sm:mt-4 text-center text-sm sm:text-base">Vi har digitaliserat hela processen så att ni kan fokusera på målet, inte på pappersarbete.</p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* 1st CARD (3/4 on lg, full on md) */}
                    <div className="md:col-span-2 lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 bg-[#EFAC021A] flex items-center justify-center rounded-full mb-4">
                            <TabletSmartphone className="text-[#EFAC02] text-xl" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Smidig digital beställning</h3>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Varje elev får sin egen unika webbshop. Dela länken på sociala medier och se beställningarna rulla in i realtid. Inga säljlappar som försvinner.</p>

                        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3 text-xs font-bold">
                            <span className="bg-[#8F8F8F1A] text-[#2D2D2D] px-3.5 sm:px-4 py-2 rounded-2xl uppercase">INGA BLANKETTER</span>
                            <span className="bg-[#8F8F8F1A] text-[#2D2D2D] px-3.5 sm:px-4 py-2 rounded-2xl uppercase">QR-KODER</span>
                            <span className="bg-[#8F8F8F1A] text-[#2D2D2D] px-3.5 sm:px-4 py-2 rounded-2xl uppercase">Egna unika länkar</span>
                        </div>
                    </div>

                    {/* 2nd CARD (1/4 on lg, 1 on md) */}
                    <div className="md:col-span-1 lg:col-span-1 bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-3xl p-6 sm:p-8 lg:p-10 text-white flex justify-between flex-col min-h-55 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Hög förtjänst</h3>

                            <p className="text-xs sm:text-sm">Vi erbjuder en av marknadens högsta marginaler. Behåll upp till hälften av försäljningspriset själv.</p>
                        </div>
                        <p className="mt-4 sm:mt-6 font-bold text-3xl sm:text-4xl">50% VINST</p>
                    </div>

                    {/* 3rd CARD (1/4 on lg, 1 on md) */}
                    <div className="md:col-span-1 lg:col-span-1 bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-3xl p-6 sm:p-8 lg:p-10 flex justify-between flex-col text-white gap-4 min-h-55 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                        <Box className="text-3xl sm:text-4xl" />
                        <h3 className="text-lg sm:text-xl font-bold text-white">Fri frakt & retur</h3>

                        <p className="text-white text-xs sm:text-sm">Ni riskerar ingenting. All logistik är optimerad för att vara så enkel som möjligt för er.</p>
                    </div>

                    {/* 4th CARD (3/4 on lg, full on md) */}
                    <div className="md:col-span-2 lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-start gap-6 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                        <div className="min-w-0 flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Produkter folk faktiskt vill ha</h3>

                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Vi har noga valt ut lättsålda kvalitetsprodukter som ljus, strumpor och delikatesser. Kvalitet som gör att kunderna gärna köper igen.</p>

                            <Link href="/products">
                                <button className="mt-4 sm:mt-6 text-[#EFAC02] font-semibold text-sm sm:text-base transition-all duration-300 hover:underline hover:translate-x-1 cursor-pointer">Se hela sortimentet →</button>
                            </Link>
                        </div>
                        <div className="flex flex-row justify-center sm:justify-start gap-3 sm:gap-4 lg:mt-0 shrink-0 max-w-full">
                            <Image
                                src="/sellwithus/product1.png"
                                width={160}
                                height={160}
                                alt="Fundraising products"
                                className="w-28 sm:w-36 lg:w-40 h-28 sm:h-36 lg:h-40 rounded-2xl sm:rounded-[32px] object-cover transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg mb-2 sm:mb-6"
                            />
                            <Image
                                src="/sellwithus/product2.png"
                                width={160}
                                height={160}
                                alt="Fundraising products"
                                className="w-28 sm:w-36 lg:w-40 h-28 sm:h-36 lg:h-40 rounded-2xl sm:rounded-[32px] object-cover transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg mt-2 sm:mt-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FundraisingSection;
