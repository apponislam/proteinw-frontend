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
        <section className="py-10 sm:py-16 md:py-20 bg-[#F3F3F3]">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {cards.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-stone-200/60 shadow-xs hover:shadow-md transition-all duration-300 ${
                                    index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                                }`}
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#EFAC02]/15 flex items-center justify-center mb-4 sm:mb-5 shrink-0">
                                    <Icon className="text-[#EFAC02]" size={26} />
                                </div>

                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2.5 sm:mb-4">{card.title}</h3>

                                <p className="text-gray-600 text-xs sm:text-sm md:text-[15px] leading-relaxed">{card.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProfitValueCards;
