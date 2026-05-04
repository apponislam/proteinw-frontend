"use client";

import { useState } from "react";

export default function SupportPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-[#F3F3F3]">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
                {/* LEFT SIDE */}
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-10">Common Questions</h2>

                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div key={index} onClick={() => toggleFAQ(index)} className="bg-white border border-white hover:border-[#EFAC02] rounded-2xl p-5 cursor-pointer transition">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">{item.question}</h3>

                                    <span className="text-lg font-bold text-[#837560]">{openIndex === index ? "−" : "+"}</span>
                                </div>

                                <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    {/* RIGHT SIDE */}
                    <div className="bg-white rounded-3xl p-8 border border-white shadow-sm">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h2>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Name" className="w-full bg-[#F8F8F8] rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#EFAC02]" />
                                <input type="email" placeholder="Email" className="w-full bg-[#F8F8F8] rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#EFAC02]" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Subject" className="w-full bg-[#F8F8F8] rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#EFAC02]" />
                                <input type="text" placeholder="Phone" className="w-full bg-[#F8F8F8] rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#EFAC02]" />
                            </div>

                            {/* 👇 replaced select */}
                            <input list="inquiry-options" placeholder="Select topic" className="w-full bg-[#F8F8F8] rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#EFAC02]" />
                            <datalist id="inquiry-options">
                                <option value="Product Inquiry" />
                                <option value="General Question" />
                                <option value="Support" />
                            </datalist>

                            <textarea placeholder="How can we help you?" rows={5} className="w-full bg-[#F8F8F8] rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#EFAC02]" />

                            <button type="submit" className="mt-4 w-full bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white py-3 rounded-2xl font-semibold transition-all hover:from-[#8B6500] hover:to-[#FFCC00]">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Support Info */}
                    <div className="mt-12 space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-white">
                            <p className="font-semibold text-gray-900 mb-1">Support Email</p>
                            <p className="text-gray-700">hello@nordicarchive.fund</p>
                            <p className="text-xs text-gray-500 mt-1">24/7 automated support, 12hr human response.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-white">
                            <p className="font-semibold text-gray-900 mb-1">Phone Support</p>
                            <p className="text-gray-700">+46 (0) 8 123 45 67</p>
                            <p className="text-xs text-gray-500 mt-1">Mon–Fri, 9am – 5pm CET</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const faqData = [
    {
        question: "Can we customize our storefront?",
        answer: "Yes. Your storefront can be fully customized to match your organization’s branding, goals, and campaign style. We help you curate everything for maximum impact.",
    },
    {
        question: "What is the profit model?",
        answer: "Our model is simple and transparent. You earn a margin on every product sold, allowing you to generate consistent fundraising revenue without upfront investment.",
    },
    {
        question: "How quickly can we start our fundraiser?",
        answer: "Most organizations go live within 48 hours. Once your coordinator is assigned, we help you curate your Nordic Archive storefront and set your goals immediately. The platform is optimized for fast deployment.",
    },
    {
        question: "How do products get delivered?",
        answer: "All products are delivered directly to customers through our trusted logistics partners. This ensures fast, reliable shipping without any handling required from your organization.",
    },
    {
        question: "Is there any upfront cost?",
        answer: "No. There are no upfront costs to get started. You only pay based on successful sales, making it risk-free to launch your fundraiser.",
    },
    {
        question: "Who handles customer support?",
        answer: "We provide 24/7 automated support along with human support within 12 hours. Your customers are always taken care of.",
    },
    {
        question: "Can we track our sales and performance?",
        answer: "Yes. You’ll have access to a dashboard where you can monitor sales, performance, and progress toward your fundraising goals in real time.",
    },
    {
        question: "Do we need technical knowledge to start?",
        answer: "Not at all. Our platform is fully managed and easy to use. We guide you through everything from setup to launch.",
    },
];
