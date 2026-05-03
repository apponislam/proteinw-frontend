import React from "react";
import { Wallet, BadgeCheck, WandSparkles } from "lucide-react";

const cards = [
    {
        icon: Wallet,
        title: "40–50% Profit",
        description: "Maximize your fundraising potential with our generous profit-sharing model designed for local groups.",
    },
    {
        icon: BadgeCheck,
        title: "Premium Products",
        description: "Sell items people actually want. Our artisan candles and sustainable socks are Scandinavian staples.",
    },
    {
        icon: WandSparkles,
        title: "Simple Management",
        description: "Our digital dashboard makes tracking sales, managing orders, and receiving profit effortless for any leader.",
    },
];

const ProfitValueCards = () => {
    return (
        <section className="py-20 bg-[#F3F3F3]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <div key={index} className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-[#EFAC0233] flex items-center justify-center mb-5">
                                    <Icon className="text-[#EFAC02] font-black" size={30} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>

                                <p className="text-gray-600 text-[14px] leading-relaxed">{card.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProfitValueCards;
