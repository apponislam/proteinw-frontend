import React from "react";

const SellWithUs = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* HEADER */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Sell With Us</h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Choose how you want to start your fundraising</p>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* CLASS FUNDRAISING */}
                    <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-lg transition">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">For Class Fundraising</h3>

                        <p className="text-gray-600 mb-6">Tailored for school classes planning trips or graduation events.</p>

                        {/* FEATURES */}
                        <div className="space-y-3 text-gray-700 text-sm">
                            <p>✔ Easy for students</p>
                            <p>✔ Class trips</p>
                            <p>✔ Easy to manage</p>
                        </div>

                        {/* CTA */}
                        <button className="mt-8 w-full bg-[#EFAC02] text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition">Start for Class</button>
                    </div>

                    {/* TEAM FUNDRAISING */}
                    <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-lg transition">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">For Team Fundraising</h3>

                        <p className="text-gray-600 mb-6">Designed for sports teams and associations to fund kits or travel.</p>

                        {/* FEATURES */}
                        <div className="space-y-3 text-gray-700 text-sm">
                            <p>✔ Sports teams</p>
                            <p>✔ Digital selling</p>
                            <p>✔ Earn more</p>
                        </div>

                        {/* CTA */}
                        <button className="mt-8 w-full bg-[#7C5800] text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition">Start for Team</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellWithUs;
