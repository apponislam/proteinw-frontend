import { FileCheck, GraduationCap, LaptopMinimal, PlaneTakeoff, Smile, TrendingUp, Users, Volleyball } from "lucide-react";
import Link from "next/link";
import React from "react";

const SellWithUs = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-24 min-h-fit bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                {/* HEADER */}
                <div className="text-center mb-8 sm:mb-14">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-extrabold text-gray-900 leading-tight">Här börjar ni</h2>

                    <p className="text-gray-600 mt-2 sm:mt-4 text-center text-base sm:text-lg md:text-xl">Välj hur ni vill starta er försäljning</p>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* CLASS FUNDRAISING */}
                    <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 md:p-10 hover:shadow-lg transition">
                        <div className="bg-[#F59E0B33] w-16 h-16 rounded-[24px] flex items-center justify-center mb-4">
                            <GraduationCap className="text-[#F59E0B] text-xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">För klassens försäljning</h3>

                        <p className="text-gray-600 mb-6">Anpassat för klasser och skolor som vill samla in pengar till exempelvis klassresor, studentfirandet eller gemensamma aktiviteter.</p>

                        {/* FEATURES */}
                        <div className="space-y-3 text-gray-700 text-sm">
                            <p className="flex items-center gap-2">
                                <Smile className="text-[#F59E0B]" size={18} />
                                Enkelt för eleverna
                            </p>

                            <p className="flex items-center gap-2">
                                <PlaneTakeoff className="text-[#F59E0B]" size={18} />
                                Klassresor & aktiviteter
                            </p>

                            <p className="flex items-center gap-2">
                                <LaptopMinimal className="text-[#F59E0B]" size={18} />
                                Upp till 50% förtjänst
                            </p>
                        </div>

                        {/* CTA */}
                        <Link href="/auth/register?profession=teacher">
                            <button className="mt-8 w-full bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white py-3 rounded-2xl font-semibold transition-all hover:from-[#8B6500] hover:to-[#FFCC00] cursor-pointer">Starta för klassen</button>
                        </Link>
                    </div>

                    {/* TEAM FUNDRAISING */}
                    <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 md:p-10 hover:shadow-lg transition">
                        <div className="bg-[#F59E0B33] w-16 h-16 rounded-[24px] flex items-center justify-center mb-4">
                            <Volleyball className="text-[#F59E0B] text-xl" />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">För lagets insamling</h3>

                        <p className="text-gray-600 mb-6">Utformat för idrottslag och föreningar som vill samla in pengar till exempelvis cuper, utrustning eller resor.</p>

                        {/* FEATURES */}
                        <div className="space-y-3 text-gray-700 text-sm">
                            <p className="flex items-center gap-2">
                                <Users className="text-[#F59E0B]" size={18} />
                                För idrottslag & föreningar
                            </p>

                            <p className="flex items-center gap-2">
                                <FileCheck className="text-[#F59E0B]" size={18} />
                                Digital försäljning
                            </p>

                            <p className="flex items-center gap-2">
                                <TrendingUp className="text-[#F59E0B]" size={18} />
                                Upp till 50% förtjänst
                            </p>
                        </div>

                        {/* CTA */}
                        <Link href="/auth/register?profession=coach">
                            <button className="mt-8 w-full bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white py-3 rounded-2xl font-semibold transition-all hover:from-[#8B6500] hover:to-[#FFCC00] cursor-pointer">Starta för laget</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellWithUs;
