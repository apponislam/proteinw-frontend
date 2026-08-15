"use client";

import React from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";

interface ProductsListProps {
    products: any[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    if (!products || products.length === 0) {
        return <div className="p-8 text-center text-sm text-[#78716C]">No products associated with this campaign.</div>;
    }

    return (
        <div className="divide-y divide-[#E7E5E4]">
            {products.map((product) => (
                <div key={product._id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-[#FCFBFA] transition-colors">
                    <div className="w-14 h-14 relative rounded-lg bg-[#F3F3F3] border border-[#E7E5E4] overflow-hidden flex items-center justify-center shrink-0">
                        {product.productImage ? (
                            <Image src={getImageUrl(product.productImage)} alt={product.name} fill className="object-cover" />
                        ) : (
                            <Package className="text-[#A8A29E]" size={24} />
                        )}
                    </div>
                    <div className="grow min-w-0">
                        <h4 className="font-bold text-base text-[#1A1C1C] truncate">{product.name}</h4>
                        <p className="text-xs text-[#78716C] uppercase font-semibold mt-0.5">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-6 sm:gap-12 shrink-0 w-full sm:w-auto justify-between sm:justify-end mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-[#E7E5E4]">
                        <div>
                            <span className="block text-[10px] text-[#78716C] font-semibold uppercase">Price</span>
                            <span className="text-sm font-bold text-[#1A1C1C]">SEK {product.price}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
