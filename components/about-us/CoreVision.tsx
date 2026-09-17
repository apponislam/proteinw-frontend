import { Shield, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

export function CoreVision() {
    const pillars = [
        {
            icon: Shield,
            title: "Trygghet",
            description: "Byggt på svenska principer om transparens. Varje krona redovisas så att vinsten hamnar där den behövs som mest.",
            features: ["Verifierade partners", "Realtidsrapportering"],
        },
        {
            icon: Zap,
            title: "Enkelhet",
            description: "Vi tar bort allt krångel kring försäljningen. Våra verktyg är utformade för att vara intuitiva så att grupper kan komma igång på några minuter.",
            features: ["Mobilanpassat", "Kom igång på 1 klick"],
        },
        {
            icon: TrendingUp,
            title: "Resultat",
            description: "Maximal förtjänst för er insamling. Vår modell säkerställer att mer pengar går direkt till gruppen genom effektiv logistik.",
            features: ["Hög vinstmarginal", "Lokal stärkt gemenskap"],
        },
    ];

    return (
        <section className="py-24 bg-[#F3F3F3]">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold text-[#1A1C1C] mb-6">Vår vision</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">Vi tror att försäljning och insamling ska kännas enkelt och naturligt—meningsfullt, tryggt och givande för alla inblandade.</p>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                            <div className="w-14 h-14 bg-[#7C58001A] rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                <pillar.icon className="w-7 h-7 text-[#7C5800]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1A1C1C] mb-4 transition-colors duration-300 group-hover:text-[#7C5800]">{pillar.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">{pillar.description}</p>

                            {/* Features with Checkmarks */}
                            <div className="space-y-3">
                                {pillar.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#7C5800] shrink-0" />
                                        <span className="text-gray-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
