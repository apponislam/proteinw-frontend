"use client";

import React, { useState } from "react";
import { UserPlus, Link, Share2, ShoppingCart, Truck, Wallet } from "lucide-react";

const steps = [
    {
        num: "01",
        icon: UserPlus,
        title: "Skapa er grupp",
        desc: "Det första steget är att registrera din klass, ditt lag eller din förening på vår plattform. Det är snabbt, enkelt och helt kostnadsfritt. På bara några minuter har ni allt på plats och kan börja er försäljning. Vi har gjort processen så enkel som möjligt, så att ni kan fokusera på försäljningen istället för tekniken.",
    },
    {
        num: "02",
        icon: Link,
        title: "Få din personliga webbshop",
        desc: "Varje deltagare får en unik personlig länk till sin webbshop, kopplad till sin profil. Länken gör det enkelt att följa den egna försäljningen, se sina framsteg och hålla koll på resultatet under hela försäljningen med uppdateringar i realtid.",
    },
    {
        num: "03",
        icon: Share2,
        title: "Dela din webbshop",
        desc: "Dela din personliga länk via sociala medier, meddelandeappar eller e-post. De som vill stötta er kan enkelt besöka din webbshop och handla direkt online, vilket gör försäljningen snabb, modern och smidig – utan att behöva använda traditionella papperskataloger. Genom vårt digitala system kan ni nå ut till fler potentiella kunder än genom endast traditionell försäljning, exempelvis genom att kombinera dörrförsäljning med den digitala webbshopen. ",
    },
    {
        num: "04",
        icon: ShoppingCart,
        title: "Följ försäljningen",
        desc: "Alla beställningar samlas och organiseras automatiskt i er översikt. Här kan ni följa försäljningen, se kundernas beställningar, följa gruppens totala förtjänst och hålla koll på försäljningens utveckling – allt samlat på ett och samma ställe. Vi sköter lager och allt annat tråkigt i bakgrunden.",
    },
    {
        num: "05",
        icon: Truck,
        title: "Vi samlar och levererar",
        desc: "När eran försäljning är avslutad sammanställer vi alla beställningar och skickar dem till er i en samlad leverans. Ni får enkelt koll på alla produkter, samtidigt som utdelningen blir smidig och välorganiserad. ",
    },
    {
        num: "06",
        icon: Wallet,
        title: "Nå ert mål",
        desc: "När försäljningen är avslutad får ni er förtjänst baserat på det antal produkter ni har sålt. Ju mer gruppen säljer, desto högre blir förtjänstnivån. Ni kan följa ert resultat under hela försäljningstiden och se hur era pengar rullar in i realtid. All kontakt kommer att ske mellan kontaktpersonen för gruppen och Kungsbjörnen.",
    },
];

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    return (
        <section className="py-12 sm:py-16 lg:py-24 min-h-fit bg-[#F6F6F6]">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-14">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Så funkar det</h2>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = activeStep === index;

                        return (
                            <div key={index} onClick={() => setActiveStep(isActive ? null : index)} className="relative group overflow-visible cursor-pointer select-none">
                                {/* NORMAL CARD */}
                                <div
                                    className={`
                                    bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-white
                                    transition-all duration-300
                                    group-hover:opacity-0
                                    ${isActive ? "opacity-0" : "opacity-100"}
                                `}
                                >
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EFAC02] flex items-center justify-center mb-4 sm:mb-5">
                                        <Icon size={18} className="text-white" />
                                    </div>

                                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                                        <div className="text-[48px] sm:text-[60px] font-bold text-gray-200 leading-none">{step.num}</div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{step.title}</h3>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc.slice(0, 90)}...</p>
                                </div>

                                {/* EXPANDED OVERLAY CARD */}
                                <div
                                    className={`
                                    absolute top-0 left-0 w-full z-20
                                    bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#EFAC02]
                                    transition-all duration-300
                                    group-hover:opacity-100 group-hover:pointer-events-auto
                                    ${isActive ? "opacity-100 pointer-events-auto z-30" : "opacity-0 pointer-events-none"}
                                `}
                                >
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EFAC02] flex items-center justify-center mb-4 sm:mb-5">
                                        <Icon size={18} className="text-white" />
                                    </div>

                                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                                        <div className="text-[48px] sm:text-[60px] font-bold text-gray-200 leading-none">{step.num}</div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{step.title}</h3>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
