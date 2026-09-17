import React from "react";

const steps = [
    {
        number: "1",
        title: "Välj produkter",
        description: "Välj era favoritprodukter från vårt populära och lättsålda sortiment.",
    },
    {
        number: "2",
        title: "Sälj & följ",
        description: "Använd våra smidiga digitala verktyg för att ta emot beställningar och följa er försäljning live.",
    },
    {
        number: "3",
        title: "Få er vinst",
        description: "Få upp till 50% förtjänst direkt till er grupp. Så enkelt är det.",
    },
];

const StepsSection = () => {
    return (
        <section className="py-24 bg-[#EEEEEE]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Enkelt i 3 steg</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Vi har tagit bort allt krångel från försäljningen så att ni kan fokusera på era mål.</p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step) => (
                        <div key={step.number} className="relative group flex flex-col items-center text-center">
                            {/* BACK NUMBER (now per card) */}
                            <span className="absolute -top-10 left-0 md:left-12.5 text-[220px] font-extrabold text-white transition-colors duration-300 group-hover:text-[#EFAC02]/20 pointer-events-none">{step.number}</span>
                            {/* 96x96 box */}
                            <div className="w-24 h-24 bg-white border-4 border-[#EEEEEE] rounded-full flex items-center justify-center shadow-sm relative z-10 group-hover:scale-105 transition-transform duration-300">
                                <span className="text-4xl font-bold text-[#EFAC02]">{step.number}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-2 relative z-10">{step.title}</h3>

                            <p className="text-gray-600 text-sm max-w-xs relative z-10">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsSection;
