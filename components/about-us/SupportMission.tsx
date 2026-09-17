import { Banknote, TabletSmartphone, Shield } from "lucide-react";
import Image from "next/image";

export function SupportMission() {
    const supportFeatures = [
        {
            icon: Banknote,
            title: "Höga vinstmarginaler",
            description: "Behåll en stor del av det ni säljer för. Vår smidiga logistikmodell minimerar alla onödiga kostnader.",
        },
        {
            icon: TabletSmartphone,
            title: "Smidiga digitala verktyg",
            description: "Inbyggda översikter och verktyg för enkel hantering och uppföljning i realtid.",
        },
        {
            icon: Shield,
            title: "Riskfri försäljning",
            description: "Starta er försäljning helt utan startavgifter eller lagerkrav. Vi sköter det tunga arbetet.",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left content: text & features */}
                    <div className="lg:col-span-6 space-y-8">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1C1C] leading-tight mb-6">
                                Hur kan vi stötta <br />
                                er insamling?
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">Vi står för ramverket, ni står för engagemanget. Vårt system är byggt för att ge er maximal förtjänst med professionella verktyg.</p>
                        </div>

                        {/* Features Cards */}
                        <div className="space-y-4">
                            {supportFeatures.map((feature, index) => (
                                <div key={index} className="flex gap-5 p-6 items-center bg-[#EDEDED]/70 rounded-3xl transition-all duration-300 hover:bg-[#EDEDED] hover:shadow-sm">
                                    <div className="w-14 h-14 bg-white/50 rounded-2xl flex items-center justify-center shrink-0">
                                        <feature.icon className="w-7 h-7 text-[#7C5800]" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-[#1A1C1C]">{feature.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right content: laptop desk image */}
                    <div className="lg:col-span-6 relative w-full aspect-square max-w-135 mx-auto">
                        <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl relative">
                            <Image src="/mission/laptop_on_desk.png" alt="Laptop and books on a wooden desk" fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 1024px) 100vw, 540px" priority />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
