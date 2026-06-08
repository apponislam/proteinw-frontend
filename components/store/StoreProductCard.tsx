"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

type StoreProductCardProps = {
    image: string;
    title: string;
    price: string;
    description: string;
};

const StoreProductCard = ({ image, title, price, description }: StoreProductCardProps) => {
    const [quantity, setQuantity] = useState(0);

    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
            <Image src={image} alt={title} width={500} height={500} className="w-full h-64 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="md:text-xl font-bold">{title}</h2>
                    <p className="text-[#7C5800]">{price}</p>
                </div>
                <p className="mb-4">{description}</p>
                <div className="flex items-center justify-between gap-4">
                    <button className="flex-1 py-3 font-bold rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white hover:from-[#8B6500] hover:to-[#FFCC00] transition-all">Support Martin</button>
                    <div className="flex items-center gap-4 bg-[#E2E2E2] rounded-[24px] p-1">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all">
                            <Minus size={18} />
                        </button>
                        <span className="font-bold min-w-6 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all">
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreProductCard;
