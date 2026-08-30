"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { X, Coins, Sparkles, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";

type ProductDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    product: {
        images?: string[];
        title: string;
        price: string;
        description: string;
        marginBenefit?: string;
        qualityHighlight?: string;
        ecoHighlight?: string;
    } | null;
};

const ProductDetailModal = ({ isOpen, onClose, product }: ProductDetailModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Compute list of valid image URLs
    const imageList: string[] = useMemo(() => {
        if (!product) return [];
        if (product.images && product.images.length > 0) {
            return product.images.map((img) => getImageUrl(img));
        }
        return ["/products/product1.png"];
    }, [product]);

    // Reset current index when product changes or modal opens
    useEffect(() => {
        setCurrentIndex(0);
    }, [product, isOpen]);

    // Auto-slide every 3 seconds if there are multiple images
    useEffect(() => {
        if (!isOpen || imageList.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imageList.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [isOpen, imageList.length]);

    if (!isOpen || !product) return null;

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-300 overflow-y-auto" onClick={onClose}>
            <div className="bg-white rounded-2xl sm:rounded-[32px] overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} className="absolute right-3 top-3 sm:right-6 sm:top-6 z-20 bg-white/90 hover:bg-white text-gray-700 hover:text-black p-2 rounded-full shadow-md transition-all cursor-pointer">
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: 50% Image Slider */}
                <div className="w-full md:w-1/2 relative h-56 sm:h-64 md:h-125 shrink-0 rounded-t-2xl sm:rounded-t-[32px] md:rounded-tr-none md:rounded-l-[32px] overflow-hidden bg-stone-100 group">
                    <Image key={currentIndex} src={imageList[currentIndex] || "/products/product1.png"} alt={product.title} fill className="object-cover transition-all duration-500 ease-in-out animate-in fade-in" />

                    {/* Previous/Next Arrows (shown when > 1 image) */}
                    {imageList.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-700 flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 cursor-pointer"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-700 flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 cursor-pointer"
                                aria-label="Next image"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </>
                    )}

                    {/* Bottom Dots Indicator (shown when > 1 image) */}
                    {imageList.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xs">
                            {imageList.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(idx);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? "w-6 bg-[#FFDEA8]" : "w-2 bg-white/60 hover:bg-white"}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: 50% Content */}
                <div className="w-full md:w-1/2 p-4 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <span className="inline-block text-[10px] font-bold tracking-widest text-[#7C5800] bg-[#FFDEA8] px-3 py-1 rounded-[16px] uppercase mb-2.5 sm:mb-3.5">NEW COLLECTION</span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1C1917] mb-2 leading-tight">{product.title}</h2>
                        <div className="flex flex-wrap items-baseline gap-2 sm:gap-4 mb-3 sm:mb-4">
                            <span className="text-lg sm:text-xl font-bold text-[#7C5800]">{product.price}</span>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2.5 py-1 rounded-full">Earn 90 SEK per sale</span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-[15px] leading-relaxed mb-4 sm:mb-6">{product.description}</p>
                    </div>

                    <div className="bg-[#F3F3F3] border border-[#D5C4AB1A] rounded-xl sm:rounded-[24px] p-4 sm:p-6">
                        <h4 className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#7C5800] uppercase mb-2.5 sm:mb-3.5">WHY IT'S EASY TO SELL</h4>
                        <ul className="space-y-2.5 sm:space-y-3">
                            <li className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#514532]">
                                <Coins className="w-4 h-4 text-[#7C5800] shrink-0 mt-0.5" />
                                <span>{product.marginBenefit || "High-margin product (earn up to 50% profit)"}</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#514532]">
                                <Sparkles className="w-4 h-4 text-[#7C5800] shrink-0 mt-0.5" />
                                <span>{product.qualityHighlight || "Premium Scandinavian quality that sells itself"}</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#514532]">
                                <Leaf className="w-4 h-4 text-[#7C5800] shrink-0 mt-0.5" />
                                <span>{product.ecoHighlight || "Sustainable soy wax and organic scents"}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
