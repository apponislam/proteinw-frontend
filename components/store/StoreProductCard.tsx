"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateQuantity } from "@/redux/features/cart/cartSlice";

import { TProduct } from "@/redux/features/product/productApi";
import { getImageUrl } from "@/utils/getImageUrl";

type StoreProductCardProps = {
    product: TProduct;
    sellerName?: string;
};

const StoreProductCard = ({ product, sellerName = "Okänd" }: StoreProductCardProps) => {
    const dispatch = useAppDispatch();

    const productId = product._id || "";
    const title = product.name;
    const rawPrice = product.price;
    const price = `${product.price} SEK`;
    const description = product.shortDescription || "";

    const rawImages = product.images && product.images.length > 0 ? product.images : [];
    const mappedImages = rawImages.map((img) => getImageUrl(img)).filter(Boolean);
    const allImages = mappedImages.length > 0 ? mappedImages : ["/products/product1.png"];

    const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.productId === productId));
    const quantity = cartItem ? cartItem.quantity : 0;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const firstName = sellerName && sellerName !== "Okänd" ? sellerName.split(" ")[0] : "Säljare";

    const handleIncrement = () => {
        dispatch(updateQuantity({ productId, quantity: quantity + 1, price: rawPrice, name: title }));
    };

    const handleDecrement = () => {
        dispatch(updateQuantity({ productId, quantity: Math.max(0, quantity - 1), price: rawPrice, name: title }));
    };

    const handleSupportClick = () => {
        if (quantity === 0) {
            dispatch(updateQuantity({ productId, quantity: 1, price: rawPrice, name: title }));
        }
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    const activeImageUrl = allImages[currentIndex] || allImages[0];

    return (
        <>
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl border border-gray-100 flex flex-col justify-between h-full relative">
                {/* Image Container */}
                <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-50 overflow-hidden group/img">
                    <Image
                        src={activeImageUrl}
                        alt={title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.01] cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    />

                    {/* Expand Fullscreen Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        aria-label="Förstora bild"
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 cursor-pointer z-10"
                    >
                        <Maximize2 size={14} />
                    </button>

                    {/* Navigation Arrows for multiple images */}
                    {allImages.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevImage}
                                aria-label="Föregående bild"
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-xs transition-all duration-200 opacity-90 sm:opacity-0 group-hover/img:opacity-100 cursor-pointer z-10 hover:scale-110"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={handleNextImage}
                                aria-label="Nästa bild"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-xs transition-all duration-200 opacity-90 sm:opacity-0 group-hover/img:opacity-100 cursor-pointer z-10 hover:scale-110"
                            >
                                <ChevronRight size={18} />
                            </button>

                            {/* Dot Indicators */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-xs z-10">
                                {allImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentIndex(idx);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === currentIndex ? "bg-white w-4" : "bg-white/60 hover:bg-white"}`}
                                        aria-label={`Visa bild ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 line-clamp-2">{title}</h3>
                            <p className="text-[#7C5800] font-bold text-sm sm:text-base whitespace-nowrap">{price}</p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">{description}</p>
                    </div>

                    <div className="flex items-center justify-between gap-2.5 sm:gap-3 pt-3 border-t border-gray-100">
                        <button
                            onClick={handleSupportClick}
                            className="flex-1 h-10 sm:h-11 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm text-white bg-linear-to-r from-[#7C5800] to-[#FFB800] hover:from-[#8B6500] hover:to-[#FFCC00] active:scale-[0.98] transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 truncate cursor-pointer"
                        >
                            <ShoppingBag size={15} className="shrink-0" />
                            <span className="truncate">Lägg till</span>
                        </button>
                        <div className="h-10 sm:h-11 px-1.5 bg-gray-100/90 border border-gray-200/60 rounded-full flex items-center gap-1 shrink-0">
                            <button
                                onClick={handleDecrement}
                                aria-label="Minska antal"
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-200/80 active:scale-95 transition-all shadow-2xs cursor-pointer"
                            >
                                <Minus size={14} />
                            </button>
                            <span className="font-bold min-w-5 text-center text-xs sm:text-sm text-gray-900">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                aria-label="Öka antal"
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-200/80 active:scale-95 transition-all shadow-2xs cursor-pointer"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for full image view */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
                    <div className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            aria-label="Stäng modal"
                            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/80 transition-colors cursor-pointer z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center">
                            <Image src={activeImageUrl} alt={title} fill className="object-contain" />

                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        aria-label="Föregående bild"
                                        className="absolute left-4 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white transition-all cursor-pointer z-10"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        aria-label="Nästa bild"
                                        className="absolute right-4 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white transition-all cursor-pointer z-10"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails list in modal */}
                        {allImages.length > 1 && (
                            <div className="flex items-center gap-3 mt-4 overflow-x-auto max-w-full pb-2 px-2">
                                {allImages.map((imgUrl, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                                            idx === currentIndex ? "border-amber-500 scale-105" : "border-stone-700 opacity-60 hover:opacity-100"
                                        }`}
                                    >
                                        <Image src={imgUrl} alt={`${title} ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default StoreProductCard;
