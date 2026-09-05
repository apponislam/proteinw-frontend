"use client";
import Image from "next/image";
import React from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateQuantity } from "@/redux/features/cart/cartSlice";

type StoreProductCardProps = {
    productId: string;
    image: string;
    title: string;
    price: string;
    rawPrice: number;
    description: string;
    sellerName?: string;
};

const StoreProductCard = ({ productId, image, title, price, rawPrice, description, sellerName = "Unknown" }: StoreProductCardProps) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.productId === productId));
    const quantity = cartItem ? cartItem.quantity : 0;

    const firstName = sellerName && sellerName !== "Unknown" ? sellerName.split(" ")[0] : "Seller";

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

    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl border border-gray-100 flex flex-col justify-between h-full">
            <Image src={image} alt={title} width={500} height={500} className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
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
                        <span className="truncate">Support {firstName}</span>
                    </button>
                    <div className="h-10 sm:h-11 px-1.5 bg-gray-100/90 border border-gray-200/60 rounded-full flex items-center gap-1 shrink-0">
                        <button
                            onClick={handleDecrement}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-200/80 active:scale-95 transition-all shadow-2xs cursor-pointer"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="font-bold min-w-5 text-center text-xs sm:text-sm text-gray-900">{quantity}</span>
                        <button
                            onClick={handleIncrement}
                            aria-label="Increase quantity"
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-200/80 active:scale-95 transition-all shadow-2xs cursor-pointer"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreProductCard;
