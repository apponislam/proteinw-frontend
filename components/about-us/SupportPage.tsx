"use client";

import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateContactMutation } from "@/redux/features/contact/contactApi";
import { toast } from "sonner";

const supportFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(1, "Please select a topic"),
    phone: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

interface FAQItem {
    question: string;
    answer: string;
}

interface SupportPageProps {
    faqData: FAQItem[];
}

export default function SupportPage({ faqData }: SupportPageProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [createContact, { isLoading }] = useCreateContactMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SupportFormValues>({
        resolver: zodResolver(supportFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            phone: "",
            message: "",
        },
    });

    const onSubmit = async (data: SupportFormValues) => {
        try {
            await createContact(data).unwrap();
            toast.success("Message sent successfully! We'll get back to you soon.");
            reset();
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to send message. Please try again.");
            console.error("Support form error:", err);
        }
    };

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
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
                                    <p className="text-sm text-[#514532] leading-relaxed">{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                {/* RIGHT SIDE */}
                <div className="bg-white rounded-3xl p-8 border border-white shadow-sm">
                    <h2 className="text-3xl text-gray-900 mb-6">Send us a message</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-2 block">NAME</label>
                                        <input type="text" placeholder="Enter your full name" className={`w-full bg-[#F8F8F8] rounded-xl px-6 h-12 text-sm text-[#514532] outline-none focus:ring-2 focus:ring-[#EFAC02] placeholder:text-[#514532]/60 ${errors.name ? "ring-2 ring-red-500" : ""}`} {...field} />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-2 block">EMAIL</label>
                                        <input type="email" placeholder="your@email.com" className={`w-full bg-[#F8F8F8] rounded-xl px-6 h-12 text-sm text-[#514532] outline-none focus:ring-2 focus:ring-[#EFAC02] placeholder:text-[#514532]/60 ${errors.email ? "ring-2 ring-red-500" : ""}`} {...field} />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="subject"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-2 block">SUBJECT</label>
                                        <input list="inquiry-options" placeholder="Choose a topic from the list" className={`w-full bg-[#F8F8F8] rounded-xl px-6 h-12 text-sm text-[#514532] outline-none focus:ring-2 focus:ring-[#EFAC02] placeholder:text-[#514532]/60 ${errors.subject ? "ring-2 ring-red-500" : ""}`} {...field} />
                                        <datalist id="inquiry-options">
                                            <option value="Product Inquiry" />
                                            <option value="General Question" />
                                            <option value="Support" />
                                        </datalist>
                                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-2 block">PHONE</label>
                                        <input type="text" placeholder="+46 (0) 70 123 45 67" className="w-full bg-[#F8F8F8] rounded-xl px-6 h-12 text-sm text-[#514532] outline-none focus:ring-2 focus:ring-[#EFAC02] placeholder:text-[#514532]/60" {...field} />
                                    </div>
                                )}
                            />
                        </div>

                        <Controller
                            name="message"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 mb-2 block">HOW CAN WE HELP YOU?</label>
                                    <textarea placeholder="Tell us about your fundraising needs or questions..." className={`w-full bg-[#F8F8F8] rounded-xl px-6 py-4 h-52 text-sm text-[#514532] outline-none focus:ring-2 focus:ring-[#EFAC02] resize-none placeholder:text-[#514532]/60 ${errors.message ? "ring-2 ring-red-500" : ""}`} {...field} />
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                                </div>
                            )}
                        />

                        <button type="submit" disabled={isLoading} className="mt-4 w-full bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white h-12 rounded-xl font-semibold transition-all hover:from-[#8B6500] hover:to-[#FFCC00] disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

                {/* Support Info */}
                <div className="mt-12 space-y-6">
                    <div className="flex gap-6">
                        <div className="bg-[#FFDEA8] text-[#271900] w-10 h-10 flex items-center justify-center rounded-full">
                            <Mail className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="font-bold text-[#1A1C1C]">Support Email</p>
                            <p className="text-[#514532]">hello@nordicarchive.fund</p>
                            <p className="text-xs text-[#837560] mt-1">24/7 automated support, 12hr human response.</p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="bg-[#FFDEA8] text-[#271900] w-10 h-10 flex items-center justify-center rounded-full">
                            <Phone className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="font-bold text-[#1A1C1C]">Phone Support</p>
                            <p className="text-[#514532]">+46 (0) 8 123 45 67</p>
                            <p className="text-xs text-[#837560] mt-1">Mon–Fri, 9am – 5pm CET</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
