"use client";

import { useState } from "react";
import { ChevronDown, RefreshCw, AlertCircle, RotateCcw, Upload, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

interface FilePreview {
    name: string;
    url: string;
    size: string;
}

export default function CustomerServiceContent() {
    const [openAccordion, setOpenAccordion] = useState<string | null>("retur");
    const [issueType, setIssueType] = useState<"reklamation" | "byte">("reklamation");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const scrollToForm = (type: "reklamation" | "byte") => {
        setIssueType(type);
        const formElement = document.getElementById("customer-service-form");
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        toast.success("Tack! Din anmälan har skickats. Vi återkommer så snart som möjligt.");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => ({
                name: file.name,
                url: URL.createObjectURL(file),
                size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            }));
            setSelectedFiles((prev) => [...prev, ...filesArray]);
        }
    };

    const handleRemoveFile = (indexToRemove: number) => {
        setSelectedFiles((prev) => {
            const itemToRemove = prev[indexToRemove];
            if (itemToRemove?.url) {
                URL.revokeObjectURL(itemToRemove.url);
            }
            return prev.filter((_, idx) => idx !== indexToRemove);
        });
    };


    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FFDEA8]/50 text-[#7C5800] mb-4">
                    <ShieldCheck className="w-4 h-4" /> Kundservice & Support
                </span>
                <h1 className="text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight mb-4">Retur, Byte & Reklamation</h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">Här hittar du all information gällande ångerrätt, byte av produkter samt hur du upprättar en reklamation.</p>
            </div>

            {/* Top Process Cards / Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between hover:border-[#EFAC02]/50 transition-colors">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-[#F5F5F4] text-[#1C1917] flex items-center justify-center mb-4">
                            <RotateCcw className="w-6 h-6 text-[#7C5800]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C1917] mb-2">1. Ångerrätt & Retur</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">14 dagars ångerrätt. Kontakta säljaren du köpte varan av för hjälp med retur och återbetalning.</p>
                    </div>
                    <button onClick={() => toggleAccordion("retur")} className="text-xs font-semibold text-[#7C5800] hover:text-[#EFAC02] transition-colors flex items-center gap-1 self-start cursor-pointer">
                        Läs mer om retur &rarr;
                    </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between hover:border-[#EFAC02]/50 transition-colors">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-[#F5F5F4] text-[#1C1917] flex items-center justify-center mb-4">
                            <RefreshCw className="w-6 h-6 text-[#7C5800]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C1917] mb-2">2. Byte av produkt</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">Vill du byta storlek eller vara? Kontakta oss direkt via formuläret. Fraktavgift 59 SEK tillkommer.</p>
                    </div>
                    <button onClick={() => scrollToForm("byte")} className="text-xs font-semibold text-[#7C5800] hover:text-[#EFAC02] transition-colors flex items-center gap-1 self-start cursor-pointer">
                        Ansök om byte &rarr;
                    </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between hover:border-[#EFAC02]/50 transition-colors">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-[#F5F5F4] text-[#1C1917] flex items-center justify-center mb-4">
                            <AlertCircle className="w-6 h-6 text-[#7C5800]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C1917] mb-2">3. Reklamation</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">Defekt eller skadad vara? Fyll i formuläret direkt med ordernummer och beskrivning så hjälper vi dig.</p>
                    </div>
                    <button onClick={() => scrollToForm("reklamation")} className="text-xs font-semibold text-[#7C5800] hover:text-[#EFAC02] transition-colors flex items-center gap-1 self-start cursor-pointer">
                        Gör en reklamation &rarr;
                    </button>
                </div>
            </div>

            {/* Information Accordion / Guide */}
            <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 mb-16 space-y-4">
                <h2 className="text-xl font-bold text-[#1C1917] mb-6">Information om våra processer</h2>

                {/* Item 1: Retur / Ångerrätt */}
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all">
                    <button onClick={() => toggleAccordion("retur")} className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-[#1C1917] flex items-center justify-between hover:bg-stone-50 transition-colors">
                        <span className="flex items-center gap-3">
                            <RotateCcw className="w-4 h-4 text-[#7C5800]" />
                            1. Ångerrätt & Retur
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-gray-500 ${openAccordion === "retur" ? "rotate-180" : ""}`} />
                    </button>
                    {openAccordion === "retur" && (
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-stone-100 space-y-3">
                            <p>Om du har köpt en produkt via en säljares digitala butik och vill returnera den, ber vi dig att i första hand kontakta den säljare du köpte produkten av.</p>
                            <p>
                                Du har <strong>14 dagar</strong> på dig från leveransdatumet att begära en retur.
                            </p>
                            <p>Säljaren hjälper dig med returprocessen och ordnar återbetalningen. När återbetalningen genomförts kontaktar säljaren oss angående den returnerade produkten och ordern.</p>
                            <p className="text-stone-500 italic">Har du några frågor kring returprocessen är du självklart alltid välkommen att kontakta oss.</p>
                        </div>
                    )}
                </div>

                {/* Item 2: Byte */}
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all">
                    <button onClick={() => toggleAccordion("byte")} className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-[#1C1917] flex items-center justify-between hover:bg-stone-50 transition-colors">
                        <span className="flex items-center gap-3">
                            <RefreshCw className="w-4 h-4 text-[#7C5800]" />
                            2. Byte av produkt
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-gray-500 ${openAccordion === "byte" ? "rotate-180" : ""}`} />
                    </button>
                    {openAccordion === "byte" && (
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-stone-100 space-y-3">
                            <p>Vid byte av produkt kan du kontakta oss direkt via vårt formulär längst ned på sidan.</p>
                            <ul className="list-disc list-inside space-y-1.5 text-stone-700">
                                <li>Produkten måste vara oanvänd och uppfylla våra gällande bytesvillkor.</li>
                                <li>
                                    En fraktavgift på <strong>59 SEK</strong> tillkommer vid byte.
                                </li>
                            </ul>
                            <div className="pt-2">
                                <button onClick={() => scrollToForm("byte")} className="px-4 py-2 bg-[#7C5800] text-white text-xs font-semibold rounded-lg hover:bg-[#8B6500] transition-colors cursor-pointer">
                                    Fyll i bytesformulär
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Item 3: Reklamation */}
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all">
                    <button onClick={() => toggleAccordion("reklamation")} className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-[#1C1917] flex items-center justify-between hover:bg-stone-50 transition-colors">
                        <span className="flex items-center gap-3">
                            <AlertCircle className="w-4 h-4 text-[#7C5800]" />
                            3. Reklamation & Skadad vara
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-gray-500 ${openAccordion === "reklamation" ? "rotate-180" : ""}`} />
                    </button>
                    {openAccordion === "reklamation" && (
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-stone-100 space-y-3">
                            <p>Om produkten är defekt, skadad, felaktig eller om det föreligger annat problem med produkten ska du kontakta oss direkt.</p>
                            <p>Fyll i formuläret nedan med ordernummer, kontaktuppgifter och en tydlig beskrivning samt eventuella bilder på skadan.</p>
                            <div className="pt-2">
                                <button onClick={() => scrollToForm("reklamation")} className="px-4 py-2 bg-[#7C5800] text-white text-xs font-semibold rounded-lg hover:bg-[#8B6500] transition-colors cursor-pointer">
                                    Gör en reklamation nu
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Section */}
            <div id="customer-service-form" className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mb-2">Formulär för Byte & Reklamation</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Välj vilket ärende du vill anmäla och fyll i uppgifterna nedan så hjälper vi dig direkt.</p>
                </div>

                {isSubmitted ? (
                    <div className="bg-[#FFDEA8]/30 border border-[#EFAC02] rounded-2xl p-8 text-center space-y-4 my-6">
                        <div className="w-12 h-12 rounded-full bg-[#7C5800] text-white flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1C1917]">Tack för din anmälan!</h3>
                        <p className="text-xs sm:text-sm text-gray-700 max-w-md mx-auto">Vi har tagit emot ditt ärende ({issueType === "reklamation" ? "Reklamation" : "Byte"}) och handlägger det snarast möjligt. En bekräftelse har skickats till din e-postadress.</p>
                        <button onClick={() => setIsSubmitted(false)} className="mt-4 px-6 py-2.5 bg-[#7C5800] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#8B6500] transition-colors cursor-pointer">
                            Skicka en till anmälan
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Select Issue Type */}
                        <div>
                            <label className="text-xs font-semibold text-gray-700 mb-2 block uppercase tracking-wider">Välj Ärendetyp *</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIssueType("reklamation")}
                                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                        issueType === "reklamation" ? "border-[#EFAC02] bg-[#FFDEA8]/40 text-[#7C5800] ring-1 ring-[#EFAC02]" : "border-stone-200 bg-[#F8F8F8] text-gray-600 hover:bg-stone-100"
                                    }`}
                                >
                                    <AlertCircle className="w-4 h-4" /> Reklamation
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIssueType("byte")}
                                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                        issueType === "byte" ? "border-[#EFAC02] bg-[#FFDEA8]/40 text-[#7C5800] ring-1 ring-[#EFAC02]" : "border-stone-200 bg-[#F8F8F8] text-gray-600 hover:bg-stone-100"
                                    }`}
                                >
                                    <RefreshCw className="w-4 h-4" /> Byte
                                </button>
                            </div>
                        </div>

                        {/* Order number & Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase tracking-wider">Ordernummer *</label>
                                <input type="text" required placeholder="t.ex. 66e5f8a2c1b23d4e5f67890a" className="w-full bg-[#F8F8F8] border border-stone-200 rounded-xl px-4 h-11 text-xs sm:text-sm text-[#1C1917] outline-none focus:ring-2 focus:ring-[#EFAC02]" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase tracking-wider">Namn *</label>
                                <input type="text" required placeholder="För- och efternamn" className="w-full bg-[#F8F8F8] border border-stone-200 rounded-xl px-4 h-11 text-xs sm:text-sm text-[#1C1917] outline-none focus:ring-2 focus:ring-[#EFAC02]" />
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase tracking-wider">E-postadress *</label>
                                <input type="email" required placeholder="din.epost@doman.se" className="w-full bg-[#F8F8F8] border border-stone-200 rounded-xl px-4 h-11 text-xs sm:text-sm text-[#1C1917] outline-none focus:ring-2 focus:ring-[#EFAC02]" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase tracking-wider">Telefonnummer</label>
                                <input type="tel" placeholder="+46 70 123 45 67" className="w-full bg-[#F8F8F8] border border-stone-200 rounded-xl px-4 h-11 text-xs sm:text-sm text-[#1C1917] outline-none focus:ring-2 focus:ring-[#EFAC02]" />
                            </div>
                        </div>

                        {/* Problem Description */}
                        <div>
                            <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase tracking-wider">Beskrivning av ärendet *</label>
                            <textarea
                                required
                                rows={4}
                                placeholder={issueType === "reklamation" ? "Beskriv felet eller skadan på produkten noggrant..." : "Beskriv vilken produkt och storlek du vill byta från/till..."}
                                className="w-full bg-[#F8F8F8] border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1C1917] outline-none focus:ring-2 focus:ring-[#EFAC02] resize-none"
                            />
                        </div>

                        {/* File Upload UI */}
                        <div>
                            <label className="text-xs font-semibold text-gray-700 mb-1.5 block uppercase tracking-wider">Bifoga bilder (Vid reklamation eller skada)</label>
                            <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center bg-[#F8F8F8] hover:bg-stone-100 transition-colors cursor-pointer relative">
                                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                <p className="text-xs font-medium text-gray-600">Klicka eller dra bilder hit för att ladda upp</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG upp till 10MB</p>
                            </div>
                            {selectedFiles.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <p className="text-xs font-semibold text-gray-500">{selectedFiles.length} bild(er) valda:</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {selectedFiles.map((fileItem, idx) => (
                                            <div key={idx} className="relative group bg-stone-50 border border-stone-200 rounded-xl p-2 flex flex-col items-center text-center shadow-xs">
                                                {/* Delete Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFile(idx)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-transform hover:scale-110 cursor-pointer z-10"
                                                    title="Ta bort bild"
                                                    aria-label="Remove image"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>

                                                {/* Thumbnail Image */}
                                                <div className="w-full h-20 bg-stone-100 rounded-lg overflow-hidden mb-2 relative flex items-center justify-center border border-stone-200">
                                                    <img
                                                        src={fileItem.url}
                                                        alt={fileItem.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* File Info */}
                                                <span className="text-[11px] font-semibold text-[#1C1917] truncate w-full px-1" title={fileItem.name}>
                                                    {fileItem.name}
                                                </span>
                                                <span className="text-[10px] text-gray-400">
                                                    {fileItem.size}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit button */}
                        <button type="submit" className="w-full mt-4 bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white h-12 rounded-xl text-sm font-bold transition-all hover:from-[#8B6500] hover:to-[#FFCC00] cursor-pointer shadow-sm">
                            Skicka anmälan ({issueType === "reklamation" ? "Reklamation" : "Byte"})
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
