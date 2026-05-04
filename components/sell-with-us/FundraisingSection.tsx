import React from "react";

const FundraisingSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* HEADER */}
                <div className="mb-14 lg:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">Det moderna sättet att samla pengar</h2>

                    <p className="text-gray-600 mt-4 text-center">Vi har digitaliserat hela processen så att ni kan fokusera på målet, inte på pappersarbete.</p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* 1st CARD (3/4) */}
                    <div className="lg:col-span-3 bg-[#F6F6F6] rounded-3xl p-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Smidig digital beställning</h3>

                        <p className="text-gray-600 leading-relaxed">Varje elev får sin egen unika webbshop. Dela länken på sociala medier och se beställningarna rulla in i realtid. Inga säljlappar som försvinner.</p>

                        <div className="mt-6 flex gap-3 text-xs font-bold text-[#7C5800]">
                            <span>INGA BLANKETTER</span>
                            <span>QR-KODER</span>
                        </div>
                    </div>

                    {/* 2nd CARD (1/4) */}
                    <div className="lg:col-span-1 bg-[#F6F6F6] rounded-3xl p-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Hög förtjänst</h3>

                        <p className="text-gray-600 text-sm">Vi erbjuder en av marknadens högsta marginaler. Behåll upp till hälften av försäljningspriset själv.</p>

                        <p className="mt-6 text-[#EFAC02] font-bold text-sm">50% VINST</p>
                    </div>

                    {/* 3rd CARD (1/4) */}
                    <div className="lg:col-span-1 bg-[#F6F6F6] rounded-3xl p-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Fri frakt & retur</h3>

                        <p className="text-gray-600 text-sm">Ni riskerar ingenting. All logistik är optimerad för att vara så enkel som möjligt för er.</p>
                    </div>

                    {/* 4th CARD (3/4) */}
                    <div className="lg:col-span-3 bg-[#F6F6F6] rounded-3xl p-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Produkter folk faktiskt vill ha</h3>

                        <p className="text-gray-600 leading-relaxed">Vi har noga valt ut lättsålda kvalitetsprodukter som ljus, strumpor och delikatesser. Kvalitet som gör att kunderna gärna köper igen.</p>

                        <button className="mt-6 text-[#EFAC02] font-semibold hover:underline">Se hela sortimentet →</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FundraisingSection;
