import React from "react";
import StoreProductCard from "./StoreProductCard";

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
];

const StoreProducts = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between gap-8 mb-12">
                <h2 className="text-3xl font-bold text-black">Martin's Collection</h2>
                <span className="flex-1 h-0.5 bg-[#EEEEEE]"></span>
                <p className="text-[#A8A29E] whitespace-nowrap">3 PRODUCTS AVAILABLE</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                    <StoreProductCard key={`${product.title}-${index}`} image={product.image} title={product.title} price={product.price} description={product.description} />
                ))}
            </div>
        </div>
    );
};

export default StoreProducts;
