"use client";
import SupportPage from "@/components/about-us/SupportPage";
import SupportPageTop from "@/components/about-us/SupportPageTop";
import React, { useState } from "react";

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

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFAQData, setFilteredFAQData] = useState(faqData);

    const handleSearchSubmit = () => {
        const filtered = faqData.filter((item) => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredFAQData(filtered);
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="py-10 md:py-24 bg-[#F3F3F3] flex flex-col gap-16">
            <SupportPageTop searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearchSubmit={handleSearchSubmit} />
            <SupportPage faqData={filteredFAQData} />
        </div>
    );
};

export default Page;
