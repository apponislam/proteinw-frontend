import React from "react";
import ProductCard from "@/components/products/ProductCard";
import { Rocket } from "lucide-react";
import Link from "next/link";

const categories = ["All Products", "Scented Candles", "Premium Socks"];

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

const page = () => {
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
                        <h3 className="text-[#837560] space-y-2 mb-6">CATEGORIES</h3>
                        <ul className="flex lg:block gap-2 lg:gap-0 overflow-x-auto pb-2 lg:pb-0">
                            {categories.map((category) => (
                                <li key={category} className="text-[#5E4200] cursor-pointer p-4 rounded-[32px] whitespace-nowrap transition-all duration-300 ease-out hover:bg-[#FFDEA8] hover:shadow-md hover:-translate-y-0.5">
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
                        {products.map((product, index) => (
                            <ProductCard key={`${product.title}-${index}`} image={product.image} title={product.title} price={product.price} description={product.description} />
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
        </div>
    );
};

export default page;
