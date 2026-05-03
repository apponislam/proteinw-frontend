import React from "react";
import { Heart, LaptopMinimal, Smile, TrendingUp } from "lucide-react";

const features = [
    {
        title: "Easy to sell",
        description: "Our curated product line practically sells itself. High-quality products that people actually want to buy.",
        icon: Smile,
    },
    {
        title: "Digital ordering",
        description: "No paper forms needed. Manage everything through our simple digital dashboard directly from your phone.",
        icon: LaptopMinimal,
    },
    {
        title: "High profit margins",
        description: "Keep a larger piece of the pie. Our model is designed to maximize earnings for your group.",
        icon: TrendingUp,
    },
    {
        title: "Popular products",
        description: "From scented candles to cozy socks — products that fit every home and every season.",
        icon: Heart,
    },
];

const ChooseWhy = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Why choose Kungsbjörnen?</h2>
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
