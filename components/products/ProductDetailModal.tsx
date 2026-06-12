import Image from "next/image";
import React from "react";
import { X, Coins, Sparkles, Leaf } from "lucide-react";

type ProductDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    product: {
        image: string;
        title: string;
        price: string;
        description: string;
    } | null;
};

const ProductDetailModal = ({ isOpen, onClose, product }: ProductDetailModalProps) => {
    if (!isOpen || !product) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-[32px] overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute right-6 top-6 z-10 bg-white/80 hover:bg-white text-gray-700 hover:text-black p-2 rounded-full shadow-md transition-all cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: 50% Image */}
                <div className="w-full md:w-1/2 relative h-64 md:h-[500px]">
                    <Image 
                        src={product.image} 
                        alt={product.title} 
                        fill 
                        className="object-cover"
                    />
                </div>

                {/* Right Side: 50% Content */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                        <span className="inline-block text-[10px] font-bold tracking-widest text-[#7C5800] bg-[#FFDEA8] px-3 py-1 rounded-[16px] uppercase mb-3.5">
                            NEW COLLECTION
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1917] mb-2 leading-tight">
                            {product.title}
                        </h2>
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-xl font-bold text-[#7C5800]">
                                {product.price}
                            </span>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2.5 py-1 rounded-full">
                                Earn 90 SEK per sale
                            </span>
                        </div>
                        <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                            {product.description}
                        </p>
                    </div>

                    <div className="bg-[#F3F3F3] border border-[#D5C4AB1A] rounded-[24px] p-6">
                        <h4 className="text-[11px] font-bold tracking-wider text-[#7C5800] uppercase mb-3.5">
                            WHY IT'S EASY TO SELL
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2.5 text-[13.5px] text-[#514532]">
                                <Coins className="w-4 h-4 text-[#7C5800] shrink-0 mt-0.5" />
                                <span>High-margin product (earn up to 50% profit)</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-[13.5px] text-[#514532]">
                                <Sparkles className="w-4 h-4 text-[#7C5800] shrink-0 mt-0.5" />
                                <span>Premium Scandinavian quality that sells itself</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-[13.5px] text-[#514532]">
                                <Leaf className="w-4 h-4 text-[#7C5800] shrink-0 mt-0.5" />
                                <span>Sustainable soy wax and organic scents</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
