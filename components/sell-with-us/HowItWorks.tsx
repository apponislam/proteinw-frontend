import React from "react";

const steps = [
    {
        num: "01",
        title: "Register your class or team",
        desc: "Simply sign up your group on our platform. It's free and takes less than two minutes.",
    },
    {
        num: "02",
        title: "Receive your fundraising link",
        desc: "Every participant gets a unique digital store link to track their individual progress.",
    },
    {
        num: "03",
        title: "Start selling products digitally",
        desc: "Share your link via social media, SMS, or email. No heavy catalogs needed.",
    },
    {
        num: "04",
        title: "Collect orders",
        desc: "View all your sales in real-time through your dashboard. We manage inventory.",
    },
    {
        num: "05",
        title: "Deliver products",
        desc: "Once the period ends, we ship everything to you for easy distribution to customers.",
    },
    {
        num: "06",
        title: "Earn money",
        desc: "Keep a generous commission on every sale. Payouts are fast, secure, and transparent.",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-[#F6F6F6]">
            <div className="container mx-auto px-6">
                {/* HEADER */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">How It Works</h2>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition">
                            {/* NUMBER */}
                            <div className="text-[#EFAC02] font-bold text-sm tracking-widest mb-4">{step.num}</div>

                            {/* TITLE */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>

                            {/* DESC */}
                            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
