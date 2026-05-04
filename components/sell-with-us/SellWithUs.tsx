import { FileCheck, GraduationCap, LaptopMinimal, PlaneTakeoff, Smile, TrendingUp, Users, Volleyball } from "lucide-react";
import React from "react";

const SellWithUs = () => {
    return (
        <section className="py-24 lg:h-screen bg-white">
            <div className="container mx-auto px-6">
                {/* HEADER */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-[60px] font-extrabold text-gray-900">Sell With Us</h2>

                    <p className="text-gray-600 mt-4 text-center text-xl">Choose how you want to start your fundraising</p>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* CLASS FUNDRAISING */}
                    <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-lg transition">
                        <div className="bg-[#F59E0B33] w-16 h-16 rounded-[24px] flex items-center justify-center mb-4">
                            <GraduationCap className="text-[#F59E0B] text-xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">For Class Fundraising</h3>

                        <p className="text-gray-600 mb-6">Tailored for school classes planning trips or graduation events.</p>

                        {/* FEATURES */}
                        <div className="space-y-3 text-gray-700 text-sm">
                            <p className="flex items-center gap-2">
                                <Smile className="text-[#F59E0B]" size={18} />
                                Easy for students
                            </p>

                            <p className="flex items-center gap-2">
                                <PlaneTakeoff className="text-[#F59E0B]" size={18} />
                                Class trips
                            </p>

                            <p className="flex items-center gap-2">
                                <LaptopMinimal className="text-[#F59E0B]" size={18} />
                                Easy to manage
                            </p>
                        </div>

                        {/* CTA */}
                        <button className="mt-8 w-full bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white py-3 rounded-2xl font-semibold transition-all hover:from-[#8B6500] hover:to-[#FFCC00]">Start for Class</button>
                    </div>

                    {/* TEAM FUNDRAISING */}
                    <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-lg transition">
                        <div className="bg-[#F59E0B33] w-16 h-16 rounded-[24px] flex items-center justify-center mb-4">
                            <Volleyball className="text-[#F59E0B] text-xl" />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">For Team Fundraising</h3>

                        <p className="text-gray-600 mb-6">Designed for sports teams and associations to fund kits or travel.</p>

                        {/* FEATURES */}
                        <div className="space-y-3 text-gray-700 text-sm">
                            <p className="flex items-center gap-2">
                                <Users className="text-[#F59E0B]" size={18} />
                                Sports teams
                            </p>

                            <p className="flex items-center gap-2">
                                <FileCheck className="text-[#F59E0B]" size={18} />
                                Digital selling
                            </p>

                            <p className="flex items-center gap-2">
                                <TrendingUp className="text-[#F59E0B]" size={18} />
                                Earn more
                            </p>
                        </div>

                        {/* CTA */}
                        <button className="mt-8 w-full bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white py-3 rounded-2xl font-semibold transition-all hover:from-[#8B6500] hover:to-[#FFCC00]">Start for Team</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellWithUs;
