"use client";
import SupportPage from "./SupportPage";
import SupportPageTop from "./SupportPageTop";
import { useState, Suspense } from "react";

const faqData = [
    {
        question: "Kan vi anpassa vår webbshop?",
        answer: "Ja. Er webbshop kan anpassas för att passa er grupp, era mål och er försäljning. Vi hjälper er att sätta upp allt för bästa resultat.",
    },
    {
        question: "Hur ser vinstmodellen ut?",
        answer: "Vår modell är enkel och transparent. Ni tjänar upp till 50% förtjänst på varje såld produkt, vilket ger er en stabil och hög vinst utan några startavgifter.",
    },
    {
        question: "Hur snabbt kan vi starta vår försäljning?",
        answer: "De flesta grupper kommer igång inom 48 timmar. När ni har registrerat er kan ni direkt sätta upp mål och börja sälja.",
    },
    {
        question: "Hur levereras produkterna?",
        answer: "Alla produkter skickas i en samlad leverans till er grupp eller kontaktperson efter avslutad försäljning, vilket gör utdelningen smidig och välorganiserad.",
    },
    {
        question: "Finns det några startkostnader?",
        answer: "Nej. Det är helt kostnadsfritt att starta. Ni betalar ingenting i förskott och risken är noll.",
    },
    {
        question: "Vem hanterar kundtjänst?",
        answer: "Vi erbjuder engagerad support och hjälper er och era köpare om några frågor uppstår.",
    },
    {
        question: "Kan vi följa vår försäljning och förtjänst?",
        answer: "Ja. Ni har tillgång till en överskådlig meny där ni kan följa försäljningen, deltagarnas resultat och er totala vinst i realtid.",
    },
    {
        question: "Behöver vi några tekniska kunskaper för att starta?",
        answer: "Inte alls. Vår plattform är extremt enkel att använda. Vi vägleder er hela vägen från start till avslutad försäljning.",
    },
];

const AboutUsClient = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFAQData, setFilteredFAQData] = useState(faqData);

    const handleSearchSubmit = () => {
        const filtered = faqData.filter((item) => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredFAQData(filtered);
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="py-8 sm:py-12 md:py-24 bg-[#F3F3F3] flex flex-col gap-10 sm:gap-16">
            <SupportPageTop searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearchSubmit={handleSearchSubmit} />
            <Suspense fallback={<div className="py-12 text-center text-stone-500">Laddar support...</div>}>
                <SupportPage faqData={filteredFAQData} />
            </Suspense>
        </div>
    );
};

export default AboutUsClient;
