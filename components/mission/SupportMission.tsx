import { Banknote, TabletSmartphone, Shield } from "lucide-react";
import Image from "next/image";

export function SupportMission() {
    const supportFeatures = [
        {
            icon: Banknote,
            title: "Superior Profit Margins",
            description: "Keep more of what you raise. Our lean Nordic logistics model minimizes overhead.",
        },
        {
            icon: TabletSmartphone,
            title: "Seamless Digital Tools",
            description: "Integrated dashboards and mobile apps for easy management and real-time tracking.",
        },
        {
            icon: Shield,
            title: "Zero-Risk Foundation",
            description: "Start your campaign with no upfront costs and zero inventory risk. We handle the heavy lifting.",
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
                                How Can We Support <br />Your Mission?
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                We provide the framework, you provide the passion. Our ecosystem is built to scale your local impact with professional-grade tools.
                            </p>
                        </div>

                        {/* Features Cards */}
                        <div className="space-y-4">
                            {supportFeatures.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className="flex gap-5 p-6 bg-[#EDEDED]/70 rounded-3xl transition-all duration-300 hover:bg-[#EDEDED] hover:shadow-sm"
                                >
                                    <div className="shrink-0 text-[#7C5800] mt-1 bg-white/40 p-2.5 rounded-xl flex items-center justify-center">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-[#1A1C1C]">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right content: laptop desk image */}
                    <div className="lg:col-span-6 relative w-full aspect-square max-w-[540px] mx-auto">
                        <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl relative">
                            <Image 
                                src="/mission/laptop_on_desk.png" 
                                alt="Laptop and books on a wooden desk" 
                                fill 
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 540px"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
