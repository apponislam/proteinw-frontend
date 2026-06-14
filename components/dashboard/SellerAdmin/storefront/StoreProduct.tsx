import Image from "next/image";
import React from "react";

interface StoreProductProps {
    isNewCollection?: boolean;
    isBestseller?: boolean;
    name: string;
    price: string;
    description: string;
    image: string;
    onViewDetails?: () => void;
}

const StoreProduct: React.FC<StoreProductProps> = ({ isNewCollection, isBestseller, name, price, description, image, onViewDetails }) => {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between items-center w-full">
            <Image src={image} alt={name} width={500} height={500} className="w-full h-64 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
            <div className="p-6 flex-1 flex flex-col justify-between items-center w-full">
                <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="md:text-xl font-bold">{name}</h2>
                        <p className="text-[#7C5800]">{price}</p>
                    </div>
                    <p className="mb-4">{description}</p>
                </div>
                <button 
                    onClick={onViewDetails}
                    className="bg-[#E2E2E2] cursor-pointer w-full py-3 font-semibold rounded-[24px] transition-all duration-300 hover:bg-[#d9d9d9]"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default StoreProduct;
