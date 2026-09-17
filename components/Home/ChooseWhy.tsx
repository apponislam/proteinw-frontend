import React from "react";
import { Heart, LaptopMinimal, Smile, TrendingUp } from "lucide-react";

const features = [
    {
        title: "Lättsålt sortiment",
        description: "Vårt utvalda sortiment säljer nästan sig självt. Högkvalitativa produkter som folk faktiskt vill ha.",
        icon: Smile,
    },
    {
        title: "Digital försäljning",
        description: "Inga pappersblanketter krävs. Hantera allt direkt i er mobila översikt på ett smidigt sätt.",
        icon: LaptopMinimal,
    },
    {
        title: "Höga vinstmarginaler",
        description: "Behåll en större del av vinsten. Vår modell är utformad för att maximera er förtjänst.",
        icon: TrendingUp,
    },
    {
        title: "Populära produkter",
        description: "Från väldoftande ljus till sköna strumpor — produkter som passar i varje hem och alla årstider.",
        icon: Heart,
    },
];

const ChooseWhy = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Varför välja Kungsbjörnen?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div key={index} className="group bg-white rounded-[48px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-[#EFAC02] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-[#EFAC02]">{feature.title}</h3>

                                <p className="text-[14px] text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ChooseWhy;
