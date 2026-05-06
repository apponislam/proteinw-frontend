"use client";

import { UserPlus, Link, Share2, ShoppingCart, Truck, Wallet } from "lucide-react";

const steps = [
    {
        num: "01",
        icon: UserPlus,
        title: "Register your class or team",
        desc: "Get started by signing up your class, club, or team on our platform. The registration process is quick, simple, and completely free. Within minutes, you'll have everything set up and ready to begin your fundraising journey without any technical hassle.",
    },
    {
        num: "02",
        icon: Link,
        title: "Receive your fundraising link",
        desc: "Each participant receives a unique personal fundraising link connected to their profile. This allows you to track individual performance, monitor progress, and ensure transparency across your entire team with real-time updates.",
    },
    {
        num: "03",
        icon: Share2,
        title: "Start selling products digitally",
        desc: "Share your personalized link through social media, messaging apps, or email. Supporters can browse and purchase directly online, making the process fast, modern, and convenient without relying on outdated paper catalogs.",
    },
    {
        num: "04",
        icon: ShoppingCart,
        title: "Collect and track orders",
        desc: "All orders are automatically collected and organized in your dashboard. You can monitor sales performance, view customer activity, and manage everything in one place while we handle stock and system operations behind the scenes.",
    },
    {
        num: "05",
        icon: Truck,
        title: "Receive and distribute products",
        desc: "Once your fundraising period ends, we carefully prepare and ship all collected orders directly to you in one consolidated delivery. This makes distribution simple, organized, and stress-free for your entire team.",
    },
    {
        num: "06",
        icon: Wallet,
        title: "Earn and withdraw funds",
        desc: "After all sales are completed, you earn a generous commission from every purchase. Payments are processed quickly and securely, giving you full visibility and confidence in your fundraising earnings.",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-24 xl:h-screen bg-[#F6F6F6]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">How It Works</h2>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div key={index} className="relative group overflow-visible">
                                {/* NORMAL CARD */}
                                <div
                                    className="
                                    bg-white rounded-3xl p-8 shadow-sm border-2 border-white
                                    transition-all duration-300
                                    group-hover:opacity-0
                                "
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#EFAC02] flex items-center justify-center mb-5">
                                        <Icon size={18} className="text-white" />
                                    </div>

                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="text-[60px] font-bold text-gray-200 leading-none">{step.num}</div>
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{step.title}</h3>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc.slice(0, 90)}...</p>
                                </div>

                                {/* EXPANDED OVERLAY CARD */}
                                <div
                                    className="
                                    absolute top-0 left-0 w-full z-20
                                    bg-white rounded-3xl p-8 shadow-xl border-2 border-[#EFAC02]
                                    opacity-0
                                    transition-all duration-300
                                    group-hover:opacity-100
                                    pointer-events-auto
                                "
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#EFAC02] flex items-center justify-center mb-5">
                                        <Icon size={18} className="text-white" />
                                    </div>

                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="text-[60px] font-bold text-gray-200 leading-none">{step.num}</div>
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{step.title}</h3>
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
