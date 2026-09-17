"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const faqs = [
    {
        q: "Hur snabbt kan vi komma igång?",
        a: "Ni kan starta direkt efter registrering. Allt sätts upp digitalt på bara några minuter.",
    },
    {
        q: "Finns det några startkostnader?",
        a: "Inga startkostnader krävs. Ni betalar först efter avslutad och genomförd försäljning.",
    },
    {
        q: "Finns det någon minsta beställning?",
        a: "Det finns inget krav på minsta beställning. Ni anpassar helt efter gruppens storlek.",
    },
];

const TestimonialsFAQ = () => {
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [message, setMessage] = useState("");

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            router.push(`/faq?message=${encodeURIComponent(message.trim())}`);
        } else {
            router.push("/faq");
        }
    };

    return (
        <section className="py-24 bg-[#F3F3F3]">
            <div className="container mx-auto px-6">
                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Vad våra grupper säger</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Vanliga frågor & erfarenheter från våra samarbetspartners</p>
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
                            <p className="text-gray-700 leading-relaxed mb-6 relative z-10">Kvaliteten på ljusen är otrolig. Våra köpare frågade efter mer flera veckor efter att försäljningen var avslutad. Vi nådde vårt mål för klassresan på rekordtid!</p>
                            <div className="flex items-center gap-4">
                                <Image src="/testimonial.png" alt="Testimonial 1" width={48} height={48} className="rounded-full" />
                                <div className="relative z-10">
                                    <p className="font-semibold text-gray-900">Elin Andersson</p>
                                    <p className="text-sm text-gray-500">Klassförälder, Bromma</p>
                                </div>
                            </div>
                        </div>

                        {/* Simple message input form */}
                        <form onSubmit={handleSendMessage} className="bg-white rounded-2xl sm:rounded-[24px] p-4 sm:p-5 shadow-xs flex items-center gap-3 w-full">
                            <input
                                type="text"
                                placeholder="Skriv ett meddelande till oss..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                            />

                            <button type="submit" className="w-10 h-10 rounded-full bg-[#EFAC02] flex items-center justify-center text-white hover:opacity-90 transition shrink-0 cursor-pointer" title="Skicka meddelande">
                                <Send size={16} />
                            </button>
                        </form>
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

                        <Link href="/faq">
                            <button className="text-[#EFAC02] font-semibold hover:underline mt-4 cursor-pointer">Se alla vanliga frågor →</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsFAQ;
