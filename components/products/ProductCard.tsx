import Image from "next/image";
import React from "react";

type ProductCardProps = {
    image: string;
    title: string;
    price: string;
    description: string;
};

const ProductCard = ({ image, title, price, description }: ProductCardProps) => {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
            <Image src={image} alt={title} width={500} height={500} className="w-full h-96 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="md:text-xl font-bold">{title}</h2>
                    <p className="text-[#7C5800]">{price}</p>
                </div>
                <p className="mb-4">{description}</p>
                <button className="bg-[#E2E2E2] cursor-pointer w-full py-3 font-semibold rounded-[24px] transition-all duration-300 hover:bg-[#d9d9d9]">View Details</button>
            </div>
        </div>
    );
};

export default ProductCard;
