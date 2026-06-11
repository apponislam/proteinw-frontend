"use client";

import React, { useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Rocket, ChevronDown, Infinity, Leaf, Footprints, Info } from "lucide-react";
import Link from "next/link";
import ProductDetailModal from "@/components/products/ProductDetailModal";

const products = [
    {
        image: "/products/product1.png",
        title: "Midnight Diffuser",
        price: "180 SEK",
        description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
    },
    {
        image: "/products/product2.png",
        title: "Midnight Diffuser",
        price: "180 SEK",
        description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
    },
    {
        image: "/products/product3.png",
        title: "Midnight Diffuser",
        price: "180 SEK",
        description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
    },
    {
        image: "/products/product3.png",
        title: "Midnight Diffuser",
        price: "180 SEK",
        description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
    },
    {
        image: "/products/product2.png",
        title: "Midnight Diffuser",
        price: "180 SEK",
        description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
    },
    {
        image: "/products/product1.png",
        title: "Midnight Diffuser",
        price: "180 SEK",
        description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
    },
    {
        image: "/products/product1.png",
        title: "Midnight Diffuser",
        price: "180 SEK",
        description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
    },
    {
        image: "/products/product2.png",
        title: "Midnight Diffuser",
        price: "180 SEK",
        description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
    },
    {
        image: "/products/product3.png",
        title: "Midnight Diffuser",
        price: "180 SEK",
        description: "Notes of arctic cloudberry and warm sandalwood. Hand-poured in",
    },
];

const ProductsClient = () => {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
    const [isCandlesOpen, setIsCandlesOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    return (
        <div className="bg-[#FAFAF9CC]">
            <div className="container mx-auto py-6 px-4 ">
                <div className="mb-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">The Archive Collection</h1>
                    <p>
                        Curated high-quality products designed for community fundraising. <br className="none sm:block" /> Handpicked Scandinavian essentials that represent the NordicArchive spirit.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-80 lg:shrink-0">
                        <h3 className="text-[#837560] text-sm font-bold tracking-wider mb-6">CATEGORIES</h3>
                        <ul className="flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto pb-2 lg:pb-0">
                            {/* All Products */}
                            <li
                                onClick={() => {
                                    setActiveCategory("All Products");
                                    setActiveSubCategory(null);
                                }}
                                className={`text-[#5E4200] cursor-pointer px-5 py-3.5 rounded-[32px] whitespace-nowrap transition-all duration-300 ease-out font-medium flex items-center gap-3 ${activeCategory === "All Products" && !activeSubCategory ? "bg-[#FFDEA8] shadow-xs -translate-y-0.5" : "hover:bg-[#FFDEA8]/40 hover:-translate-y-0.5"}`}
                            >
                                <Infinity className="w-4 h-4 text-[#837560]" />
                                <span>All Products</span>
                            </li>
                            {/* Scented Candles */}
                            <li className="flex flex-col">
                                <div
                                    onClick={() => {
                                        setActiveCategory("Scented Candles");
                                        setActiveSubCategory(null);
                                        setIsCandlesOpen(!isCandlesOpen);
                                    }}
                                    className={`text-[#5E4200] cursor-pointer px-5 py-3.5 rounded-[32px] whitespace-nowrap transition-all duration-300 ease-out font-medium flex items-center justify-between ${activeCategory === "Scented Candles" && !activeSubCategory ? "bg-[#FFDEA8] shadow-xs -translate-y-0.5" : "hover:bg-[#FFDEA8]/40 hover:-translate-y-0.5"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Leaf className="w-4 h-4 text-[#837560]" />
                                        <span>Scented Candles</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-[#837560] transition-transform duration-300 ${isCandlesOpen ? "rotate-180" : ""}`} />
                                </div>

                                {/* Sub-category list with transition */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCandlesOpen ? "max-h-20 opacity-100 mt-1 pl-4" : "max-h-0 opacity-0"}`}>
                                    <ul className="border-l-2 border-[#FFDEA8] pl-3 py-1 space-y-1">
                                        <li
                                            onClick={() => {
                                                setActiveCategory("Scented Candles");
                                                setActiveSubCategory("Reed Diffusers");
                                            }}
                                            className={`text-[#5E4200] cursor-pointer py-2 px-4 rounded-[20px] text-sm whitespace-nowrap transition-all duration-200 ${activeSubCategory === "Reed Diffusers" ? "bg-[#FFDEA8] font-semibold shadow-xs" : "hover:bg-[#FFDEA8]/30"}`}
                                        >
                                            Reed Diffusers
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            {/* Premium Socks */}
                            <li
                                onClick={() => {
                                    setActiveCategory("Premium Socks");
                                    setActiveSubCategory(null);
                                }}
                                className={`text-[#5E4200] cursor-pointer px-5 py-3.5 rounded-[32px] whitespace-nowrap transition-all duration-300 ease-out font-medium flex items-center gap-3 ${activeCategory === "Premium Socks" ? "bg-[#FFDEA8] shadow-xs -translate-y-0.5" : "hover:bg-[#FFDEA8]/40 hover:-translate-y-0.5"}`}
                            >
                                <Footprints className="w-4 h-4 text-[#837560]" />
                                <span>Premium Socks</span>
                            </li>
                        </ul>
                        <div className="bg-[#F3F3F3] rounded-[24px] px-5 py-3.5 mt-6">
                            <Info className="text-[#F3F3F3]" fill="#7C5800" />
                            <p className="text-[#514532] mt-2 text-[14px]">Every purchase supports your local community programs. 180 SEK per package.</p>
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
                        {products.map((product, index) => (
                            <ProductCard 
                                key={`${product.title}-${index}`} 
                                image={product.image} 
                                title={product.title} 
                                price={product.price} 
                                description={product.description} 
                                onViewDetails={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-full sm:w-auto sm:min-w-140 lg:w-1/2 max-w-3xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-[32px] sm:rounded-[60px] p-4 sm:p-6 overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                        <div className="sm:pl-4">
                            <h2 className="text-sm text-[#837560] font-bold">READY TO FUNDRAISE?</h2>
                            <p>Join 500+ successful teams</p>
                        </div>
                        <Link href="/auth/register" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white px-6 sm:px-16 py-2 rounded-3xl flex items-center gap-2 cursor-pointer">
                                <Rocket /> Start Selling These
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ProductDetailModal 
                isOpen={!!selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
                product={selectedProduct} 
            />
        </div>
    );
};

export default ProductsClient;
