"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import Image from "next/image";

const faqs = [
    {
        q: "How quickly can we start?",
        a: "You can start immediately after registration. Everything is set up digitally within minutes.",
    },
    {
        q: "Is there any upfront cost?",
        a: "No upfront cost required. You only pay after successful sales.",
    },
    {
        q: "What is the minimum order size?",
        a: "There is no strict minimum order size. You can scale based on your group size.",
    },
];

const TestimonialsFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-[#F3F3F3]">
            <div className="container mx-auto px-6">
                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">What our partners say</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Frequently Asked Questions & real experiences from our community</p>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* LEFT SIDE */}
                    <div className="space-y-6">
                        {/* Testimonial */}
                        <div className="relative bg-white rounded-3xl p-8 overflow-hidden">
                            {/* Big quote mark */}
                            {/* ❝ */}
                            <span className="absolute top-6 left-2 text-[140px] text-[#FFDEA8] font-serif leading-none pointer-events-none select-none opacity-50">❞</span>
                            <p className="text-gray-700 leading-relaxed mb-6 relative z-10">The quality of the candles is incredible. Our supporters were asking for more weeks after the sale ended. We reached our travel goal in record time!</p>
                            <div className="flex items-center gap-4">
                                <Image src="/testimonial.png" alt="Testimonial 1" width={48} height={48} className="rounded-full" />
                                <div className="relative z-10">
                                    <p className="font-semibold text-gray-900">Elin Andersson</p>
                                    <p className="text-sm text-gray-500">Class Mentor, Bromma High</p>
                                </div>
                            </div>
                        </div>

                        {/* Simple message input */}
                        <div className="bg-white rounded-3xl p-5 flex items-center gap-3">
                            <input type="text" placeholder="Send us a message..." className="w-full bg-transparent outline-none text-sm" />

                            <button className="w-10 h-10 rounded-full bg-[#EFAC02] flex items-center justify-center text-white hover:opacity-90 transition">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE - FAQ */}
                    <div className="space-y-4">
                        {faqs.map((item, index) => (
                            <div key={index} className="border bg-white border-gray-200 rounded-2xl p-5 cursor-pointer" onClick={() => toggleFAQ(index)}>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">{item.q}</h3>

                                    <span className="text-lg text-[#837560] font-bold transition-all">{openIndex === index ? "−" : "+"}</span>
                                </div>

                                {/* Smooth animation wrapper */}
                                <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-sm text-gray-600">{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className="text-[#EFAC02] font-semibold hover:underline mt-4">View all FAQs →</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsFAQ;
